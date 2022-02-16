import React from 'react';
import { useState } from "react";
import {
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  Signer,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN, Provider } from "@project-serum/anchor";
import {
  makeStyles,
  Card,
  Button,
  Typography,
  TextField,
  useTheme,
} from "@material-ui/core";
// import { ExpandMore, ImportExportRounded } from "@material-ui/icons";
import { useSwapContext, useSwapFair } from "../context/Swap";
import {
  useDexContext,
  useOpenOrders,
  useRouteVerbose,
  useMarket,
  FEE_MULTIPLIER,
} from "../context/Dex";
import { useTokenMap } from "../context/TokenList";
import { useMint, useOwnedTokenAccount } from "../context/Token";
import { useCanSwap, useReferral } from "../context/Swap";
import TokenDialog from "./TokenDialog";
import { SettingsButton } from "./Settings";
// import { InfoLabel } from "./Info";
import { SOL_MINT, WRAPPED_SOL_MINT } from "../utils/pubkeys";

import {WrapperSpace} from '../../src/components/WrapperSpace/WrapperSpace';
import {SwapSubtitle} from '../../src/components/SwapSubtitle/SwapSubtitle';
import {SwapApproximately} from '../../src/components/SwapApproximately/SwapApproximately';
// import { SwapInfoLeft } from './SwapInfoLeft/SwapInfoLeft';
// import { SwapInfoRight } from './SwapInfoRight/SwapInfoRight';

const useStyles = makeStyles((theme) => ({
  card: {
    width: theme.spacing(50),
    borderRadius: "4px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
    padding: "13px 17px 18px 15px",
    background: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.05)",
  },
  tab: {
    width: "50%",
  },
  settingsButton: {
    padding: 0,
  },
  // swapButton: {
  //   width: "100%",
  //   borderRadius: theme.spacing(2),
  //   backgroundColor: theme.palette.primary.main,
  //   // backgroundColor: "blue",
  //   color: theme.palette.primary.contrastText,
  //   fontSize: 16,
  //   fontWeight: 700,
  //   padding: theme.spacing(1.5),
  //   cursor: "pointer",
  // },
  swapButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "38px",
    background: "#fff",
    textTransform: "capitalize",
    border: "2px solid #2F80ED",
    color: "#2F80ED",
    fontWeight: 500,
    fontSize: 16,    
    lineHeight: "22px",
    //Temporarily margin-top
    marginTop: "21px",
  },
  swapButton__img: {
    marginRight: "13px",
  },
  swapToFromButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    outlineColor: "transparent",
    outlineWidth: "0px",
    // margin: "10px auto 10px auto",
    cursor: "pointer",
    width: "32px",
    height: "32px",
    backgroundColor: "#2F80ED",
    borderRadius: "4px",
    margin: "16px auto 0 auto",
    transition: ".2s ease-in-out",
    "&:active, &:focus": {
      outlineColor: "transparent",
      outlineWidth: "0px",
    },
    "&:hover": {
      backgroundColor: "#226ac9",
      transition: ".2s ease-in-out",
    }
  },
  amountInput: {
    fontSize: 14,
    fontWeight: 400,
  },
  input: {
    textAlign: "right",
    paddingBottom: "0px",
    paddingTop: "3px",
  },
  swapTokenFormContainer: {
    // borderRadius: theme.spacing(2),
    // boxShadow: "0px 0px 15px 2px rgba(33,150,243,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: theme.spacing(1),
    marginTop: "4px",
    padding: "8px 16px",
    background: "rgba(47, 128, 237, 0.1)",
    borderRadius: "4px",

  },
  swapTokenSelectorContainer: {
    marginLeft: 0,
    display: "flex",
    flexDirection: "column",
    width: "50%",
    '& > div':{
      fontWeight: 400,
    }
  },
  balanceContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
  swapTextField: {
    // fontWeight: 400,
    // fontSize: "14px",
    border: "1px solid blue",
    "div": {
      fontWeight: 400,
      fontSize: "14px",
    }

  },
  maxButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: "12px",
    cursor: "pointer",
  },
  tokenButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    // marginBottom: theme.spacing(1),
  },
  tokenSymbol: {
    display: "block",
    textAlign: "left",
    minWidth: "38px",
    fontSize: "14px",
    lineHeight: "22px",
    // height: "22px",
    // margin: "9px 16px 9px 0",
    marginTop: "3px",
  }
}));

