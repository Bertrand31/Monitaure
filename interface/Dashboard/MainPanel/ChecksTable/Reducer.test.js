import * as types from './Constants';

import reducer from './Reducer';

describe('check main reducer', () => {
    it('should return default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({});
    });

    const fakeChecks = {
        '0': {
            id: '0',
            name: 'test0',
            domaineNameOrIP: '1.1.1.1',
            port: 443,
            history: [],
            emailNotifications: true,
            isEditing: false,
        },
        '1': {
            id: '1',
            name: 'test1',
            domainNameOrIP: '8.8.8.8',
            port: '22',
            history: [],
            emailNotifications: false,
            isEditing: true,
        },
    };
    it('should correctly hydrate an empty state', () => {
        expect(
            reducer(undefined, {
                type: types.CHECKS_HYDRATE,
                checks: fakeChecks,
            })
        ).toEqual(fakeChecks);
    });

    const fakeChecks1 = {
        '0': {
            id: '0',
            name: 'test0',
            domainNameOrIP: '1.1.1.1',
            port: 443,
            history: [],
            emailNotifications: true,
            isEditing: false,
        },
    };
    it('should remove a check that no longer exists in fresh data', () => {
        expect(
            reducer(fakeChecks, {
                type: types.CHECKS_HYDRATE,
                checks: fakeChecks1,
            })
        ).toEqual(fakeChecks1);
    });

    const fakeChecks2 = {
        '1': {
            id: '1',
            name: 'test1-2',
            domainNameOrIP: '8.8.8.8',
            port: '22',
            history: [],
            emailNotifications: true,
            isEditing: true,
        },
    };
    it('should remove a check that no longer exists in fresh data and let attributes being edited untouched', () => {
        expect(
            reducer(fakeChecks, {
                type: types.CHECKS_HYDRATE,
                checks: fakeChecks2,
            })
        ).toEqual({ '1': fakeChecks['1']});
    });

    it('should leave tmpID check untouched when hydrating the store with fresh data', () => {
        expect(
            reducer(
                {
                    ...fakeChecks,
                    'tmpID': {
                        id: 'tmpID',
                        port: 80,
                    },
                }, {
                    type: types.CHECKS_HYDRATE,
                    checks: fakeChecks,
                },
            )
        ).toEqual(
            {
                ...fakeChecks,
                'tmpID': {
                    id: 'tmpID',
                    port: 80,
                },
            }
        );
    });
});
describe('check sub-reducer', () => {
    it('should create a basic, temporary check', () => {
        expect(
            reducer(undefined, {
                type: types.CREATE_WORKING_CHECK,
            })
        ).toEqual(
            {
                'tmpID': {
                    id: 'tmpID',
                    name: '',
                    domainNameOrIP: '',
                    port: 80,
                    history: [],
                    emailNotifications: true,
                    isEditing: true,
                },
            },
        );
    });

    const fakeChecks = {
        '0': {
            id: '0',
            name: 'test0',
            domaineNameOrIP: '1.1.1.1',
            port: 443,
            history: [],
            emailNotifications: true,
            isEditing: false,
        },
        '1': {
            id: '1',
            name: 'test1',
            domainNameOrIP: '8.8.8.8',
            port: '22',
            history: [],
            emailNotifications: false,
            isEditing: true,
        },
    };
    it('should set a check as editing', () => {
        expect(
            reducer(fakeChecks, {
                type: types.SET_WORKING_CHECK,
                id: '0',
            })
        ).toEqual(
            {
                ...fakeChecks,
                '0': {
                    oldState: fakeChecks['0'],
                    ...fakeChecks['0'],
                    isEditing: true,
                },
            },
        );
    });

    const fakeChecksWithOneBeingEdited = {
        '1': {
            oldState: {
                id: '1',
                name: 'test1',
                domainNameOrIP: '8.8.8.8',
                port: '22',
                history: [],
                emailNotifications: false,
                isEditing: false,
            },
            id: '1',
            name: 'test12',
            domainNameOrIP: '8.8.8.8',
            port: '22',
            history: [],
            emailNotifications: true,
            isEditing: true,
        },
    };
    it('should restore a check to its original state', () => {
        expect(
            reducer(fakeChecksWithOneBeingEdited,
                {
                    type: types.UNSET_WORKING_CHECK,
                    id: '1',
                }
            )
        ).toEqual(
            {
                '1': {
                    ...fakeChecksWithOneBeingEdited['1'].oldState,
                },
            },
        );
    });

    const singleCheck = {
        '0': {
            id: '0',
            name: 'test',
            domainNameOrIP: '8.8.8.8',
            port: '80',
            history: [],
            emailNotifications: true,
            isEditing: true,
        },
    };
    it('should update a check\'s attribute', () => {
        expect(
            reducer(singleCheck,
                {
                    type: types.UPDATE_WORKING_CHECK,
                    id: '0',
                    attrName: 'name',
                    attrValue: 'foo',
                }
            )
        ).toEqual(
            {
                '0': {
                    ...singleCheck['0'],
                    name: 'foo',
                },
            }
        );
    });

    it('should save a check being edited', () => {
        expect(
            reducer(singleCheck,
                {
                    type: types.SAVE_WORKING_CHECK,
                    data: {
                        ...singleCheck['0'],
                        name: 'bar',
                    },
                }
            )
        ).toEqual(
            {
                '0': {
                    ...singleCheck['0'],
                    name: 'bar',
                    isEditing: false,
                },
            }
        );
    });

    it('should destroy a check', () => {
        expect(
            reducer(fakeChecks,
                {
                    type: types.CHECK_DESTROY,
                    id: '0',
                }
            )
        ).toEqual({
            '1': fakeChecks['1'],
        });
    });
});
