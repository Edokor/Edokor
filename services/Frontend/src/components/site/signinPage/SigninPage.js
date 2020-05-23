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

import './SigninPage.css'

const SigninPage = (props) => {
  const isLoggedIn = Object.keys(props.user).length === 0 ? false : true
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const onError = (message) => {
    setError(message)
    setTimeout(() => setError(''), 3000)
  }

  const handleSignin = async (event) => {
    event.preventDefault()
    try {
      await props.actions.signinUserAction(email, password)
    } catch (error) {
      onError(error)
    }
  }

  return (
    <div className="signin-container user-action-container">
      {isLoggedIn && <Redirect to="/dashboard" />}
      <div className="signin-form user-action-form">
        <div className="site-page-header">Welcome to Edokor</div>
        <form onSubmit={handleSignin}>
          <TextInput
            name="signinEmail"
            label="Email Address"
            placeholder="example@domain.com"
            value={email}
            onChange={onEmailChange}
          />
          <PasswordInput
            name="signinPassword"
            label="Password"
            placeholder=""
            value={password}
            onChange={onPasswordChange}
          />
          <div className="remember-forgot">
            <CheckboxInput text="Remember me" />
            <a href="/forgot-password">Fogot password?</a>
          </div>
          <FormButton type="submit" text="Signin" />
          <div className={'error-field' + (error != '' ? ' error-show' : '')}>
            {error}
          </div>
        </form>
        <div className="account-link">
          <span>
            Don&apos;t have an account yet?<a href="/signup">Join Edokor</a>
          </span>
        </div>
      </div>
      <div className="laptop-img zero-line-height">
        <img src="/public/images/site/laptop.png" />
      </div>
    </div>
  )
}

SigninPage.propTypes = {
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
      signinUserAction: bindActionCreators(
        userActions.signinUserAction,
        dispatch
      ),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage)
