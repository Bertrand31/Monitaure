require(
    ['flux', 'jquery', 'react', 'react-dom', 'moment', 'chartist', 'chartist-plugin-tooltip',
    './charts/create-chart', './charts/create-global-stats', './charts/hide-chart',
    './popins/openFullscreen', './popins/closeFullscreen', './popins/createPopin',
    './ajax/add-check', './ajax/create-user', './ajax/destroy-check', './ajax/get-all-stats', './ajax/get-global-stats', './ajax/show-simple', './ajax/update-check'],
    function(flux, $, React, ReactDOM, moment, Chartist, chartistTooltip,
        createChart, createGlobalStats, hideChart,
        openFullscreen, closeFullscreen, createPopin,
        addCheck, createUser, destroyCheck, getAllStats, getGlobalStats, showSimple, updateCheck) {

        let AppDispatcher = new flux.Dispatcher();

        let CheckActions = {

            create: function(data) {
                AppDispatcher.dispatch({
                    actionName: 'create-check',
                    checkData: data
                });
            },

            update: function(id, data) {
                AppDispatcher.dispatch({
                    actionName: 'update-check',
                    checkId: id,
                    checkData: data
                });
            },

            destroy: function(id) {
                AppDispatcher.dispatch({
                    actionName: 'destroy-check',
                    checkId: id
                });
            }
        };

        AppDispatcher.register(function(payload) {

			switch(payload.actionName) {

				case 'create-check':
					createCheck(data, function(data) {
						_todos[data.id] = {
							id: data.id,
							name: data.id,
							domainNameOrIP: data.domainNameOrIP,
							port: data.port
						};
					});
					break;
			}
		});


        let _checks = {};

        function loadChecks(data) {
            //TODO : résultat de la requete AJAX
        }
        function update(id, data) {
            updateCheck(id, data, function(data) {
                _todos[data.id] = {
                    id: data.id,
                    name: data.id,
                    domainNameOrIP: data.domainNameOrIP,
                    port: data.port
                };
            });
        }
        function destroy(id) {
            destroyCheck(id, function(data) {
                delete _todos[data.id];
            });
        }

		const CheckRow = React.createClass({
			render: function() {
                let lastPingDuration = '-',
                    lastPingSpeed = '',
                    checkState = 'up',
                    row = this.props.row;

                if (typeof row.history[0] !== 'undefined') {
                    if (row.history[0] === null)
                        checkState = 'down';
                    else if (row.history[0] > 200) {
                        lastPingDuration = `${row.history[0].duration} ms`;
                        lastPingSpeed = 'slow';
                    } else {
                        lastPingDuration = `${row.history[0].duration} ms`;
                        lastPingSpeed = 'fast';
                    }
                } else {
                    checkState = 'waiting';
                }

                return (
                    <tr id={row.id}>
                        <td data-health={checkState} className="status"></td>
                        <td className="name">{row.name}</td>
                        <td>{row.domainNameOrIP}</td>
                        <td>{row.port}</td>
                        <td data-speed={lastPingSpeed} className="response-time">
                            {lastPingDuration}
                        </td>
                        <td className="settings">
                            <button onClick={this._onUpdateClick} className="settings-check"></button>
                        </td>
                        <td className="destroy">
                            <button onClick={this._onDestroyClick} className="destroy-check"></button>
                        </td>
                    </tr>
                );
			},

            _onDestroyClick: function() {
                CheckActions.destroy(this.props.row.id);
            }
        });

        const TableData = React.createClass({

            render: function() {

                let rows = [];
                this.props.data.map(function(row) {
                    rows.push(<CheckRow row={row} key={row.id} />);
                });

                return (
                    <table id="checks">
                        <thead><tr><th>Status</th><th>Name</th><th>Domain name or IP</th><th>Port</th><th>Latency</th><th></th><th></th></tr></thead>
                        <tbody>{rows}</tbody>
                    </table>
                );
            }
        });
        const TotalChecks = React.createClass({
            render: function() {
                return (
                    <span>
                        {this.props.data.numberOfChecks}/{this.props.data.checksUp} servers
                    </span>
                    // <span class="secondary-text">are responding</span>
                );
            }
        });
        let AvailabilitiesAvg = React.createClass({
            render: function() {
                return (
                    <span>
                        {this.props.data.availabilitiesAvg}
                    </span>
                );
            }
        });

        let currentChartId = null;

        $(document).ready(function() {

            const chartOptions = {
                fullWidth: false,
                showArea: true,
                low: 0,
                height: 250,
                onlyInteger: true,
                axisY: {
                    // showLabel: false,
                    offset: 50,
                    showGrid: false,
                    scaleMinSpace: 100,
                    labelInterpolationFnc: function(value) {
                        return value + 'ms';
                    }
                },
                plugins: [
                    chartistTooltip()
                ]
            };

            // Automatic data pulling and udpating
            const updateInterval = 1 * 60 * 1000; // 1mn
            setInterval(function() {
                getAllStats(function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {

                        store.tableData.data = data.userData.checks;
                        store.tableData.render();
                        store.globalStats.data = data.globalStats;
                        store.globalStats.render();

                        const globalWrapper = $('.global-data');
                        globalWrapper.find('.last-error--check-name').text(data.globalStats.lastError.checkName);
                        globalWrapper.find('.last-error--time').text(data.globalStats.lastError.duration);

                        // updateTableRows(data.userData.checks);
                        if (currentChartId !== null) {
                            createChart(currentChartId, chartOptions);
                        }
                    }
                });
                getGlobalStats(function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {
                        createGlobalStats(data.globalStats);
                    }
                });
            }, updateInterval);

            // Users management
            $('#signup').on('submit', function(e) {
                e.preventDefault();
                createUser($(this), function(err, user) {
                    if (err) {
                        let errorMsg = '';
                        if (err.responseJSON.hasOwnProperty('invalidAttributes')) {
                            const invalidAttrs = err.responseJSON.invalidAttributes;
                            for (let invalidAttr in invalidAttrs) {
                                if (invalidAttrs.hasOwnProperty(invalidAttr)) {
                                    errorMsg = $('#signup #'+invalidAttr).attr('data-error');
                                }
                            }
                        } else if (err.responseText === 'passwords-mismatch') {
                            errorMsg = $('#signup #confirmPassword').attr('data-error');
                        } else {
                            errorMsg = err.statusText;
                        }
                        createPopin('alert', errorMsg);
                    } else {
                        $('.signup-block').slideUp();
                        $('.confirmation-block>p').text('A confirmation email has just been sent to ' + user.email + '.').slideDown();
                    }
                });
            });

            // 'Add a check' form actions
            $('#open-form').click(function() {
                openFullscreen($('#check-add-form'));
            });
            $('#check-add').on('submit', function(e) {
                e.preventDefault();
                addCheck($(this), function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {
                        $('#checks>tbody').append(
                            `<tr id="${data.id}">
                                <td class="status" data-health="waiting"></td>
                                <td>${data.name}</td>
                                <td>${data.domainNameOrIP}</td>
                                <td>${data.port}</td>
                                <td class="response-time">-</td>
                                <td class="settings"><button class="settings-check"></button></td>
                                <td class="destroy"><button class="destroy-check"></button></td>
                            </tr>`
                        );
                    }
                });
                closeFullscreen($('.fullscreen-wrapper#check-add-form'));
            });
            // Check update form
            $('#check-update').on('submit', function(e) {
                e.preventDefault();
                updateCheck($(this), function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {
                        $('#checks').find('tr#' + data.id + ' .name').text(data.name);
                    }
                });
                closeFullscreen($('.fullscreen-wrapper#check-update-form'));
            });
            $('.fullscreen-wrapper').click(function() {
                closeFullscreen($(this));
            });
            $('.fullscreen-wrapper').find('.centered-box').click(function(e) {
                e.stopPropagation();
            });

            // globalStats is declared inline, in the Jade template
            createGlobalStats(globalStats);

            // Table actions
            const tableWrapper = $('#checks-table-wrapper');
            tableWrapper.on('click', '.destroy-check', function(e) {
                e.stopPropagation();
                const checkId = $(this).closest('tr').attr('id');
                destroyCheck(checkId, function(err, item) {
                    if (err) {
                        createPopin('alert', err);
                    } else {
                        $('#checks tr#'+item.id).fadeOut(function() {
                            $('#checks tr#'+item.id).remove();
                        });
                        if (checkId === currentChartId) {
                            hideChart(function() {
                                currentChartId = null;
                            });
                        }
                    }
                });
            });
            tableWrapper.on('click', '.settings-check', function(e) {
                e.stopPropagation();
                const checkId = $(this).closest('tr').attr('id');
                const form = $('#check-update-form').find('form#check-update');
                showSimple(checkId, function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {
                        form.find('#update-checkId').attr('value', checkId);
                        form.find('#update-name').attr('value', data.name);
                        form.find('#update-domainNameOrIP').attr('value', data.domainNameOrIP);
                        form.find('#update-port').attr('value', data.port);
                        if (data.emailNotifications)
                            form.find('#update-emailNotifications').prop('checked', true);
                        else
                            form.find('#update-emailNotifications').prop('checked', false);
                    }
                });
                openFullscreen($('#check-update-form'));
            });

            // CLICK ON A TABLE ROW
            // Chart handling
            $('#checks-table-wrapper').on('click', 'tbody>tr', function() {
                const currentLine = $(this);
                const id = currentLine.attr('id');
                if (id === currentChartId) {
                    hideChart(function() {
                        currentChartId = null;
                        currentLine.removeClass('active');
                    });
                } else {
                    hideChart(function() {
                        createChart(id, chartOptions);
                        currentChartId = id;
                        currentLine.siblings('.active').removeClass('active');
                        currentLine.addClass('active');
                    });
                }
            });
        });
});
