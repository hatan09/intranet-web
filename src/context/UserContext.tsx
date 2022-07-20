import { IUserDTO } from "../interfaces/AllInterfaces";
import { useCRUD } from "../hooks/crud";
import { createContext, useContext } from "react";

//irepo
interface IUserContextModel {
  items: IUserDTO[];
  get: () => Promise<void>;
  getDetails: (id: number | string) => Promise<IUserDTO | null>;
  create: (item: IUserDTO) => Promise<IUserDTO>;
  update: (item: IUserDTO) => Promise<void>;
  remove: (item: IUserDTO) => Promise<void>;
}

//repo
const defaultUserContextValue: IUserContextModel = {
  items: [],
  get: async () => {},
  create: async (e) => e,
  update: async () => {},
  remove: async () => {},
  getDetails: async (_) => null,
};

//context
export const UserContext = createContext(defaultUserContextValue);

//
export function UserProvider({ children }: any) {
  const baseUserUrl = () =>
    "http://totechsidentity.azurewebsites.net/";
  const { items, get, getDetails, create, update, remove } =
    useCRUD<IUserDTO>({
      baseUrl: () => baseUserUrl(),
      notLoadOnInit: true,
    });

  return (
    <UserContext.Provider
      value={{ items, get, getDetails, create, update, remove }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
