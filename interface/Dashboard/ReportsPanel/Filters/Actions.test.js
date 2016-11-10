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