export default function SwapCard({
  containerStyle,
  contentStyle,
  swapTokenContainerStyle,
  isConnected,
  wallet,
}: {
  containerStyle?: any;
  contentStyle?: any;
  swapTokenContainerStyle?: any;
  isConnected: boolean;
  wallet: any;
}) {
  const styles = useStyles();
  return (
    <Card className={styles.card} style={containerStyle}>
      <SwapHeader />
      <div style={contentStyle}>
        <WrapperSpace>
          <SwapSubtitle text="You pay" />
          <SwapApproximately digits="≈ $123.33" />
        </WrapperSpace>
        <SwapFromForm style={swapTokenContainerStyle} />
        <ArrowButton />
        <WrapperSpace>
          <SwapSubtitle text="You receive" />
          <SwapApproximately digits="≈ $123.33 (-0.22%)" />
        </WrapperSpace>
        <SwapToForm style={swapTokenContainerStyle} />
        {/* <InfoLabel /> */}
        {/* <div style={{ 
            marginBottom: "21px",
            paddingLeft: "15px",
          }}
        >
          <WrapperSpace>
            <SwapInfoLeft text="1*Solara cost" />
            <SwapInfoRight approximateValue="≈ $123.33" tokenValue="0.0002323223 VSYS" />
          </WrapperSpace>
          <WrapperSpace>
            <SwapInfoLeft text="1*V.system cost" />
            <SwapInfoRight approximateValue="≈ $9999.33" tokenValue="234,9984302001 SOL" />
          </WrapperSpace>
          <WrapperSpace>
            <SwapInfoLeft text="Transaction Fee" />
            <SwapInfoRight approximateValue="≈ $0.32" tokenValue="0.0032 SOL" />
          </WrapperSpace>
        </div> */}
        <SwapButton 
          isConnected={isConnected}
          wallet={wallet}
        />
      </div>
    </Card>
  );
}

export function SwapHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <Typography
        style={{
          fontSize: 24,
          fontWeight: 700,
          lineHeight: '24px',
          color: '#2F80ED'
        }}
      >
        Swap
      </Typography>
      <SettingsButton />
    </div>
  );
}

export function ArrowButton() {
  const styles = useStyles();
  // const theme = useTheme();
  const { swapToFromMints } = useSwapContext();
  return (
    // <ImportExportRounded
    //   className={styles.swapToFromButton}
    //   fontSize="large"
    //   htmlColor={theme.palette.primary.main}
    //   onClick={swapToFromMints}
    // />
    <button
      className={styles.swapToFromButton}
      onClick={swapToFromMints}
    >
      <img src="arrowSwap.svg" alt="arrowSwap" />
    </button>
  );
}

function SwapFromForm({ style }: { style?: any }) {
  const { fromMint, setFromMint, fromAmount, setFromAmount } = useSwapContext();
  // console.log(fromMint, 'fromMint');
  // console.log(fromAmount, 'fromAmount');
  return (
    <SwapTokenForm
      from
      style={style}
      mint={fromMint}
      setMint={setFromMint}
      amount={fromAmount}
      setAmount={setFromAmount}
    />
  );
}

function SwapToForm({ style }: { style?: any }) {
  const { toMint, setToMint, toAmount, setToAmount } = useSwapContext();
  // console.log(toMint, 'toMint');
  // console.log(toAmount, 'toAmount');
  return (
    <SwapTokenForm
      from={false}
      style={style}
      mint={toMint}
      setMint={setToMint}
      amount={toAmount}
      setAmount={setToAmount}
    />
  );
}

export function SwapTokenForm({
  from,
  style,
  mint,
  setMint,
  amount,
  setAmount,
}: {
  from: boolean;
  style?: any;
  mint: PublicKey;
  setMint: (m: PublicKey) => void;
  amount: number;
  setAmount: (a: number) => void;
}) {
  const styles = useStyles();

  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const tokenAccount = useOwnedTokenAccount(mint);
  const mintAccount = useMint(mint);

  const balance =
    tokenAccount &&
    mintAccount &&
    tokenAccount.account.amount.toNumber() / 10 ** mintAccount.decimals;

  const formattedAmount =
    mintAccount && amount
      ? amount.toLocaleString("fullwide", {
          maximumFractionDigits: mintAccount.decimals,
          useGrouping: false,
        })
      : amount;

  // console.log(formattedAmount);
  // console.log(amount);

  return (
    <div className={styles.swapTokenFormContainer} style={style}>
      <div className={styles.swapTokenSelectorContainer}>
        <TokenButton mint={mint} onClick={() => setShowTokenDialog(true)} />
        {/* <Typography color="textSecondary" className={styles.balanceContainer}>
          {tokenAccount && mintAccount
            ? `Balance: ${balance?.toFixed(mintAccount.decimals)}`
            : `-`}
          {from && !!balance ? (
            <p
              className={styles.maxButton}
              onClick={() => setAmount(balance)}
            >
              MAX
            </p>
          ) : null}
        </Typography> */}
      </div>
      <TextField
        type="number"
        value={formattedAmount}
        // className={styles.swapTextField}
        // InputProps={{
        //   className: styles.swapTextField,
        // }}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: styles.amountInput,
            input: styles.input,
          },
        }}
      />
      <TokenSymbol mint={mint} />
      <TokenDialog
        setMint={setMint}
        open={showTokenDialog}
        onClose={() => setShowTokenDialog(false)}
      />
    </div>
  );
}

