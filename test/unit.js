// const assert = require('chai').assert;
const expect = require('chai').expect;

const { customFloor, isDomainNameOrIP, garbageCollection } = require('../api/services/Utilities');

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
    describe('garbageCollection function', () => {
        it('should return an empty array and not throw', () => {
            expect(garbageCollection({}, new Date())).to.be.an('array');
            expect(garbageCollection({})).to.be.an('array');
            expect(garbageCollection({})).to.be.empty;
		});
        const fakeArray = [
            { id: 1, date: new Date("2016-09-20T17:16:47.327Z") },
            { id: 2, date: new Date("2016-10-13T17:19:47.472Z") },
            { id: 3, date: new Date("2016-10-13T18:35:31.797Z") },
        ];
        it('should trim the first item', () => {
            const fakeDate = new Date("2016-10-21");
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result).to.have.lengthOf(2);
            expect(result[0]['id']).to.equal(2);
        });
        it('should trim the whole array an return an empty array', () => {
            const fakeDate = new Date("2016-11-14");
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result).to.be.empty;
        });
        it('should return the array untouched', () => {
            const fakeDate = new Date("2016-10-20");
            const result = garbageCollection(fakeArray, fakeDate);
            expect(result).to.have.lengthOf(3);
            expect(result[0]['id']).to.equal(1);
        });
    });
});
