$(document).ready(function() {

    var addCheck = function(form) {
        var url = window.location.origin + '/Checks/create';
        //$.post(url, data, function(res) { console.log(res); });
        $.ajax({
			url: url,
            method: form.attr('method'),
			data: form.serialize(),
			beforeSend: function() {},
			complete: function() {},
			success: function(data) {console.log(data);},
			error: function(data) {console.log(data);},
		});

    };

    $('#check-add').on('submit', function(e) {
        e.preventDefault();
        addCheck($(this));
    });

    var destroyCheck = function(data) {
        var url = window.location.origin + '/Checks/destroy';
        $.ajax({
			url: url,
            method: 'GET',
			data: data,
			beforeSend: function() {},
			complete: function() {},
			success: function(data) {alert('success');console.log(data);},
			error: function(data) {alert('error');console.log(data);},
		});

    };

    $('.destroy-check').click(function(e) {
        var idTarget = $(this).closest('tr').attr('id');
        destroyCheck({id: idTarget});
    });
});

