import { IProjectDTO } from "../interfaces/AllInterfaces";
import { useCRUD } from '../hooks/crud';
import { createContext, useContext } from "react";

//irepo
interface IProjectContextModel {
    items: IProjectDTO[];
    get: () => Promise<void>;
    getDetails: (id: number | string) => Promise<IProjectDTO | null>;
    create: (item: IProjectDTO) => Promise<IProjectDTO>;
    update: (item: IProjectDTO) => Promise<void>;
    remove: (item: IProjectDTO) => Promise<void>;
}

//repo
const defaultProjectContextValue: IProjectContextModel = {
    items: [],
    get: async () => { },
    create: async (e) => e,
    update: async () => { },
    remove: async () => { },
    getDetails: async _ => null,
};

//context
export const ProjectContext = createContext(defaultProjectContextValue);

//
export function ProjectProvider({ children }: any) {
    const baseProjectUrl = () => 'https://intranetapi.azurewebsites.net/api/project';
    const { items, get, getDetails, create, update, remove } = useCRUD<IProjectDTO>({ baseUrl: () => baseProjectUrl(), notLoadOnInit: false });

    return <ProjectContext.Provider value={{ items, get, getDetails, create, update, remove }}>{children}</ProjectContext.Provider>;
}
  
  export const useProject = () => useContext(ProjectContext);