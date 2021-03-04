"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_native_ytdl_1 = tslib_1.__importDefault(require("react-native-ytdl"));
const helpers_1 = require("./helpers");
const content_1 = tslib_1.__importDefault(require("./content"));
class Downloadable {
    createDownloadable(callback, fileName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { url, filename } = yield this.content;
            // Create path to save file to
            this.path = helpers_1.System.createPath(fileName || filename);
            // Get downloadable url
            const urls = yield react_native_ytdl_1.default(url, { quality: 'highestaudio' });
            // Parse progress to percentage
            const progressCb = progress => callback(helpers_1.System.parseProgress(progress));
            // return downloadable object
            return yield helpers_1.System.createDownloadable(urls[0].url, this.path, progressCb);
        });
    }
}
class Ytdl extends Downloadable {
    constructor(input) {
        super();
        this.url = input.url;
        this.settings = input.settings;
        this.content = new content_1.default(input);
    }
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.content.initialize();
            }
            catch (err) {
                throw err;
            }
            ;
        });
    }
    getContentInfo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.content;
        });
    }
    downloadAsync(callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Create donwloadable & resumable content object
            this.downloadable = yield this.createDownloadable(callback);
            let { status, uri } = yield this.downloadable.downloadAsync();
            // Return undef || obj{status,uri}
            if (status !== 200)
                return;
            return { status, uri };
        });
    }
}
exports.default = Ytdl;
