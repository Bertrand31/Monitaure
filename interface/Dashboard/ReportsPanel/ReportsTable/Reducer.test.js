import * as types from './Constants';

import reducer from './Reducer';

describe('reports table reducer', () => {
    it('should return default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual([]);
    });

    it('should hydrate state successfuly', () => {
        expect(
            reducer(undefined,
                {
                    type: types.REPORTS_HYDRATE,
                    reports: ['foo', 'bar'],
                }
            )
        ).toEqual(['foo', 'bar']);
    });
    it('should update state successfuly', () => {
        expect(
            reducer(['blop', 'test'],
                {
                    type: types.REPORTS_HYDRATE,
                    reports: ['foo', 'bar'],
                }
            )
        ).toEqual(['foo', 'bar']);
    });
});
