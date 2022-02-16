import React from 'react';
// import { Dropdown, Menu } from 'antd';
import { Menu } from 'antd';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';

import styled from 'styled-components';

const Wallet = styled.div`
  color: #000;
  /* background-color: #0d1017; */
  /* background-color: rgba(216, 240, 250, 0.6); */
  /* background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 30px;
  flex-wrap: wrap; */
  width: "100%";
  /* border-radius: theme.spacing(2), */
  // backgroundColor: theme.palette.primary.main,
  // backgroundColor: "#2196F3",
  // color: theme.palette.primary.contrastText,
  font-size: 14;
  line-height: 22px;
  // padding: theme.spacing(1.5),
  cursor: "pointer";
`;

export default function WalletConnect() {
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const menu = (
    <Menu>
      {connected && <LinkAddress shorten={true} address={publicKey} />}
      <Menu.Item key="3" onClick={select}>
        Change Wallet
      </Menu.Item>
    </Menu>
  );

  return (
    // <Dropdown.Button onClick={connected ? disconnect : connect} overlay={menu}>
    //   {connected ? 'Disconnect' : 'Connect wallet'}
    // </Dropdown.Button>
    <Wallet
      onClick={connected ? disconnect : connect}>
      {connected ? 'Disconnect' : 'Connect wallet'}
    </Wallet>
  );
}
