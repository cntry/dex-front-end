import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html,body{
  /* background: #11161D; */
  background: #fff;
}
input[type=number]::-webkit-inner-spin-button {
  opacity: 0;
}
input[type=number]:hover::-webkit-inner-spin-button,
input[type=number]:focus::-webkit-inner-spin-button {
  opacity: 0.25;
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f2f2f2;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #2f80ed;
}
/* Handle on hover */
/* ::-webkit-scrollbar-thumb:hover {
  background: #5b5f67;
} */
.ant-slider-track, .ant-slider:hover .ant-slider-track {
  background-color: #2f80ed;
  opacity: 0.75;
}
.ant-slider-track,
.ant-slider ant-slider-track:hover {
  background-color: #2f80ed;
  opacity: 0.75;
}
.ant-slider-dot-active,
.ant-slider-handle,
.ant-slider-handle-click-focused,
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open)  {
  border: 2px solid #2f80ed;
}
.ant-table-tbody > tr.ant-table-row:hover > td {
  background: #273043;
}
.ant-table-tbody > tr > td {
  border-bottom: 8px solid #1A2029;
}
.ant-table-container table > thead > tr:first-child th {
  border-bottom: none;
}
.ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after {
  border-top: 1px solid #434a59 !important;
}
.ant-layout {
    /* background: #11161D */
    background: #fff
  }
  .ant-table {
    /* background: #212734; */
    background: #fff;
  }
  .ant-table-thead > tr > th {
    /* background: #1A2029; */
    background: #fff;
  }
.ant-select-item-option-content {
  img {
    margin-right: 4px;
  }
}
.ant-modal-content {
  background-color: #212734;
  /* background-color: #fff; */
}

@-webkit-keyframes highlight {
  /* from { background-color: #2abdd2;}
  to {background-color: #1A2029;} */
  from { background-color: #fff;}
  to {background-color: #fff;}
}
@-moz-keyframes highlight {
  /* from { background-color: #2abdd2;}
  to {background-color: #1A2029;} */
  from { background-color: #fff;}
  to {background-color: #fff;}
}
@-keyframes highlight {
  /* from { background-color: #2abdd2;}
  to {background-color: #1A2029;} */
  from { background-color: #fff;}
  to {background-color: #fff;}
}
.flash {
  -moz-animation: highlight 0.5s ease 0s 1 alternate ;
  -webkit-animation: highlight 0.5s ease 0s 1 alternate;
  animation: highlight 0.5s ease 0s 1 alternate;
}`;
