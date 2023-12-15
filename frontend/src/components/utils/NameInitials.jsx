import React from 'react'
import nameInitCSS from './NameInitials.module.scss'
const NameInitials = (props) => {
  return (
    <div className={`rounded-circle mx-1 select-none ${nameInitCSS.userNameInitials}`}>
      <span>{props.nameInitials}</span>
    </div>
  );
}

export default NameInitials