import * as types from './Constants';

import reducer from './Reducer';

describe('ReportsPanel filter reducer', () => {
    it('should return default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(
            {
                checkId: null,
            }
        );
    });

    it('should update arbitrary filter', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_FILTER,
                filterName: 'checkId',
                filterValue: 'aeiou',
            })
        ).toEqual(
            {
                checkId: 'aeiou',
            }
        );
    });
    it('should update previously set filter', () => {
        expect(
            reducer({ checkId: 'a', hiddenTypes: [] }, {
                type: types.UPDATE_FILTER,
                filterName: 'checkId',
                filterValue: 'aeiou',
            })
        ).toEqual(
            {
                checkId: 'aeiou',
                hiddenTypes: [],
            }
        );
    });
});
