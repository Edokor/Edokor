import React from 'react'
import PropTypes from 'prop-types'

import './CheckboxInput.css'

const CheckboxInput = ({ text }) => {
  return (
    <div className="input-group">
      <label className="container">
        {text}
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </div>
  )
}

CheckboxInput.propTypes = {
  text: PropTypes.string.isRequired,
}

export default CheckboxInput
