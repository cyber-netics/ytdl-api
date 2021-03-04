import { IContent } from './ifaces';
export default class Validation {
    private id;
    private url;
    constructor(content: IContent);
    private validateListAsync;
    private basicValidation;
    private validateUrl;
    private validateId;
    validate(): Promise<boolean>;
}
