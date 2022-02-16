import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* margin: 5px; */
  padding: 3px;
  /* background-color: #1a2029; */
  background-color: #fff;
  /* background-color: #d6def5; */
  /* color: #2f80ed; */
  /* color: #000; */
  /* border-radius: 15px; */
  border: 1px solid #f2f2f2;
`;

export default function FloatingElement({
  style = undefined,
  children,
  stretchVertical = false,
}) {
  return (
    <Wrapper
      style={{
        height: stretchVertical ? 'calc(100% - 10px)' : undefined,
        ...style,
      }}
    >
      {children}
    </Wrapper>
  );
}
