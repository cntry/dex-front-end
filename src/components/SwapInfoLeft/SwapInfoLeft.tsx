import React from 'react';

import './SwapInfoLeft.css';

export const SwapInfoLeft = (props: any) => {
  const {
    text,
  } = props;
  return (
    <div
      className="swap__infoLeft"
    >
      {text}
    </div>
  );
};
