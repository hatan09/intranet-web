import { IUserDTO, ILoginModel, IToken } from "../interfaces/AllInterfaces";
import { useCRUD } from "../hooks/crud";
import { createContext, useContext } from "react";
import Axios from "axios";
import React from "react";

//irepo
interface IUserContextModel {
  user: IUserDTO | undefined;
  login: (item: ILoginModel) => Promise<IToken | null>;
  getDetails: (id: number | string) => Promise<IUserDTO | null>;
  register: (item: IUserDTO) => Promise<IUserDTO | null>;
  update: (item: IUserDTO) => Promise<void>;
  remove: (item: IUserDTO) => Promise<void>;
}

//repo
const defaultUserContextValue: IUserContextModel = {
  user: undefined,
  login: async () => null,
  getDetails: async (_) => null,
  register: async () => null,
  update: async () => {},
  remove: async () => {},
};

//context
export const UserContext = createContext(defaultUserContextValue);

//
export function UserProvider({ children }: any) {
  const baseUserUrl = () => "http://totechsidentity.azurewebsites.net";
  const [user, setUser] = React.useState<IUserDTO>();
  const { getDetails, update, remove } = useCRUD<IUserDTO>({
    baseUrl: () => baseUserUrl(),
    notLoadOnInit: true,
  });
  const login = async (item: ILoginModel) => {
    const response = await Axios.post<IToken>(
      "https://totechsidentity.azurewebsites.net/api/Access/login",
      item
    );

    console.log(response?.data);
    if (response.status === 200)
      setUser(response.data.userInfo && response.data.userInfo);
    return response?.data;
  };

  const register = async (item: IUserDTO) => {
    const response = await Axios.post<IUserDTO>(
      "https://totechsidentity.azurewebsites.net/api/Access/register",
      item,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response?.data);

    if (response.status === 200)
      setUser(response.data && response.data);
    return response?.data;
  };

  return (
    <UserContext.Provider
      value={{ user, getDetails, update, remove, login, register }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
