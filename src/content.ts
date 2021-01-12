import ytdl from 'react-native-ytdl';
import axios from 'axios';

import { Endpoints } from './helpers';
import { ISettings } from './ifaces';
import Validation from './validation';

class GetherData {
    public format: string;
    public quality: string;
    public filename: string;
    public url: string;
    public contentId: string;
    public title: string;
    public thumbnail: string;


    protected async setContentTitle(): Promise<void> {
        try {
            this.title = await (
                await (axios.post(Endpoints.getTitle,
                    { contentId: this.contentId }
                ))
            ).data.title;

        } catch (err) {
            throw { error: 'unable to get video info' };
        }
    }

    protected async setContentId(): Promise<void> {
        try {
            this.contentId = await ytdl.getVideoID(this.url);

        } catch (_) {
            throw { error: 'Video id is not valid' };
        }
    }

    protected setContentExtention(): void {
        const format = (this.format).toLowerCase();
        this.filename = `${this.contentId}.${format}`;
    }

    protected setContentThumbnail(): void {
        this.thumbnail = `https://img.youtube.com/vi/${this.contentId}/0.jpg`;
    }
}


export default class Content extends GetherData {
    public contentId: string;
    public url: string;
    public format: string;
    public quality: string;
    public filename: string;
    protected settings: ISettings;

    constructor({ url, settings }) {
        super();
        this.url = url;
        this.format = settings.format;
        this.quality = settings.quality;
    }

    public async initialize(): Promise<void> {
        try {
            // Validate content -> url/id
            const validation = new Validation(this);
            await validation.validate();

            await this.setContentId();
            this.setContentExtention();
            await this.setContentTitle();
            this.setContentThumbnail();

        } catch (err) { throw err };
    }
}

