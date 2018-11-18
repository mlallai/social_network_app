import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange
}) => {
return (
    <div>
        <div className="input-group mb-3">
        <div className="input-group-prepend">
        <div className="input-group-text">
        <span>
            <i className={icon} />
        </span>
                <input
                className={classnames('form-control form-control-lg', {
                  'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                />
                {error && (<div className='invalid-feedback'>{error}</div>)}
              </div>
            </div>
          </div>
    </div>

)
};

InputGroup.proptypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.stringisRequired,
    onChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;