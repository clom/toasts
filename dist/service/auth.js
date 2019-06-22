"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../helper/auth");
const axios_1 = require("../helper/axios");
exports.createToken = async () => {
    const { appKey, authModel } = auth_1.authHelper();
    const response = await axios_1.axios.post(`/compute/v1.0/appkeys/${appKey}/tokens`, { auth: authModel });
    if (response.status != 200) {
        throw `Error response: ${response.status}`;
    }
    const data = response.data;
    if (!data.header.isSuccessful && !data.access) {
        throw `isFailed: ${data.header.resultMessage}`;
    }
    const accessModel = data.access;
    return accessModel.token.id;
};
