const { customFloor, isDomainNameOrIP, garbageCollection, calcCheckStats, decomposeDuration } = require('./Utilities');

describe('#utilitiy functions', () => {
    describe('customFloor function', () => {
        it('should round to second place', () => {
            expect(customFloor(1/3, 2)).toBe(0.33);
        });
    });
    describe('isDomainNameOrIP function', () => {
        it('should return true', () => {
            expect(isDomainNameOrIP('1.1.1.1')).toBe(true);
            expect(isDomainNameOrIP('monitaure.io')).toBe(true)
            expect(isDomainNameOrIP('sendgrid.monitaure.io')).toBe(true)
        });
        it('should return false', () => {
            expect(isDomainNameOrIP('256.1.1.1')).toBe(false)
            expect(isDomainNameOrIP('https://monitaure.io')).toBe(false)
            expect(isDomainNameOrIP('monitaure.io/tour')).toBe(false)
            expect(isDomainNameOrIP([])).toBe(false)
        });
    });
    const fakeArray = [
        { id: 1, date: new Date('2016-09-20T17:16:47.327Z'), duration: 72 },
        { id: 2, date: new Date('2016-10-13T17:19:47.472Z'), duration: 51 },
        { id: 3, date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
    ];
    describe('garbageCollection function', () => {
        it('should return an empty array and not throw', () => {
            expect(Array.isArray(garbageCollection({}, new Date()))).toBe(true);
            expect(Array.isArray(garbageCollection({}))).toBe(true);
            expect(garbageCollection({}).length).toBe(0);
		});
        it('should trim the first item', () => {
            const fakeDate = new Date('2016-10-21');
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result.length).toBe(2)
            expect(result[0]['id']).toBe(2);
        });
        it('should trim the whole array an return an empty array', () => {
            const fakeDate = new Date('2016-11-14');
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result.length).toBe(0);
        });
        it('should return the array untouched', () => {
            const fakeDate = new Date('2016-10-20');
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result.length).toBe(3)
            expect(result[0]['id']).toBe(1);
        });
    });
    describe('calcCheckStats function', () => {
        it('should return null and not throw', () => {
            const result = calcCheckStats(customFloor);
            expect(result).toBe(null);
        });
        it('should return correct stats', () => {
            const fakeArray1 = [
                { date: new Date('2016-09-20T17:16:47.327Z'), duration: 72 },
                { date: new Date('2016-10-13T17:19:47.472Z'), duration: 51 },
                { date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
            ];
            const result1 = calcCheckStats(customFloor, fakeArray1, 3000);
            expect(result1).not.toBe(null);
            expect(result1.min).toBe(51);
            expect(result1.max).toBe(72);
            expect(result1.avg).toBe(62);
            expect(result1.availability).toBe(66.66);
            expect(result1.totalOutage).toBe(3000);
            expect(result1.lastOutage.getTime()).toBe(new Date('2016-10-13T18:35:31.797Z').getTime());
            expect(result1.numberOfOutages).toBe(1);

            const fakeArray2 = [
                { date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
                { date: new Date('2016-09-20T17:16:47.327Z'), duration: 1428 },
                { date: new Date('2016-10-13T17:19:47.472Z'), duration: 51 },
                { date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
                { date: new Date('2016-09-20T17:16:47.327Z'), duration: 72 },
                { date: new Date('2016-10-13T17:19:47.472Z'), duration: 9000 },
                { date: new Date('2016-10-19T18:35:31.797Z'), duration: null },
            ];
            const result2 = calcCheckStats(customFloor, fakeArray2, 3000);
            expect(result2).not.toBe(null);
            expect(result2.min).toBe(51);
            expect(result2.max).toBe(9000);
            expect(result2.avg).toBe(2638);
            expect(result2.availability).toBe(57.14);
            expect(result2.totalOutage).toBe(9000);
            expect(result2.lastOutage.getTime()).toBe(new Date('2016-10-19T18:35:31.797Z').getTime());
            expect(result2.numberOfOutages).toBe(2);

            const fakeArray3 = [
                { date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
                { date: new Date('2016-09-20T17:16:47.327Z'), duration: null },
                { date: new Date('2016-10-13T17:19:47.472Z'), duration: null },
                { date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
            ];
            const result3 = calcCheckStats(customFloor, fakeArray3, 100);
            expect(result3).not.toBe(null);
            expect(result3.min).toBe(null);
            expect(result3.max).toBe(null);
            expect(result3.avg).toBe(null);
            expect(result3.availability).toBe(0);
            expect(result3.totalOutage).toBe(400);
            expect(result3.lastOutage.getTime()).toBe(new Date('2016-10-13T18:35:31.797Z').getTime());
            expect(result3.numberOfOutages).toBe(0);
        });
    });
    describe('calcCheckStats function', () => {
        it('should throw', () => {
            expect(decomposeDuration.bind(-1)).toThrow('Incorrect milliseconds value');
            expect(decomposeDuration.bind()).toThrow('Incorrect milliseconds value');
            expect(decomposeDuration.bind([])).toThrow('Incorrect milliseconds value');
        });
        it('should return correct object', () => {
            expect(decomposeDuration(0)).toEqual({hours: 0, minutes: 0, seconds: 0});
            expect(decomposeDuration(999)).toEqual({hours: 0, minutes: 0, seconds: 0});
            expect(decomposeDuration(60000)).toEqual({hours: 0, minutes: 1, seconds: 0});
            expect(decomposeDuration(3600000)).toEqual({hours: 1, minutes: 0, seconds: 0});
        });
    });
});
