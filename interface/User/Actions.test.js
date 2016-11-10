import * as types from './Constants';

import { update, emailSent, hydrate, logout, decrementUnseenReportsCount } from './Actions';

describe('update action creator', () => {
    it('should return correct action object', () => {
        expect(
            update('username', 'Bertrand31')
        ).toEqual(
            {
                type: types.USER_UPDATE,
                attrName: 'username',
                attrValue: 'Bertrand31',
            }
        );
    });
});

describe('emailSent action creator', () => {
    it('should return correct action object', () => {
        expect(
            emailSent()
        ).toEqual(
            {
                type: types.USER_EMAIL_SENT,
            }
        );
    });
});

describe('hydrate action creator', () => {
    it('should return correct action object', () => {
        const userData = {
            username: 'Bertrand31',
        };

        expect(
            hydrate(userData)
        ).toEqual(
            {
                type: types.USER_HYDRATE,
                user: userData,
            }
        );
    });
});

describe('logout action creator', () => {
    it('should return correct action object', () => {
        expect(
            logout()
        ).toEqual(
            {
                type: types.USER_LOGOUT,
            }
        );
    });
});

describe('decrementUnseenReportsCount action creator', () => {
    it('should return correct action object', () => {
        expect(
            decrementUnseenReportsCount()
        ).toEqual(
            {
                type: types.USER_DECREMENT_UNSEEN_REPORTS_COUNT,
            }
        );
    });
});
