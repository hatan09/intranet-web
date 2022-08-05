import { IUserDTO, ILoginModel, IToken } from "../interfaces/AllInterfaces";
import { useCRUD } from "../hooks/crud";
import { createContext, useContext, useState } from "react";
import Axios from "axios";
import React from "react";

//irepo
interface IUserContextModel {
  login: (item: ILoginModel) => Promise<IToken | null>;
  getDetails: (id: number | string) => Promise<IUserDTO | null>;
  register: (
    item: IUserDTO,
    img: FormData | undefined
  ) => Promise<IUserDTO | null>;
  uploadProfilePic: (image: FormData) => Promise<string | null>;
  update: (item: IUserDTO) => Promise<void>;
  remove: (item: IUserDTO) => Promise<void>;
  getLocalUser: () => IUserDTO | null;
  // getCloudUser: (guid:string) => Promise<IUserDTO | null>;

  uploadTotechsProfilePic: (guid: string, image: FormData) => Promise<string | null>;
}

//repo
const defaultUserContextValue: IUserContextModel = {
  login: async () => null,
  getDetails: async (_) => null,
  register: async () => null,
  uploadProfilePic: async () => null,
  update: async () => {},
  remove: async () => {},
  getLocalUser: () => null,
  // getCloudUser: async (_) => null

  uploadTotechsProfilePic: async () => null,
};

//context
export const UserContext = createContext(defaultUserContextValue);

//
export function UserProvider({ children }: any) {
  const baseUserUrl = () => "https://totechsidentity.azurewebsites.net";
  const authUrl = () => "https://totechsidentity.azurewebsites.net";
  // const authUrl = () => "https://localhost:44316";
  const [user, setUser] = useState<IUserDTO>();
  const { getDetails, update, remove } = useCRUD<IUserDTO>({
    baseUrl: () => baseUserUrl(),
    notLoadOnInit: true,
  });

  const getLocalUser = () => {
    const iToken = JSON.parse(localStorage.getItem("iToken")!);
    const token = iToken && (iToken as IToken);
    const localUser: IUserDTO | undefined = (token! as IToken).userInfo;

    console.log("IToken: ", token);
    console.log("LocalUser: ", localUser);
    console.log("User: ", user);
    

    // if(!user){
    //   getCloudUser(localUser?.id);
    // }

    return localUser ? localUser : null;
  };

  const login = async (item: ILoginModel) => {
    const response = await Axios.post<IToken>(
      authUrl() + "/api/Access/login",
      item
    );

    console.log(response?.data);

    if (response.status === 200) {
      const iToken = JSON.stringify(response?.data);
      localStorage.setItem("iToken", iToken);

      const getUser = response.data.userInfo && response.data.userInfo;
      console.log("before: ", getUser && getUser);
      
      setUser(getUser);

      console.log("after: ", user);

      return response.data;
    }

    return null;
  };

  const register = async (item: IUserDTO, img: FormData | undefined) => {
    const response = await Axios.post<IUserDTO>(
      authUrl() + "/api/Access/Register",
      item,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response?.data);

    if (response.status === 200 && response!.data) {
      setUser(response.data);
      if (img) {
        const picUrl = await uploadTotechsProfilePic(response.data.guid, img);
        console.log(picUrl);

        user!.profilePic = picUrl ? picUrl : "";
      }

      // const intranetResponse = await createIntranetAccount(user!);
      // if(intranetResponse.status === 200 && intranetResponse!.data) {
        
      // }
    }

    return null;
  };

  const uploadTotechsProfilePic = async (guid: string, item: FormData) => {
    const response = await Axios.post<string>(
      authUrl() + `/api/Access/UploadAvatar/${guid}`,
      item,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.status === 200) return response?.data;

    return null;
  };  // end uploadTotechsProfilePic()

  const uploadProfilePic = async (item: FormData) => {
    if (!user) return null;

    const response = await Axios.post<string>(
      baseUserUrl() + `/api/User/UploadAvatar?id=${user.id}`,
      item,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response?.data);
    

    return response.data ? response.data : null;
  };  // end uploadProfilePic()

  const createIntranetAccount = async (item: IUserDTO) => {
    const response = await Axios.post<IUserDTO>(
      baseUserUrl() + "/api/User/Create",
      item,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  };

  return (
    <UserContext.Provider
      value={{
        getDetails,
        uploadProfilePic,
        update,
        remove,
        login,
        register,
        getLocalUser,
        uploadTotechsProfilePic,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
