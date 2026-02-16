import React from 'react';
import '../styles/components/Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false, 
  onClick, 
  type = 'button',
  fullWidth = false 
}) => {
  const className = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''}`;
  
  return (
    <button 
      type={type} 
      className={className} 
      onClick={onClick} 
      disabled={disabled || isLoading}
    >
      {isLoading ? <span className="loader">Loading...</span> : children}
    </button>
  );
};

export default Button;
