import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function TextAreaFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
}) {
  return (
      <div className="form-group">
        <textarea 
        className={classnames('form-control form-control-lg mt-3',{
            'is-invalid':error
        })} placeholder={placeholder} name={name}
        value={value}
        onChange={onChange}
      />
        {info && <small className="form-text text-muted">{info}</small>}
        <div className="invalid-feedback">{error}</div>
      </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}


export default TextAreaFieldGroup
