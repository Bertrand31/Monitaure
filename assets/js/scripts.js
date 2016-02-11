$(document).ready(function() {

    var addCheck = function(data) {
        var url = 'http://192.168.1.59:1337/Checks/create';
        //$.post(url, data, function(res) { console.log(res); });
        $.ajax({
			type: "POST",
			url: url,
			contentType: "application/json",
			data: JSON.stringify(data),
			beforeSend: function() {},
			complete: function() {},
			success: function(data) {},
			error: function(data) {},
			dataType: 'json'
		});

    };

    $('#check-add-button').click(function(e) {
        e.preventDefault();
        addCheck({
            name: 'test',
            domainNameOrIP: 'commeunarbre.fr',
            port: 80
        });
    });
});

