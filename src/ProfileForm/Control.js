import React from 'react';
import s from './Control.module.css';

const Control = ({ className, id, value, type, name, onChange, errorMessage, showError, label }) => {
  return <div className={className}>
    <label htmlFor={id} className={s.label}>{label}</label>
    <input
      id={id}
      value={value}
      type={type}
      name={name}
      onChange={onChange}
    />
    {showError && <div className={s.error}>{errorMessage}</div>}
  </div>
};

export default Control;