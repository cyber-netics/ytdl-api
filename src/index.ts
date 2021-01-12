import ytdl from 'react-native-ytdl';
import { System } from './helpers';
import Content from './content';

import {
    IContent, ICbProgress, IDwl, ISettings, Input, IDvlRes
} from './ifaces';


class Downloadable {
    public path: string;
    public content: IContent


    protected async createDownloadable(callback: ICbProgress, fileName?: string): Promise<IDwl> {
        const { url, filename } = await this.content;

        // Create path to save file to
        this.path = System.createPath(fileName || filename);

        // Get downloadable url
        const urls = await ytdl(url, { quality: 'highestaudio' });

        // Parse progress to percentage
        const progressCb = progress => callback(System.parseProgress(progress));

        // return downloadable object
        return await System.createDownloadable(urls[0].url, this.path, progressCb);
    }
}

export default class Ytdl extends Downloadable {
    public url: string;
    public id: string;
    public settings: ISettings;
    public content: IContent;
    public downloadable: IDwl;


    constructor(input: Input) {
        super();
        this.url = input.url;
        this.settings = input.settings;
        this.content = new Content(input);
    }

    public async initialize(): Promise<void> {
        try {
            await this.content.initialize();

        } catch (err) { throw err };
    }

    public async getContentInfo(): Promise<IContent> {
        return this.content;
    }

    public async downloadAsync(callback: ICbProgress): Promise<object | void> {
        // Create donwloadable & resumable content object
        this.downloadable = await this.createDownloadable(callback);
        let { status, uri }: IDvlRes = await this.downloadable.downloadAsync();

        // Return undef || obj{status,uri}
        if (status !== 200) return;
        return { status, uri };
    }
}