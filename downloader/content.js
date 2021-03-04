"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_native_ytdl_1 = tslib_1.__importDefault(require("react-native-ytdl"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const helpers_1 = require("./helpers");
const validation_1 = tslib_1.__importDefault(require("./validation"));
class GetherData {
    setContentTitle() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.title = yield (yield (axios_1.default.post(helpers_1.Endpoints.getTitle, { contentId: this.contentId }))).data.title;
            }
            catch (err) {
                throw { error: 'unable to get video info' };
            }
        });
    }
    setContentId() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.contentId = yield react_native_ytdl_1.default.getVideoID(this.url);
            }
            catch (_) {
                throw { error: 'Video id is not valid' };
            }
        });
    }
    setContentExtention() {
        const format = (this.format).toLowerCase();
        this.filename = `${this.contentId}.${format}`;
    }
    setContentThumbnail() {
        this.thumbnail = `https://img.youtube.com/vi/${this.contentId}/0.jpg`;
    }
}
class Content extends GetherData {
    constructor({ url, settings }) {
        super();
        this.url = url;
        this.format = settings.format;
        this.quality = settings.quality;
    }
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // Validate content -> url/id
                const validation = new validation_1.default(this);
                yield validation.validate();
                yield this.setContentId();
                this.setContentExtention();
                yield this.setContentTitle();
                this.setContentThumbnail();
            }
            catch (err) {
                throw err;
            }
            ;
        });
    }
}
exports.default = Content;
