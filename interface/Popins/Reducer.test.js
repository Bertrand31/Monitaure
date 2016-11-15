import * as types from './Constants';

import reducer from './Reducer';

describe('popinsReducer', () => {
    it('should correctly add a popin', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({});
    });
    it('should correctly add a popin', () => {
        expect(
            reducer(undefined, {
                type: types.POPIN_CREATE,
                id: 0,
                variant: 'alert',
                text: 'An error occured',
            })
        ).toEqual(
            {
                0: {
                    id: 0,
                    variant: 'alert',
                    text: 'An error occured',
                },
            },
        );
    });
    it('should correctly destroy a popin', () => {
        expect(
            reducer({
                0: {
                    id: 0,
                    variant: 'alert',
                    text: 'An error occured',
                },
            }, {
                type: types.POPIN_DESTROY,
                id: 0,
            })
        ).toEqual({});
    });
});
