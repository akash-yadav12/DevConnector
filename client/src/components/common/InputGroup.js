import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function InputGroup({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) {
  return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text mt-3">
            <i className={icon} style={{padding:'10px 0px'}}></i>
          </span>
        </div>
        <input 
        className={classnames('form-control form-control-lg mt-3',{
            'is-invalid':error
        })} placeholder={placeholder} name={name}
        value={value}
        onChange={onChange}
      />
        <div className="invalid-feedback">{error}</div>
      </div>
  )
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
  type: 'text'
}


export default InputGroup
