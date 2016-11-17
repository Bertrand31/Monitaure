import * as types from './Constants';

import reducer from './Reducer';

describe('user reducer', () => {
    it('should return default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(
            {
                isLoggedIn: false,
            }
        );
    });

    const fakeState = {
        username: 'Bertrand31',
        unseenLog: 2,
        unseenReports: 8,
        loggedIn: true,
        emailSent: false,
    };

    it('should update user attributes correctly', () => {
        expect(
            reducer(fakeState,
                {
                    type: types.USER_UPDATE,
                    attrName: 'username',
                    attrValue: 'Bertrand310',
                }
            )
        ).toEqual(
            {
                ...fakeState,
                username: 'Bertrand310',
            }
        );
    });

    it('should set emailSent to true', () => {
        expect(
            reducer(fakeState,
                {
                    type: types.USER_EMAIL_SENT,
                }
            )
        ).toEqual(
            {
                ...fakeState,
                emailSent: true,
            }
        );
    });

    it('should hydrate state with fresh data', () => {
        expect(
            reducer(fakeState,
                {
                    type: types.USER_HYDRATE,
                    user: { foo: 'bar' },
                }
            )
        ).toEqual(
            {
                foo: 'bar',
            }
        );
    });

    it('should empty state and set isLoggedIn to false', () => {
        expect(
            reducer(fakeState,
                {
                    type: types.USER_LOGOUT,
                }
            )
        ).toEqual(
            {
                isLoggedIn: false,
            }
        );
    });

    it('should decrement unseenReports', () => {
        expect(
            reducer(fakeState,
                {
                    type: types.USER_DECREMENT_UNSEEN_REPORTS_COUNT,
                }
            )
        ).toEqual(
            {
                ...fakeState,
                unseenReports: 7,
            }
        );
    });

    it('should set unseenLog to 0', () => {
        expect(
            reducer(fakeState,
                {
                    type: types.USER_RESET_UNSEEN_LOG_COUNT,
                }
            )
        ).toEqual(
            {
                ...fakeState,
                unseenLog: 0,
            }
        );
    });
});
