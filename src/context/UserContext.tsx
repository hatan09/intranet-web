import { IUserDTO, ILoginModel, IToken } from "../interfaces/AllInterfaces";
import { useCRUD } from "../hooks/crud";
import { createContext, useContext } from "react";
import Axios from "axios";

//irepo
interface IUserContextModel {
  items: IUserDTO[];
  login: (item: ILoginModel) => Promise<IToken | null>;
  register: (item: IUserDTO) => Promise<IUserDTO | null>;
  get: () => Promise<void>;
  getDetails: (id: number | string) => Promise<IUserDTO | null>;
  update: (item: IUserDTO) => Promise<void>;
  remove: (item: IUserDTO) => Promise<void>;
}

//repo
const defaultUserContextValue: IUserContextModel = {
  items: [],
  login: async () =>  null,
  register: async () => null,
  get: async () => {},
  update: async () => {},
  remove: async () => {},
  getDetails: async (_) => null,
};

//context
export const UserContext = createContext(defaultUserContextValue);

//
export function UserProvider({ children }: any) {
  const baseUserUrl = () =>
    "http://totechsidentity.azurewebsites.net";
  const { items, get, getDetails, update, remove } =
    useCRUD<IUserDTO>({
      baseUrl: () => baseUserUrl(),
      notLoadOnInit: true,
    });
  const login = async (item: ILoginModel) => {
    const response = await Axios.post<IToken>("http://totechsidentity.azurewebsites.net/login", item);
    return response?.data;
  }

  const register = async (item: IUserDTO) => {
    const response = await Axios.post<IUserDTO>("http://totechsidentity.azurewebsites.net/register", item,
    {
      headers: { 
        'Content-Type' : 'application/json' 
    }
    });
    await get();
    return response?.data;
  }

  return (
    <UserContext.Provider
      value={{ items, get, getDetails, update, remove, login, register }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
