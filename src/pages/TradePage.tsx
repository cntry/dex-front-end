import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  Button,
  Col,
  Popover,
  Row,
  Select,
  Typography
} from 'antd';
import styled from 'styled-components';
import Orderbook from '../components/Orderbook';
import UserInfoTable from '../components/UserInfoTable';
import StandaloneBalancesDisplay from '../components/StandaloneBalancesDisplay';
import {
  getMarketInfos,
  getTradePageUrl,
  MarketProvider,
  useMarket,
  useMarketsList,
  useUnmigratedDeprecatedMarkets,
} from '../utils/markets';
import TradeForm from '../components/TradeForm';
import TradesTable from '../components/TradesTable';
import LinkAddress from '../components/LinkAddress';
import DeprecatedMarketsInstructions from '../components/DeprecatedMarketsInstructions';
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import CustomMarketDialog from '../components/CustomMarketDialog';
import { notify } from '../utils/notifications';
import { useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { TVChartContainer } from '../components/TradingView';

import { TopSixCoins } from '../components/TopSixCoins/TopSixCoins';
import { MarketSelectorSelect } from '../components/MarketSelectorSelect/MarketSelectorSelect';
// import { red } from 'bn.js';
// Use following stub for quick setup without the TradingView private dependency
// function TVChartContainer() {
//   return <></>
// }

const { Option, OptGroup } = Select;

const Wrapper = styled.div`
  background-color: #fff;
  /* background-color: #58bafc; */
  color: #2f80ed;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

const MarketSelectorWrapper = styled.div `
  display: flex;
  flex-direction: column;
`;

const MarketSelectorLastPrice = styled.div`
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  color: #828282;
`;

const MarketSelectorSelectBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColForMarketSelector = styled(Col)`
  width: 50%;
`;

const MarketSelectorChangeValues = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;

const MarketSelectorSelectWrapper = styled.div`
  position: relative;
`;

const MarketSelectorSelectTitle = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #000;
`;

export default function TradePage() {
  const { marketAddress } = useParams();
  useEffect(() => {
    if (marketAddress) {
      localStorage.setItem('marketAddress', JSON.stringify(marketAddress));
    }
  }, [marketAddress]);
  const history = useHistory();
  function setMarketAddress(address) {
    history.push(getTradePageUrl(address));
  }

  return (
    <MarketProvider
      marketAddress={marketAddress}
      setMarketAddress={setMarketAddress}
    >
      <TradePageInner />
    </MarketProvider>
  );
}

function TradePageInner() {
  const {
    market,
    marketName,
    customMarkets,
    setCustomMarkets,
    setMarketAddress,
  } = useMarket();
  const markets = useMarketsList();
  const [
    handleDeprecated,
    setHandleDeprecated
  ] = useState(false);
  const [addMarketVisible, setAddMarketVisible] = useState(false);
  const deprecatedMarkets = useUnmigratedDeprecatedMarkets();
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dimensions,
    setDimensions
  ] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    document.title = marketName ? `${marketName} — CNTRY.io DEX` : 'CNTRY.io DEX';
  }, [marketName]);

  const changeOrderRef = useRef<
    ({ size, price }: { size?: number; price?: number }) => void
  >();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onAddCustomMarket = (customMarket) => {
    const marketInfo = getMarketInfos(customMarkets).some(
      (m) => m.address.toBase58() === customMarket.address,
    );
    if (marketInfo) {
      notify({
        message: `A market with the given ID already exists`,
        type: 'error',
      });
      return;
    }
    const newCustomMarkets = [...customMarkets, customMarket];
    setCustomMarkets(newCustomMarkets);
    setMarketAddress(customMarket.address);
  };

  const onDeleteCustomMarket = (address) => {
    const newCustomMarkets = customMarkets.filter((m) => m.address !== address);
    setCustomMarkets(newCustomMarkets);
  };

  const width = dimensions?.width;
  const componentProps = {
    onChangeOrderRef: (ref) => (changeOrderRef.current = ref),
    onPrice: useCallback(
      (price) => changeOrderRef.current && changeOrderRef.current({ price }),
      [],
    ),
    onSize: useCallback(
      (size) => changeOrderRef.current && changeOrderRef.current({ size }),
      [],
    ),
    markets,
    setHandleDeprecated,
    customMarkets,
    onDeleteCustomMarket,
  };
  const component = (() => {
    // if (handleDeprecated) {
    //   return (
    //     <DeprecatedMarketsPage
    //       switchToLiveMarkets={() => setHandleDeprecated(false)}
    //     />
    //   );
    // } else if (width < 1000) {
    //   return <RenderSmaller {...componentProps} />;
    // } else if (width < 1450) {
    //   return <RenderSmall {...componentProps} />;
    // } else {
    //   return <RenderNormal {...componentProps} />;
    // }
    return (
      <RenderNormal {...componentProps} />
    )
  })();

  // const onAddCustomMarket = (customMarket) => {
  //   const marketInfo = getMarketInfos(customMarkets).some(
  //     (m) => m.address.toBase58() === customMarket.address,
  //   );
  //   if (marketInfo) {
  //     notify({
  //       message: `A market with the given ID already exists`,
  //       type: 'error',
  //     });
  //     return;
  //   }
  //   const newCustomMarkets = [...customMarkets, customMarket];
  //   setCustomMarkets(newCustomMarkets);
  //   setMarketAddress(customMarket.address);
  // };

  // const onDeleteCustomMarket = (address) => {
  //   const newCustomMarkets = customMarkets.filter((m) => m.address !== address);
  //   setCustomMarkets(newCustomMarkets);
  // };

  return (
    <>
      <CustomMarketDialog
        visible={addMarketVisible}
        onClose={() => setAddMarketVisible(false)}
        onAddCustomMarket={onAddCustomMarket}
      />
      <Wrapper>
        {/* <Row
          align="middle"
          style={{ paddingLeft: 5, paddingRight: 5 }}
          gutter={16}
        >
          <Col>
            <MarketSelector
              markets={markets}
              setHandleDeprecated={setHandleDeprecated}
              placeholder={'Select market'}
              customMarkets={customMarkets}
              onDeleteCustomMarket={onDeleteCustomMarket}
            />
          </Col>
          {market ? (
            <Col>
              <Popover
                content={<LinkAddress address={market.publicKey.toBase58()} />}
                placement="bottomRight"
                title="Market address"
                trigger="click"
              >
                <InfoCircleOutlined style={{ color: '#2f80ed' }} />
              </Popover>
            </Col>
          ) : null}
          <Col>
            <PlusCircleOutlined
              style={{ color: '#2f80ed' }}
              onClick={() => setAddMarketVisible(true)}
            />
          </Col>
          {deprecatedMarkets && deprecatedMarkets.length > 0 && (
            <React.Fragment>
              <Col>
                <Typography>
                  You have unsettled funds on old markets! Please go through
                  them to claim your funds.
                </Typography>
              </Col>
              <Col>
                <Button onClick={() => setHandleDeprecated(!handleDeprecated)}>
                  {handleDeprecated ? 'View new markets' : 'Handle old markets'}
                </Button>
              </Col>
            </React.Fragment>
          )}
        </Row> */}
        {component}
      </Wrapper>
    </>
  );
}

