import * as types from './Constants';

import { open, close } from './Actions';

describe('open action creator', () => {
    it('should return correct action object', () => {
        expect(
            open('login')
        ).toEqual(
            {
                type: types.POPOVER_OPEN,
                popoverType: 'login',
            }
        );
    });
});

describe('close action creator', () => {
    it('should return correct action object', () => {
        expect(
            close()
        ).toEqual(
            {
                type: types.POPOVER_CLOSE,
            }
        );
    });
});
