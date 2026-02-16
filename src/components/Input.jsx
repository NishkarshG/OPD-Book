import React from 'react';
import '../styles/components/Input.css';

const Input = ({
    label,
    type = 'text',
    id,
    name,
    value,
    onChange,
    placeholder,
    error,
    options = [],
    required = false
}) => {
    return (
        <div className={`input-group ${error ? 'has-error' : ''}`}>
            {label && <label htmlFor={id} className="input-label">{label} {required && '*'}</label>}

            {type === 'select' ? (
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="input-field"
                    required={required}
                >
                    <option value="">{placeholder || 'Select an option'}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="input-field"
                    required={required}
                />
            )}

            {error && <span className="input-error">{error}</span>}
        </div>
    );
};

export default Input;
