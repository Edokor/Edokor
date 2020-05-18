import React from 'react'
import PropTypes from 'prop-types'

const PasswordInput = ({ name, label, placeholder, value, onChange }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="password"
          name={name}
          id={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}

export default PasswordInput
