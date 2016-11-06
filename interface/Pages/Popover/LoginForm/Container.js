import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as UserActions from '../../../User/Actions';

import { POSTer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';

import { create as popinCreate } from '../../../Popins/Actions';
import { open } from '../Actions';

import LoginFormComponent from './Component';

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({

    update: (attrName, attrValue) => dispatch(UserActions.update(attrName, attrValue)),

    login: data => API.login(POSTer, data, (err, res) => {
        if (err) return dispatch(popinCreate('alert', err.message));
        if (!res.user) return dispatch(popinCreate('alert', res.message));

        dispatch(UserActions.hydrate(res.user));
        browserHistory.push('/app');
    }),

    replacePopover: popoverType => dispatch(open(popoverType)),

});

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormComponent);

export default LoginFormContainer;
