import { connect } from 'react-redux';
import SignupForm from './Component';
import { update, signup } from '../Actions';

import ajaxMethods from '../../serverIO/ajaxMethods';
import dataHandling from '../../serverIO/dataHandling';

import { create } from '../../Popins/Actions';

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({

    update: (attrName, attrValue) => dispatch(update(attrName, attrValue)),

    signup: (data) => {
        dataHandling.createUser(ajaxMethods.POSTer, data, (err, user) => {
            if (err) return dispatch(create('alert', err.message));

            return dispatch(signup(user));
        });
    },
});

const SignupFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);

export default SignupFormContainer;
