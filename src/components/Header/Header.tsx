import './Header.css';

import {
  makeStyles,
  Button,
  // Switch,
} from "@material-ui/core";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  header__wallet_icon: {
    marginRight: "4px",
    marginBottom: "2px",
  },
  header__swap_button: {
    width: "100%",
    borderRadius: theme.spacing(2),
    // backgroundColor: theme.palette.primary.main,
    // backgroundColor: "#2196F3",
    // color: theme.palette.primary.contrastText,
    fontSize: 14,
    lineHeight: "22px",
    // padding: theme.spacing(1.5),
    cursor: "pointer",
  },
  // switchTheme: {
  //   backgroundColor: "#2196F3",
  // }
}));

export const Header = (props: {
  isConnected: boolean;
  wallet: any;
}) => {
  const {
    isConnected,
    wallet,
  } = props;

  const styles = useStyles();

  return (
    <section
      className="header"
    >
      <img src="logo.svg" alt="logo" />
      <div className="header__menu wrapper">
        <a
          href="https://cntry.io/"
          className="header__menu_punct link"
          target="_blank"
          rel="noreferrer"
        >
          home
        </a>
        <a
          href="https://swap.cntry.io/"
          className="header__menu_punct link header__menu_punct-active"
        >
          swap
        </a>
        {/* <a
          href="#/"
          className="header__menu_punct link"
          target="_blank"
          rel="noreferrer"
        >
          trade
        </a>
        <a
          href="#/"
          className="header__menu_punct link header__menu_punct-active"
          target="_blank"
          rel="noreferrer"
        >
          ido
        </a>
        <a
          href="#/"
          className="header__menu_punct link"
          target="_blank"
          rel="noreferrer"
        >
          token
        </a> */}
      </div>
      {/* <div className="header__info">
        <div className="wrapper">
            <div className="header__circle header__circle_green"></div>
            <div className="header__info_text green">Trade Open</div>
        </div>
        <div className="header__info_date">Wednesday, 05 January 202 14:00 WIB</div>
      </div>
      <img className="header__loupe" src="loupe.svg" alt="loupe" /> */}
      {/* <div className="header__lang wrapper">
        <img className="header__lang_chosen" src="usaFlag.svg" alt="flag" />
        <img src="vector.svg" alt="vector" />
      </div> */}
      <div className="header__wallet wrapper">
        <img
          className={styles.header__wallet_icon}
          src="wallet.svg"
          alt="wallet"
        />
        {/* <div className="header__wallet_text">Connect Wallet</div> */}
        <div
          className={styles.header__swap_button}
          onClick={() => (!isConnected ? wallet.connect() : wallet.disconnect())}
        >
          Connect Wallet
        </div>
      </div>
      {/* <div className="header__switcher wrapper">
        <img src="light.svg" alt="lightTheme" />
        <Switch 
          color="primary"
        />
        <div className="header__switcher_btn">
            <div className="header__switcher_btn-toggler"></div>
        </div>
        <img src="dark.svg" alt="darkTheme" />
      </div> */}
    </section>
  )
};
 