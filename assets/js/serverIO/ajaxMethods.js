define([], function() {
    return {
        POSTer(url, data, callback) {
            fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            }).then(function(res) {
                return res.json();
            }).then(function(data) {
                callback(null, data);
            }).catch(function(err) {
                callback(err, null);
            });
        },
        GETer(url, data, callback) {
            fetch(url, {
                method: 'GET',
                credentials: 'same-origin',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            }).then(function(res) {
                return res.json();
            }).then(function(data) {
                callback(null, data);
            }).catch(function(err) {
                callback(err, null);
            });
        }
    };
});
