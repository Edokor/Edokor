import React from 'react'
import PropTypes from 'prop-types'

import './FormButton.css'

const FormButton = ({ type, text }) => {
  return (
    <div className="form-button">
      <button type={type} className="btn btn-primary">
        {text}
      </button>
    </div>
  )
}

FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default FormButton
