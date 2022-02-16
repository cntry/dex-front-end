import React from 'react';
import './WrapperSpace.css';

export const WrapperSpace = (props: any) => {
  return(
    <div className="wrapper__space">
      {props.children}
    </div>
  );
}


