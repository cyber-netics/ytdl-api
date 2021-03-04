"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = exports.Endpoints = void 0;
const tslib_1 = require("tslib");
const FileSystem = tslib_1.__importStar(require("expo-file-system"));
class Endpoints {
}
exports.Endpoints = Endpoints;
Endpoints.getTitle = 'https://us-central1-download-master-ea745.cloudfunctions.net/getTitle';
class System {
    static createPath(name) {
        return `${FileSystem.cacheDirectory}${name}`;
    }
    static createDownloadable(url, path, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield FileSystem.createDownloadResumable(url, path, {}, callback);
        });
    }
    static parseProgress({ totalBytesExpectedToWrite, totalBytesWritten }) {
        return {
            total: totalBytesExpectedToWrite || 0,
            current: totalBytesWritten || 0,
            downloaded: Math.round((((totalBytesWritten / totalBytesExpectedToWrite) * 100) + 1) || 0) //Convert to percentage
        };
    }
}
exports.System = System;
