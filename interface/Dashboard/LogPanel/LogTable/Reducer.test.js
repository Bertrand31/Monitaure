import * as types from './Constants';

import reducer from './Reducer';

describe('log reducer', () => {
    it('should return default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual([]);
    });

    it('should hydrate state successfuly', () => {
        expect(
            reducer(undefined,
                {
                    type: types.LOG_HYDRATE,
                    log: ['foo', 'bar'],
                }
            )
        ).toEqual(['foo', 'bar']);
    });
    it('should update state successfuly', () => {
        expect(
            reducer(['blop', 'test'],
                {
                    type: types.LOG_HYDRATE,
                    log: ['foo', 'bar'],
                }
            )
        ).toEqual(['foo', 'bar']);
    });
});
