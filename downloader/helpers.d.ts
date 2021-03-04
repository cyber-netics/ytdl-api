import { IDwl, IProgress } from './ifaces';
export declare class Endpoints {
    static getTitle: string;
}
export declare class System {
    static createPath(name: string): string;
    static createDownloadable(url: string, path: string, callback: any): Promise<IDwl>;
    static parseProgress({ totalBytesExpectedToWrite, totalBytesWritten }: {
        totalBytesExpectedToWrite: any;
        totalBytesWritten: any;
    }): IProgress;
}
