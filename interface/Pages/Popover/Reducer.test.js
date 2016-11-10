import * as types from './Constants';

import reducer from './Reducer';

describe('popover reducer', () => {
    it('should return default state', () => {
        expect(
            reducer(undefined, {})
        ).toBe(null);
    });

    it('should open intended popover', () => {
        expect(
            reducer(undefined, {
                type: types.POPOVER_OPEN,
                popoverType: 'login',
            })
        ).toBe('login');
    });
    it('should replace open popover', () => {
        expect(
            reducer('login', {
                type: types.POPOVER_OPEN,
                popoverType: 'signup',
            })
        ).toBe('signup');
    });

    it('should close open popover', () => {
        expect(
            reducer('login', {
                type: types.POPOVER_CLOSE,
            })
        ).toBe(null);
    });
});