interface Markets {
  address: any;
  name: string;
  deprecated: any;
}

function MarketSelector({
  markets,
  placeholder,
  setHandleDeprecated,
  customMarkets,
  onDeleteCustomMarket,
}) {
  const { market, setMarketAddress, marketName } = useMarket();

  const extractBase = (a) => a.split('/')[0];
  const extractQuote = (a) => a.split('/')[1];

  const onSetMarketAddress = (marketAddress) => {
    setHandleDeprecated(false);
    setMarketAddress(marketAddress);
  };

  // const selectedMarket = getMarketInfos(customMarkets)
  //   .find(
  //     (proposedMarket) => 
  //       market?.address && proposedMarket.address.equals(market.address),
  //   )
  //   ?.address?.toBase58();

  const [ openDropdown, setOpenDropdown ] = useState(false);

  const [ showMarkets, setShowMarkets ] = useState<Markets[]>([]);
  const [ filteredMarkets, setFilteredMarkets ] = useState<Markets[]>([]);

  const toggleDropdown = useCallback(() => {
    setOpenDropdown(current => !current);
    filterMarkets(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMarkets]);

  const sortedMarkets = () => {
    const copyMarkets = markets
    .sort((a, b) =>
          extractQuote(a.name) === 'USDT' && extractQuote(b.name) !== 'USDT'
            ? -1
            : extractQuote(a.name) !== 'USDT' &&
              extractQuote(b.name) === 'USDT'
            ? 1
            : 0,
        )
        .sort((a, b) =>
          extractBase(a.name) < extractBase(b.name)
            ? -1
            : extractBase(a.name) > extractBase(b.name)
            ? 1
            : 0,
        );
    setShowMarkets(copyMarkets);
  };

  const filterMarkets = useCallback((
    filter: string | null,
  ) => {
    if (filter === null) {
      setFilteredMarkets(showMarkets);
    } else {
      const lowerCaseFilter = filter !== null ? filter.toLowerCase() : '';

      const copyMarkets = showMarkets.filter(market => market.name.toLowerCase().includes(lowerCaseFilter));

      setFilteredMarkets(copyMarkets);
    }
  }, [showMarkets]);

  

  useEffect(() => {
    sortedMarkets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MarketSelectorWrapper>
      <MarketSelectorLastPrice>
        Last price
      </MarketSelectorLastPrice>
      <MarketSelectorSelectBlock>
        <MarketSelectorSelectWrapper>
          <div
            onClick={toggleDropdown}
            style={{
              display: 'flex',
              marginBottom: '5px',
              cursor: 'pointer'
            }}
          >
            <img 
              src='./Solana(SOL).png'
              alt='Solana'
              style={{ width: '24px', height: '24px' }}
            />
            <img 
              src='./USDCoin(USDC).png'
              alt='USDCoin'
              style={{ 
                width: '24px',
                height: '24px',
                position: 'relative',
                right: '7px',
              }}
            /> 
            <MarketSelectorSelectTitle>
              {marketName}
            </MarketSelectorSelectTitle>
          </div>
          {openDropdown && (
            <MarketSelectorSelect
              onSetMarketAddress={onSetMarketAddress}
              toggleDropdown={toggleDropdown}
              filteredMarkets={filteredMarkets}
              filterMarkets={filterMarkets}
            />
          )}
          {/* <Select
            showSearch
            autoClearSearchValue={false}
            size={'small'}
            style={{
              // width: 120,
              width: 240,
              height: 24,
              color: '#000',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: '14px',
              lineHeight: '22px',
              // borderColor: '#2f80ed',
              // backgroundColor: '#fff',
            }}
            dropdownStyle={{
              padding: '10px',
              backgroundColor: '#fff',
              // backgroundColor: '#2856ee',
              // color: '#2f80ed',
              border: '1px solid #2f80ed',
              boxSizing: 'border-box',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
            }}
            // bordered={false}
            placeholder={placeholder || 'Select a market'}
            optionFilterProp="name"
            onSelect={onSetMarketAddress}
            listHeight={400}
            value={selectedMarket}
            filterOption={(input, option) =>
              option?.name?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <SearchLabel>
            <img
                src="./search.svg"
                alt="search"
              />
              <input
                type='search'
              />
            </SearchLabel>
            <label
              style={{
                background: 'rgba(47, 128, 237, 0.05)',
                border: '1px solid #2f80ed',
                boxSizing: 'border-box',
                borderRadius: '4px',
              }}
            >
              <img
                src="./search.svg"
                alt="search"
              />
              <input
                type='search'
              />
            </label>
            
            {customMarkets && customMarkets.length > 0 && (
              <OptGroup
                label="Custom"
              >
                {customMarkets.map(({ address, name }, i) => (
                  <Option
                    value={address}
                    key={nanoid()}
                    name={name}
                    style={{
                      padding: '10px',
                      // @ts-ignore
                      // backgroundColor: i % 2 === 0 ? '#2f80ed' : '#87b5f1',
                      backgroundColor: '#fff',
                      color: '#4f4f4f',
                    }}
                  >
                    <Row>
                      <Col flex="auto">{name}</Col>
                      {selectedMarket !== address && (
                        <Col>
                          <DeleteOutlined
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              onDeleteCustomMarket && onDeleteCustomMarket(address);
                            }}
                          />
                        </Col>
                      )}
                    </Row>
                  </Option>
                ))}
              </OptGroup>
            )}
            <OptGroup
              label="Markets"
            >
              {markets
                .sort((a, b) =>
                  extractQuote(a.name) === 'USDT' && extractQuote(b.name) !== 'USDT'
                    ? -1
                    : extractQuote(a.name) !== 'USDT' &&
                      extractQuote(b.name) === 'USDT'
                    ? 1
                    : 0,
                )
                .sort((a, b) =>
                  extractBase(a.name) < extractBase(b.name)
                    ? -1
                    : extractBase(a.name) > extractBase(b.name)
                    ? 1
                    : 0,
                )
                .map(({ address, name, deprecated }, i) => (
                  <Option
                    value={address.toBase58()}
                    key={nanoid()}
                    name={name}
                    style={{
                      padding: '10px',
                      // @ts-ignore
                      // backgroundColor: i % 2 === 0 ? '#2f80ed' : '#87b5f1',
                      backgroundColor: '#fff',
                      color: '#4f4f4f',
                    }}
                  >
                    <img 
                      src='./Solana(SOL).png'
                      alt='Solana'
                      style={{ width: '24px', height: '24px' }}
                    />
                    <img 
                      src='./USDCoin(USDC).png'
                      alt='USDCoin'
                      style={{ 
                        width: '24px',
                        height: '24px',
                        position: 'relative',
                        right: '7px',
                      }}
                    /> 
                    {name} {deprecated ? ' (Deprecated)' : null}
                  </Option>
                ))}
            </OptGroup>
          </Select> */}
        </MarketSelectorSelectWrapper>
        <div
          style={{
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '22px',
            textAlign: 'right',
            color: '#000',
          }}
        >
          $46,799.02
        </div>
      </MarketSelectorSelectBlock>
      <Row
        style={{
          marginTop: '10px',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#828282',
          textAlign: 'right',
        }}
      >
          <ColForMarketSelector>
            24h Change
          </ColForMarketSelector>
          <ColForMarketSelector>
            24h High / Low
          </ColForMarketSelector>
      </Row>
      <Row>
        <ColForMarketSelector>
          <MarketSelectorChangeValues>
            <div
              style={{
                marginRight: '8px',
              }}
            >
              $411.44
            </div>
            <div
              style={{
                color: '#52c41a',
              }}
            >
              +0.89%
            </div>
          </MarketSelectorChangeValues>
        </ColForMarketSelector>
        <ColForMarketSelector>
          <MarketSelectorChangeValues>
            <div
              style={{
                marginRight: '8px',
                color: '#52c41a',
              }}
            >
              $47,406.55
            </div>
            <div
              style={{
                color: '#ff4d4f',
              }}
            >
              $45,752.46
            </div>
          </MarketSelectorChangeValues>
        </ColForMarketSelector>
      </Row>
    </MarketSelectorWrapper>
  );
}

// const DeprecatedMarketsPage = ({ switchToLiveMarkets }) => {
//   return (
//     <>
//       <Row>
//         <Col flex="auto">
//           <DeprecatedMarketsInstructions
//             switchToLiveMarkets={switchToLiveMarkets}
//           />
//         </Col>
//       </Row>
//     </>
//   );
// };

const RenderNormal = (props) => {
  const {
    onChangeOrderRef,
    onPrice,
    onSize,
    markets,
    setHandleDeprecated,
    customMarkets,
    onDeleteCustomMarket,
  } = props;
  return (
    <Row
      style={{
        minHeight: '900px',
        flexWrap: 'nowrap',
      }}
    >
      <Col flex="auto" style={{ height: '50vh' }}>
        <Row style={{ height: '100%' }}>
          <TVChartContainer />
        </Row>
        <Row style={{ height: '70%' }}>
          <UserInfoTable />
        </Row>
      </Col>
      <Col flex={'225px'} style={{ height: '100%' }}>
        <Orderbook
          smallScreen={false}
          onPrice={onPrice}
          onSize={onSize}
        />
        <TradesTable smallScreen={false} />
      </Col>
      <Col
        flex="352px"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Col
          style={{
            width: '100%',
            height: '104px',
            padding: '5px',
            border: '1px solid #f2f2f2',
          }}
        >
          <MarketSelector
            markets={markets}
            setHandleDeprecated={setHandleDeprecated}
            placeholder={'Select market'}
            customMarkets={customMarkets}
            onDeleteCustomMarket={onDeleteCustomMarket}
          />
        </Col>
        <TopSixCoins />
        <TradeForm setChangeOrderRef={onChangeOrderRef} />
        <StandaloneBalancesDisplay />
      </Col>
    </Row>
  );
};

// const RenderSmall = ({ onChangeOrderRef, onPrice, onSize }) => {
//   return (
//     <>
//       <Row style={{ height: '30vh' }}>
//         <TVChartContainer />
//       </Row>
//       <Row
//         style={{
//           height: '900px',
//         }}
//       >
//         <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
//           <Orderbook
//             smallScreen={true}
//             depth={13}
//             onPrice={onPrice}
//             onSize={onSize}
//           />
//         </Col>
//         <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
//           <TradesTable smallScreen={true} />
//         </Col>
//         <Col
//           flex="400px"
//           style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
//         >
//           <TradeForm setChangeOrderRef={onChangeOrderRef} />
//           <StandaloneBalancesDisplay />
//         </Col>
//       </Row>
//       <Row>
//         <Col flex="auto">
//           <UserInfoTable />
//         </Col>
//       </Row>
//     </>
//   );
// };

// const RenderSmaller = ({ onChangeOrderRef, onPrice, onSize }) => {
//   return (
//     <>
//       <Row style={{ height: '50vh' }}>
//         <TVChartContainer />
//       </Row>
//       <Row>
//         <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
//           <TradeForm style={{ flex: 1 }} setChangeOrderRef={onChangeOrderRef} />
//         </Col>
//         <Col xs={24} sm={12}>
//           <StandaloneBalancesDisplay />
//         </Col>
//       </Row>
//       <Row
//         style={{
//           height: '500px',
//         }}
//       >
//         <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
//           <Orderbook smallScreen={true} onPrice={onPrice} onSize={onSize} />
//         </Col>
//         <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
//           <TradesTable smallScreen={true} />
//         </Col>
//       </Row>
//       <Row>
//         <Col flex="auto">
//           <UserInfoTable />
//         </Col>
//       </Row>
//     </>
//   );
// };
