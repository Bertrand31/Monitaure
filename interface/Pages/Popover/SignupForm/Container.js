import { connect } from 'react-redux';

import { POSTer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';

import { create as popinCreate } from '../../../Popins/Actions';
import { open } from '../Actions';
import * as UserActions from '../../../User/Actions';

import SignupFormComponent from './Component';

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({

    update: (attrName, attrValue) => dispatch(UserActions.update(attrName, attrValue)),

    signup: data => API.createUser(POSTer, data, (err) => {
        if (err) return dispatch(popinCreate('alert', err.message));

        return dispatch(UserActions.emailSent());
    }),

    replacePopover: popoverType => dispatch(open(popoverType)),
});

const SignupFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupFormComponent);

export default SignupFormContainer;
