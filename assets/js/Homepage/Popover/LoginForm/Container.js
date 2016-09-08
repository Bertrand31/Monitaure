import { connect } from 'react-redux';
import LoginForm from './Component';
import { login, update } from '../../../User/Actions';

import { POSTer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';

import { create as popinCreate } from '../../../Popins/Actions';

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({

    update: (attrName, attrValue) => dispatch(update(attrName, attrValue)),

    login: (data) => {
        API.login(POSTer, data, (err, res) => {
            if (err) return dispatch(popinCreate('alert', err.message));
            if (!res.user) return dispatch(popinCreate('alert', res.message));

            dispatch(popinCreate('info', res.message));

            return dispatch(login(res.user));
        });
    },

});

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
