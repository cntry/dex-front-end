import React, { useState, } from 'react';

import MarketSelectorSelectCSS from './MarketSelectorSelect.module.css';
import { nanoid } from 'nanoid';

interface Markets {
  address: any;
  name: string;
  deprecated: any;
}

export const MarketSelectorSelect = (props: {
  onSetMarketAddress: (event: any) => void,
  toggleDropdown: () => void,
  filteredMarkets: Markets[],
  filterMarkets: (filter: string) => void,
}) => {
  const {
    onSetMarketAddress,
    toggleDropdown,
    filterMarkets,
    filteredMarkets,
  } = props;
  const [ search, setSearch ] = useState(null);

  const handleSearch = (event) => {
    const {
      value,
    } = event.target;
    setSearch(value);
    filterMarkets(value);
  }

  return (
    <div
      className={MarketSelectorSelectCSS.marketSelectWrapper}
    >
      <div
        className={MarketSelectorSelectCSS.marketSelectLabel}
      >
        <input
          className={MarketSelectorSelectCSS.marketSelectInput}
          type='search'
          value={search || ''}
          onChange={handleSearch}
        />
        <img
          className={MarketSelectorSelectCSS.marketSelectImg}
          src="./search.svg"
          alt="search"
        />
      </div>
      <div
        className={MarketSelectorSelectCSS.marketSelect}
      >
        {filteredMarkets
        .map(({ address, name, deprecated }, i) => {
          return (
          <div
            className={MarketSelectorSelectCSS.marketSelectOption}
            onClick={() => {
              onSetMarketAddress(address.toBase58());
              toggleDropdown();
              setSearch(null);
            }}
            key={nanoid()}
          >
            <img 
              src='./Solana(SOL).png'
              alt='Solana'
              className={MarketSelectorSelectCSS.marketSelectBaseCoinImg}
            />
            <img
              className={MarketSelectorSelectCSS.marketSelectQuoteCoinImg}
              src='./USDCoin(USDC).png'
              alt='USDCoin'
            /> 
            {name} {deprecated ? ' (Deprecated)' : null}
          </div>
        )
        })}
      </div>
    </div>
  )
}
