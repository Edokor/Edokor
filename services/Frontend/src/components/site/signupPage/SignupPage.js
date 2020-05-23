import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import TextInput from '../../common/textInput/TextInput'
import PasswordInput from '../../common/passwordInput/PasswordInput'
import FormButton from '../../common/formButton/FormButton'
import CheckboxInput from '../../common/checkboxInput/CheckboxInput'

import * as userActions from '../../../redux/actions/userActions'

import './SignupPage.css'

const SignupPage = (props) => {
  const isLoggedIn = Object.keys(props.user).length === 0 ? false : true
  const [schoolName, setSchoolName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')

  const onSchoolNameChange = (event) => {
    setSchoolName(event.target.value)
  }
  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }
  const onAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms)
  }
  const onError = (message) => {
    setError(message)
    setTimeout(() => setError(''), 3000)
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      if (
        schoolName == '' ||
        email == '' ||
        password == '' ||
        confirmPassword == ''
      ) {
        onError('Provide all the required fields')
      } else if (password != confirmPassword) {
        onError('Confirm Password should match Password')
      } else if (!agreeTerms) {
        onError('Agree to terms before signup')
      } else {
        await props.actions.signupUserAction(
          schoolName,
          email,
          password,
          'School'
        )
      }
    } catch (error) {
      onError(error)
    }
  }

  return (
    <div className="signup-container user-action-container">
      {isLoggedIn && <Redirect to="/dashboard" />}
      <div className="signup-form user-action-form">
        <div className="site-page-header">Welcome to Edokor</div>
        <form onSubmit={handleSignup}>
          <TextInput
            name="signupSchoolName"
            label="School Name"
            placeholder=""
            value={schoolName}
            onChange={onSchoolNameChange}
          />
          <TextInput
            name="signupEmail"
            label="Email Address"
            placeholder="example@domain.com"
            value={email}
            onChange={onEmailChange}
          />
          <PasswordInput
            name="signupPassword"
            label="Password"
            placeholder=""
            value={password}
            onChange={onPasswordChange}
          />
          <PasswordInput
            name="signupConfirmPassword"
            label="Confirm Password"
            placeholder=""
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
          <div className="remember-forgot">
            <CheckboxInput
              text="I agree to terms and conditions"
              checked={agreeTerms}
              onChange={onAgreeTermsChange}
            />
          </div>
          <FormButton type="submit" text="Signup" />
          <div className={'error-field' + (error != '' ? ' error-show' : '')}>
            {error}
          </div>
        </form>
        <div className="account-link">
          <span>
            Already have an account?<a href="/signin">Singin</a>
          </span>
        </div>
      </div>
      <div className="laptop-img zero-line-height">
        <img src="/public/images/site/laptop.png" />
      </div>
    </div>
  )
}

SignupPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      signupUserAction: bindActionCreators(
        userActions.signupUserAction,
        dispatch
      ),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
