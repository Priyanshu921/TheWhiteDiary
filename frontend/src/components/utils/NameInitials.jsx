import React from 'react'
import nameInitCSS from './NameInitials.module.scss'
const NameInitials = (props) => {
  return (
    <span className={`rounded-circle mx-1 ${nameInitCSS.userNameInitials}`}>
      {props.nameInitials}
    </span>
  );
}

export default NameInitials