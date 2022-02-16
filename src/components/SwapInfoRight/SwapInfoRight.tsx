import React from 'react';

import './SwapInfoRight.css';

export const SwapInfoRight = (props: any) => {
  const {
    approximateValue,
    tokenValue,
  } = props;

  return (
    <div
      className='swap__infoRight'
    >
      <div
        className='swap__approximateValue'
      >
        {approximateValue}
      </div>
      <div
        className='swap__tokenValue'
      >
        {tokenValue}
      </div>
    </div>
  );
};
