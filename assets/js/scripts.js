$(document).ready(function() {

    var addCheck = function(form) {
        var url = window.location.origin + '/Checks/create';
        //$.post(url, data, function(res) { console.log(res); });
        $.ajax({
			url: url,
            type: form.attr('method'),
			data: form.serialize(),
			beforeSend: function() {},
			complete: function() {alert('fini');},
			success: function(data) {alert('success' + data);},
			error: function(data) {alert('failure' + data);},
		});

    };

    $('#check-add').on('submit', function(e) {
        e.preventDefault();
        addCheck($(this));
    });
});

