import * as types from './Constants';

import reducer from './Reducer';

describe('LogPanel filter reducer', () => {
    it('should return default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(
            {
                checkId: null,
                hiddenTypes: [],
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
                hiddenTypes: [],
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

    it('should hide given type', () => {
        expect(
            reducer(undefined, {
                type: types.ADD_HIDDEN_TYPE,
                typeToHide: 'up',
            })
        ).toEqual(
            {
                checkId: null,
                hiddenTypes: ['up'],
            }
        );
    });
    it('should reveal a hidden type', () => {
        expect(
            reducer(
                {
                    checkId: null,
                    hiddenTypes: ['up'],
                },
                {
                    type: types.REMOVE_HIDDEN_TYPE,
                    typeToShow: 'up',
                }
            )
        ).toEqual(
            {
                checkId: null,
                hiddenTypes: [],
            }
        );
    });
});