function TokenButton({
  mint,
  onClick,
}: {
  mint: PublicKey;
  onClick: () => void;
}) {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <div onClick={onClick} className={styles.tokenButton}>
      <TokenIcon mint={mint} style={{ width: theme.spacing(3) }} />
      <TokenName mint={mint} style={{ fontSize: 14, fontWeight: 400, margin: "3px 8px 0 4px", color: "#000" }} />
      {/* <ExpandMore /> */}
      <img style={{ margin: "3px 0 0 0" }}  src="arrowDown.svg" alt="arrowDown" />
    </div>
  );
}

export function TokenIcon({ mint, style }: { mint: PublicKey; style: any }) {
  const tokenMap = useTokenMap();
  let tokenInfo = tokenMap.get(mint.toString());
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {tokenInfo?.logoURI ? (
        <img alt="Logo" style={style} src={tokenInfo?.logoURI} />
      ) : (
        <div style={style}></div>
      )}
    </div>
  );
}

function TokenName({ mint, style }: { mint: PublicKey; style: any }) {
  const tokenMap = useTokenMap();
  const theme = useTheme();
  let tokenInfo = tokenMap.get(mint.toString());

  return (
    <Typography
      style={{
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        ...style,
      }}
    >
      {/* {tokenInfo?.symbol} */}
      {tokenInfo?.name}
    </Typography>
  );
}

function TokenSymbol({ mint }: { mint: PublicKey } ) {
  const styles = useStyles();
  const tokenMap = useTokenMap();
  let tokenInfo = tokenMap.get(mint.toString());

  return (
    <span
      className={styles.tokenSymbol}
    >
      {tokenInfo?.symbol}
    </span>
  )
}

