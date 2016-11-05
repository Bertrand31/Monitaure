// const assert = require('chai').assert;
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-datetime'));

const { customFloor, isDomainNameOrIP, garbageCollection, calcCheckStats, decomposeDuration } = require('../api/services/Utilities');

describe('#utilitiy functions', () => {
    describe('customFloor function', () => {
        it('should round to second place', () => {
            expect(customFloor(1/3, 2)).to.be.equal(0.33);
        });
    });
    describe('isDomainNameOrIP function', () => {
        it('should return true', () => {
            expect(isDomainNameOrIP('1.1.1.1')).to.be.true;
            expect(isDomainNameOrIP('monitaure.io')).to.be.true;
            expect(isDomainNameOrIP('sendgrid.monitaure.io')).to.be.true;
        });
        it('should return false', () => {
            expect(isDomainNameOrIP('256.1.1.1')).to.be.false;
            expect(isDomainNameOrIP('https://monitaure.io')).to.be.false;
            expect(isDomainNameOrIP('monitaure.io/tour')).to.be.false;
            expect(isDomainNameOrIP([])).to.be.false;
        });
    });
    const fakeArray = [
        { id: 1, date: new Date('2016-09-20T17:16:47.327Z'), duration: 72 },
        { id: 2, date: new Date('2016-10-13T17:19:47.472Z'), duration: 51 },
        { id: 3, date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
    ];
    describe('garbageCollection function', () => {
        it('should return an empty array and not throw', () => {
            expect(garbageCollection({}, new Date())).to.be.an('array');
            expect(garbageCollection({})).to.be.an('array');
            expect(garbageCollection({})).to.be.empty;
		});
        it('should trim the first item', () => {
            const fakeDate = new Date('2016-10-21');
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result).to.have.lengthOf(2);
            expect(result[0]['id']).to.equal(2);
        });
        it('should trim the whole array an return an empty array', () => {
            const fakeDate = new Date('2016-11-14');
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result).to.be.empty;
        });
        it('should return the array untouched', () => {
            const fakeDate = new Date('2016-10-20');
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result).to.have.lengthOf(3);
            expect(result[0]['id']).to.equal(1);
        });
    });
    describe('calcCheckStats function', () => {
        it('should return null and not throw', () => {
            const result = calcCheckStats(customFloor);
            expect(result).to.be.null;
        });
        it('should return correct stats', () => {
            const fakeArray1 = [
                { date: new Date('2016-09-20T17:16:47.327Z'), duration: 72 },
                { date: new Date('2016-10-13T17:19:47.472Z'), duration: 51 },
                { date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
            ];
            const result1 = calcCheckStats(customFloor, fakeArray1, 3000);
            expect(result1).to.be.not.null;
            expect(result1.min).to.equal(51);
            expect(result1.max).to.equal(72);
            expect(result1.avg).to.equal(62);
            expect(result1.availability).to.equal(66.66);
            expect(result1.totalOutage).to.equal(3000);
            expect(result1.lastOutage).to.equalDate(new Date('2016-10-13T18:35:31.797Z'));
            expect(result1.numberOfOutages).to.equal(1);

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
            expect(result2).to.be.not.null;
            expect(result2.min).to.equal(51);
            expect(result2.max).to.equal(9000);
            expect(result2.avg).to.equal(2638);
            expect(result2.availability).to.equal(57.14);
            expect(result2.totalOutage).to.equal(9000);
            expect(result2.lastOutage).to.equalDate(new Date('2016-10-19T18:35:31.797Z'));
            expect(result2.numberOfOutages).to.equal(2);

            const fakeArray3 = [
                { date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
                { date: new Date('2016-09-20T17:16:47.327Z'), duration: null },
                { date: new Date('2016-10-13T17:19:47.472Z'), duration: null },
                { date: new Date('2016-10-13T18:35:31.797Z'), duration: null },
            ];
            const result3 = calcCheckStats(customFloor, fakeArray3, 100);
            expect(result3).to.be.not.null;
            expect(result3.min).to.be.null;
            expect(result3.max).to.be.null;
            expect(result3.avg).to.be.null;
            expect(result3.availability).to.equal(0);
            expect(result3.totalOutage).to.equal(400);
            expect(result3.lastOutage).to.equalDate(new Date('2016-10-13T18:35:31.797Z'));
            expect(result3.numberOfOutages).to.equal(0);
        });
    });
    describe('calcCheckStats function', () => {
        it('should throw', () => {
            expect(decomposeDuration.bind(-1)).to.throw('Incorrect milliseconds value');
            expect(decomposeDuration.bind()).to.throw('Incorrect milliseconds value');
            expect(decomposeDuration.bind([])).to.throw('Incorrect milliseconds value');
        });
        it('should return correct object', () => {
            expect(decomposeDuration(0)).to.deep.equal({hours: 0, minutes: 0, seconds: 0});
            expect(decomposeDuration(999)).to.deep.equal({hours: 0, minutes: 0, seconds: 0});
            expect(decomposeDuration(60000)).to.deep.equal({hours: 0, minutes: 1, seconds: 0});
            expect(decomposeDuration(3600000)).to.deep.equal({hours: 1, minutes: 0, seconds: 0});
        });
    });
});
