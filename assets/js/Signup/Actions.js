import * as types from './Constants.js';
import ajaxMethods from '../serverIO/ajaxMethods';
import dataHandling from '../serverIO/dataHandling';
import PopinsActions from '../Popins/Actions';

export function update(AttrName, AttrValue) {
    return {
        type: types.USER_UPDATE,
        AttrName,
        AttrValue
    };
};

export function signup(data) {
    dataHandling.createUser(ajaxMethods.POSTer, data, function(err, user) {
        if (err) return PopinsActions.create('alert', err.message);

        return {
            type: types.USER_SIGNUP,
            user
        };
    });
};
