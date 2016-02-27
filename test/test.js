var sails = require('sails');
var assert = require('assert');

before(function(done) {
	// Increase the Mocha timeout so that Sails has enough time to lift.
	this.timeout(5000);
	sails.lift({
		// configuration for testing purposes
	}, function(err, server) {
		if (err) return done(err);
		// here you can load fixtures, etc.
		done(err, sails);
	});
});

after(function(done) {
	// here you can clear fixtures, etc.
	sails.lower(done);
});


describe('Checks management', function() {

	var sampleCheck = {
        name: 'HTTP @ Portfolio',
		domainNameOrIP: 'awebsiteabout.me',
        port: 80
	};
	describe('Create a check', function () {
		it('should return the created check', function () {
            ChecksManagement.createCheck(sampleCheck, function(created) {
                console.log(created.name);
                // test.string(created.name).isIdenticalTo('HTTP @ SYS');
                // test.object(created).hasKey('name', 'HTTP @ SYS');
                // done();
                var err = true;
                if (err) return done(err);
                done();
			});
		});
	});
});
