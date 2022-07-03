export interface IDTO<T = number> {
    id:                T;
    DeletedBy ?:  number;
    DeletedDate?: string;
}

export interface IProjectDTO extends IDTO<number> {
    projectName: string;
    projectLogo: string | null;
    projectBackground: string | null;
    clients: string | null;
    about: string | null;
    githubLink: string | null;
    figmaLink: string | null;
    microsoftStoreLink: string | null;
    googlePlayLink: string | null;
    appStoreLink: string | null;
    startTime: string;
    deadline: string | null;
    techLead: number;
}