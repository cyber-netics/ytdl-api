"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_native_ytdl_1 = tslib_1.__importDefault(require("react-native-ytdl"));
class Validation {
    constructor(content) {
        this.id = content.contentId;
        this.url = content.url;
    }
    validateListAsync(list) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Combine url and id output 
            return !list.reduce((a, b) => ((a + b) - 1), 0);
        });
    }
    basicValidation() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Basic validation (length and type)
            if (!this.url.length) {
                // Need custom error class
                throw { error: 'url is not valid' };
            }
        });
    }
    validateUrl() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // Not working properly switch to regex
                return yield react_native_ytdl_1.default.validateURL(this.url);
            }
            catch (err) {
                throw err;
            }
            ;
        });
    }
    validateId() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield react_native_ytdl_1.default.validateID(this.id);
            }
            catch (err) {
                throw err;
            }
            ;
        });
    }
    validate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // First check for basic validation
            try {
                yield this.basicValidation();
            }
            catch (err) {
                throw err;
            }
            ;
            try { // return is validation status
                return yield this.validateListAsync([
                    yield this.validateUrl(),
                    yield this.validateId()
                ]);
            }
            catch (err) {
                throw err;
            }
            ;
        });
    }
}
exports.default = Validation;
