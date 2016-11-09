import * as types from './Constants';

import { create, destroy } from './Actions';

describe('\'create\' action creator', () => {
    it('should return valid action object when given 0 arguments', () => {
        const noArguments = create();
        expect(noArguments.type).toBe(types.POPIN_CREATE);
        expect(noArguments.variant).toBe('alert');
        expect(noArguments.text).toBe('An error occured');
    });
    it('should return valid action object when given valid arguments', () => {
        const withArguments = create('info', 'Logged in succesfully');
        expect(withArguments.type).toBe(types.POPIN_CREATE);
        expect(withArguments.variant).toBe('info');
        expect(withArguments.text).toBe('Logged in succesfully');
    });
});

describe('\'create\' action creator', () => {
    it('should return valid action object', () => {
        expect(destroy(0)).toEqual(
            {
                type: types.POPIN_DESTROY,
                id: 0,
            }
        );
    });
});
