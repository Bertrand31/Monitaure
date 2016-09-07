import { connect } from 'react-redux';
import LoginForm from './Component';
import { update } from '../Actions';

import { create } from '../../Popins/Actions';

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({

    update: (attrName, attrValue) => dispatch(update(attrName, attrValue)),

});

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
