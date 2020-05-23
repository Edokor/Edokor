import React from 'react'
import PropTypes from 'prop-types'

import './CheckboxInput.css'

const CheckboxInput = ({ text, checked, onChange }) => {
  return (
    <div className="input-group">
      <label className="container">
        {text}
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkmark"></span>
      </label>
    </div>
  )
}

CheckboxInput.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CheckboxInput
