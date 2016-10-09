import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import LoginForm from './Component';
import * as UserActions from '../../../User/Actions';

import { POSTer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';

import { create as popinCreate } from '../../../Popins/Actions';

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({

    update: (attrName, attrValue) => dispatch(UserActions.update(attrName, attrValue)),

    login: data => API.login(POSTer, data, (err, res) => {
        if (err) return dispatch(popinCreate('alert', err.message));
        if (!res.user) return dispatch(popinCreate('alert', res.message));

        browserHistory.push('/');
        dispatch(UserActions.login(res.user));
    }),

});

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
