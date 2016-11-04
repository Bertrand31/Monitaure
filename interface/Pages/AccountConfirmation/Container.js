import { connect } from 'react-redux';

import { GETer } from '../../serverIO/ajaxMethods';
import * as API from '../../serverIO/dataHandling';

import { open as openPopover } from '../Popover/Actions';

import AccountConfirmationComponent from './Component';

const mapDispatchToProps = dispatch => ({
    openPopover: popoverType => dispatch(openPopover(popoverType)),
    submitToken: (token, callback) => {
        API.confirmAccount(GETer, token, (err, data) => {
            if (err) return callback('error');
            return callback(data.result);
        });
    },
});

const AccountConfirmationContainer = connect(
    null,
    mapDispatchToProps
)(AccountConfirmationComponent);

export default AccountConfirmationContainer;

