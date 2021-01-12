import * as FileSystem from 'expo-file-system';
import { IDwl, IProgress } from './ifaces';


export class Endpoints {
    public static getTitle = 'https://us-central1-download-master-ea745.cloudfunctions.net/getTitle';
}


export class System {
    public static createPath(name: string): string {
        return `${FileSystem.cacheDirectory}${name}`;
    }

    public static async createDownloadable(url: string, path: string, callback): Promise<IDwl> {
        return await FileSystem.createDownloadResumable(
            url, path, {}, callback
        )
    }

    public static parseProgress({ totalBytesExpectedToWrite, totalBytesWritten }): IProgress {
        return {
            total: totalBytesExpectedToWrite || 0,
            current: totalBytesWritten || 0,
            downloaded: Math.round((((totalBytesWritten / totalBytesExpectedToWrite) * 100) + 1) || 0) //Convert to percentage
        }
    }
}