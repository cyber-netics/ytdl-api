import ytdl from 'react-native-ytdl';
import { IContent } from './ifaces';

export default class Validation {
    private id: string;
    private url: string;

    constructor(content: IContent) {
        this.id = content.contentId;
        this.url = content.url;
    }


    private async validateListAsync(list): Promise<boolean> {
        // Combine url and id output 
        return !list.reduce((a, b) => ((a + b) - 1), 0);
    }


    private async basicValidation(): Promise<void> {
        // Basic validation (length and type)
        if (!this.url.length) {
            // Need custom error class
            throw { error: 'url is not valid' };
        }
    }


    private async validateUrl(): Promise<boolean> {
        try {
            // Not working properly switch to regex
            return await ytdl.validateURL(this.url);

        } catch (err) { throw err };
    }


    private async validateId(): Promise<boolean> {
        try {
            return await ytdl.validateID(this.id);

        } catch (err) { throw err };
    }


    public async validate(): Promise<boolean> {
        // First check for basic validation
        try { await this.basicValidation() }
        catch (err) { throw err };


        try { // return is validation status
            return await this.validateListAsync([
                await this.validateUrl(),
                await this.validateId()
            ])
        }
        catch (err) { throw err };
    }
}