import * as types from './Constants';

import { updateFilter, hideType, showType } from './Actions';

describe('updateFilter action creator', () => {
    it('should return correct action object', () => {
        expect(
            updateFilter('checkId', 'aeiou')
        ).toEqual(
            {
                type: types.UPDATE_FILTER,
                filterName: 'checkId',
                filterValue: 'aeiou',
            }
        );
    });
});

describe('hideType action creator', () => {
    it('should return correct action object', () => {
        expect(
            hideType('up')
        ).toEqual(
            {
                type: types.ADD_HIDDEN_TYPE,
                typeToHide: 'up',
            }
        );
    });
});

describe('showType action creator', () => {
    it('should return correct action object', () => {
        expect(
            showType('up')
        ).toEqual(
            {
                type: types.REMOVE_HIDDEN_TYPE,
                typeToShow: 'up',
            }
        );
    });
});
