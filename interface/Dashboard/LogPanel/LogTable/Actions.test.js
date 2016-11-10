import * as types from './Constants';

import { hydrateLog } from './Actions';

describe('hydrateLog action creator', () => {
    it('should return correct action object', () => {
        expect(
            hydrateLog({ foo: 'bar' })
        ).toEqual(
            {
                type: types.LOG_HYDRATE,
                log: { foo: 'bar' }
            }
        );
    });
});
