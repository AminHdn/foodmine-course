"use strict";
exports.__esModule = true;
exports.UserModel = exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
}, {
    toJSON: {
        virtuals: true //_id change to id
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)('user', exports.UserSchema);
