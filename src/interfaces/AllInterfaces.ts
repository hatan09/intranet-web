export interface IDTO<T = number> {
    id:                T;
    DeletedBy ?:  number;
    DeletedDate?: string;
}

export interface IProjectDTO extends IDTO<number> {
    projectName: string;
    projectLogo: string | undefined;
    projectBackground?: string | undefined;
    clients?: string | undefined;
    about?: string | undefined;
    githubLink?: string | undefined;
    figmaLink?: string | undefined;
    microsoftStoreLink?: string | undefined;
    googlePlayLink?: string | undefined;
    appStoreLink?: string | undefined;
    startTime: string;
    deadline?: string | undefined;
    techLead: number;
}

export interface IUserDTO extends IDTO<string>{
    guid: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic: string | undefined;
    phoneNumber: string;
    requestServiceId: number;
    roles: string[];
}

export interface ILoginModel {
    userName: string;
    password: string;
}

export interface IToken extends IDTO<string> {
    requestAt: string;
    expiresIn: string;
    accessToken : string;
    refresh_token : string;
    userInfo  : IUserDTO | undefined;
}