export function SwapButton(props: {
  isConnected: boolean;
  wallet: any;
}) {
  const {
    isConnected,
    wallet,
  } = props;
  
  const styles = useStyles();
  const {
    fromMint,
    toMint,
    fromAmount,
    slippage,
    isClosingNewAccounts,
    isStrict,
  } = useSwapContext();
  const { swapClient } = useDexContext();
  const fromMintInfo = useMint(fromMint);
  const toMintInfo = useMint(toMint);
  const openOrders = useOpenOrders();
  const route = useRouteVerbose(fromMint, toMint);
  const fromMarket = useMarket(
    route && route.markets ? route.markets[0] : undefined
  );
  const toMarket = useMarket(
    route && route.markets ? route.markets[1] : undefined
  );
  const canSwap = useCanSwap();
  const referral = useReferral(fromMarket);
  const fair = useSwapFair();
  let fromWallet = useOwnedTokenAccount(fromMint);
  let toWallet = useOwnedTokenAccount(toMint);
  const quoteMint = fromMarket && fromMarket.quoteMintAddress;
  const quoteMintInfo = useMint(quoteMint);
  const quoteWallet = useOwnedTokenAccount(quoteMint);

  // Click handler.
  const sendSwapTransaction = async () => {
    if (!fromMintInfo || !toMintInfo) {
      throw new Error("Unable to calculate mint decimals");
    }
    if (!fair) {
      throw new Error("Invalid fair");
    }
    if (!quoteMint || !quoteMintInfo) {
      throw new Error("Quote mint not found");
    }

    const amount = new BN(fromAmount * 10 ** fromMintInfo.decimals);
    const isSol = fromMint.equals(SOL_MINT) || toMint.equals(SOL_MINT);
    const wrappedSolAccount = isSol ? Keypair.generate() : undefined;

    // Build the swap.
    let txs = await (async () => {
      if (!fromMarket) {
        throw new Error("Market undefined");
      }

      const minExchangeRate = {
        rate: new BN((10 ** toMintInfo.decimals * FEE_MULTIPLIER) / fair)
          .muln(100 - slippage)
          .divn(100),
        fromDecimals: fromMintInfo.decimals,
        quoteDecimals: quoteMintInfo.decimals,
        strict: isStrict,
      };
      const fromOpenOrders = fromMarket
        ? openOrders.get(fromMarket?.address.toString())
        : undefined;
      const toOpenOrders = toMarket
        ? openOrders.get(toMarket?.address.toString())
        : undefined;
      const fromWalletAddr = fromMint.equals(SOL_MINT)
        ? wrappedSolAccount!.publicKey
        : fromWallet
        ? fromWallet.publicKey
        : undefined;
      const toWalletAddr = toMint.equals(SOL_MINT)
        ? wrappedSolAccount!.publicKey
        : toWallet
        ? toWallet.publicKey
        : undefined;

      return await swapClient.swapTxs({
        fromMint,
        toMint,
        quoteMint,
        amount,
        minExchangeRate,
        referral,
        fromMarket,
        toMarket,
        // Automatically created if undefined.
        fromOpenOrders: fromOpenOrders ? fromOpenOrders[0].address : undefined,
        toOpenOrders: toOpenOrders ? toOpenOrders[0].address : undefined,
        fromWallet: fromWalletAddr,
        toWallet: toWalletAddr,
        quoteWallet: quoteWallet ? quoteWallet.publicKey : undefined,
        // Auto close newly created open orders accounts.
        close: isClosingNewAccounts,
      });
    })();

    // If swapping SOL, then insert a wrap/unwrap instruction.
    if (isSol) {
      if (txs.length > 1) {
        throw new Error("SOL must be swapped in a single transaction");
      }
      const { tx: wrapTx, signers: wrapSigners } = await wrapSol(
        swapClient.program.provider,
        wrappedSolAccount as Keypair,
        fromMint,
        amount
      );
      const { tx: unwrapTx, signers: unwrapSigners } = unwrapSol(
        swapClient.program.provider,
        wrappedSolAccount as Keypair
      );
      const tx = new Transaction();
      tx.add(wrapTx);
      tx.add(txs[0].tx);
      tx.add(unwrapTx);
      txs[0].tx = tx;
      txs[0].signers.push(...wrapSigners);
      txs[0].signers.push(...unwrapSigners);
    }

    await swapClient.program.provider.sendAll(txs);
  };
  return (
    <>
      {canSwap 
      ? (
        <Button
          variant="contained"
          className={styles.swapButton}
          onClick={sendSwapTransaction}
          // disabled={!canSwap}
        >
          Swap
        </Button>
      ) 
      : (
        <Button
          // variant="contained"
          variant="outlined"
          className={styles.swapButton}
          onClick={() => (!isConnected ? wallet.connect() : wallet.disconnect())}
        >
          <img
            className={styles.swapButton__img}
            src="wallet.svg"
            alt="wallet"
          />
          Connect Wallet
        </Button>
      )}
    </>
    
  );
}

async function wrapSol(
  provider: Provider,
  wrappedSolAccount: Keypair,
  fromMint: PublicKey,
  amount: BN
): Promise<{ tx: Transaction; signers: Array<Signer | undefined> }> {
  const tx = new Transaction();
  const signers = [wrappedSolAccount];
  // Create new, rent exempt account.
  tx.add(
    SystemProgram.createAccount({
      fromPubkey: provider.wallet.publicKey,
      newAccountPubkey: wrappedSolAccount.publicKey,
      lamports: await Token.getMinBalanceRentForExemptAccount(
        provider.connection
      ),
      space: 165,
      programId: TOKEN_PROGRAM_ID,
    })
  );
  // Transfer lamports. These will be converted to an SPL balance by the
  // token program.
  if (fromMint.equals(SOL_MINT)) {
    tx.add(
      SystemProgram.transfer({
        fromPubkey: provider.wallet.publicKey,
        toPubkey: wrappedSolAccount.publicKey,
        lamports: amount.toNumber(),
      })
    );
  }
  // Initialize the account.
  tx.add(
    Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      WRAPPED_SOL_MINT,
      wrappedSolAccount.publicKey,
      provider.wallet.publicKey
    )
  );
  return { tx, signers };
}

function unwrapSol(
  provider: Provider,
  wrappedSolAccount: Keypair
): { tx: Transaction; signers: Array<Signer | undefined> } {
  const tx = new Transaction();
  tx.add(
    Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID,
      wrappedSolAccount.publicKey,
      provider.wallet.publicKey,
      provider.wallet.publicKey,
      []
    )
  );
  return { tx, signers: [] };
}
