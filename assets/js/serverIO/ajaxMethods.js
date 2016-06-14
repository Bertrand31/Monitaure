define([], function() {
    return {
        GETer(url, callback) {
            fetch(url, {
                method: 'GET',
                credentials: 'same-origin',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            }).then(function(res) {
                return res.json();
            }).then(function(json) {
                callback(null, json);
            }).catch(function(err) {
                callback(err, null);
            });
        },
        POSTer(url, data, callback) {
            fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            })
            .then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
                return res.json();
            })
            .then(json => callback(null, json))
            .catch(err => callback(err, null));
        }
    };
});
