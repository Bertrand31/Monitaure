import * as types from './Constants.js';
import ajaxMethods from '../serverIO/ajaxMethods';
import dataHandling from '../serverIO/dataHandling';
import PopinsActions from '../Popins/Actions';

export function update(attrName, attrValue) {
    return {
        type: types.USER_UPDATE,
        attrName,
        attrValue
    };
};

export function signup(data) {
    return {
        type: types.USER_SIGNUP,
        user
    };
};
