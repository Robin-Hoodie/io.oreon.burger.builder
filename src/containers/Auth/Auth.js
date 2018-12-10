import React, {Component} from 'react';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as validators from '../../utility/validators';
import classes from './Auth.css';
import {auth, setAuthRedirectPath} from '../../store/actions/authActions';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: false,
        formIsValid: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isAuthenticated) {
            this.props.history.push(this.props.authRedirectPath);
        }
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = validators.validateRequired(value) && isValid;
        }
        if (rules.minLength) {
            isValid = validators.validateMinLength(value, rules.minLength) && isValid;
        }
        if (rules.maxLength) {
            isValid = validators.validateMaxLength(value, rules.maxLength) && isValid;
        }
        if (rules.email) {
            isValid = validators.validateEmail(value) && isValid;
        }
        return isValid;
    }

    handleInputChange = (e, controlName) => {
        const updatedOrderForm = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({
            controls: updatedOrderForm
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    handleSwitchAuthMode = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp,
                controls: {
                    ...prevState.controls,
                    email: {
                        ...prevState.controls.email,
                        value: '',
                        touched: false
                    },
                    password: {
                        ...prevState.controls.password,
                        value: '',
                        touched: false
                    }
                }
            }
        });
    };

    render() {
        const controls = [];
        for (let key in this.state.controls) {
            controls.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = controls.map(formElement => (
            <Input
                onChange={(e) => this.handleInputChange(e, formElement.id)}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />
        ));
        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p style={{color: 'red'}}>{this.props.error.message}</p>
        }
        return (
            <div className={classes.Auth}>
                <h1>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h1>
                <form onSubmit={this.handleSubmit}>
                    {form}
                    {errorMessage}
                    <Button type="Success">
                        SUBMIT
                    </Button>
                </form>
                <Button type="Danger"
                        onClick={this.handleSwitchAuthMode}>
                    {'SWITCH TO ' + (this.state.isSignUp ? 'SIGN IN' : 'SIGN UP')}
                </Button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.redirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);