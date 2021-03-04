export interface ISettings {
    format: string;
    quality: string;
}
export interface Input {
    url: string;
    settings: ISettings;
}
export interface IContent {
    url: string;
    contentId: string;
    filename: string;
    initialize?: () => any;
}
export interface IDwl {
    downloadAsync: () => object;
}
export interface IProgress {
    total: number;
    current: number;
    downloaded: number;
}
export interface ICbProgress {
    (progress: IProgress): any;
}
export interface IDvlRes {
    uri?: string;
    status?: number;
    headers?: any;
}
export interface IPorgress {
    total: number;
    current: number;
    downloaded: number;
}
export interface IVerify {
    err?: string;
    success?: string;
}
