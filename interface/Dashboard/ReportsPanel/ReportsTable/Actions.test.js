import * as types from './Constants';

import { hydrateReports } from './Actions';

describe('hydrateReports action creator', () => {
    it('should return correct action object', () => {
        expect(
            hydrateReports({ foo: 'bar' })
        ).toEqual(
            {
                type: types.REPORTS_HYDRATE,
                reports: { foo: 'bar' }
            }
        );
    });
});
