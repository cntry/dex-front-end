import React, { useState, useEffect, useMemo } from 'react';

import TopSixCoinsCSS from './TopSixCoins.module.css';

import { TopSixCoinsTable } from '../TopSixCoinsTable/TopSixCoinsTable';

import { topSixMainCoins, tableMainValuesFromApi } from './data';

export const TopSixCoins = React.memo(() => {
  const [filters, setFilters] = useState({
    currency: 'USDT',
    favorites: false,
  });
  const { currency, favorites } = filters;

  const [tableRowData, setTableRowData] = useState([]);

  const handleChangeRowStars = (selectedPairId) => {
    const copyTableRowData = tableRowData.map((data) => {
      if (data.pairId === selectedPairId) {
        return {
          ...data,
          star: !data.star,
        };
      }

      return data;
    });

    setTableRowData(copyTableRowData);
  };

  const filteredTableData = useMemo(() => {
    if (favorites) {
      return tableRowData.filter(
        (value) => value.quoteCurrency === currency && value.star === favorites,
      );
    }

    return tableRowData.filter((value) => value.quoteCurrency === currency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, currency, handleChangeRowStars]);

  const handleClick = () => {
    const selectCoinPosition = topSixMainCoins.indexOf(currency);

    if (selectCoinPosition === 5) {
      setFilters((currentFilters) => {
        return {
          ...currentFilters,
          currency: topSixMainCoins[0],
        };
      });
    } else {
      setFilters((currentFilters) => {
        return {
          ...currentFilters,
          currency: topSixMainCoins[selectCoinPosition + 1],
        };
      });
    }
  };

  const handleChangeSelectStar = (event) => {
    const { checked } = event.target;

    setFilters((currentFilters) => {
      return {
        ...currentFilters,
        favorites: checked,
      };
    });
  };

  const handleChangeCurrency = (event) => {
    const { value } = event.target;

    setFilters((currentFilters) => {
      return {
        ...currentFilters,
        currency: value,
      };
    });
  };

  useEffect(() => {
    setTableRowData(tableMainValuesFromApi);
  }, []);

  return (
    <div className={TopSixCoinsCSS.wrapper}>
      <div className={TopSixCoinsCSS.headerWrapper}>
        <label
          className={
            favorites
              ? TopSixCoinsCSS.filterStarOn
              : TopSixCoinsCSS.filterStarOff
          }
          htmlFor="filterStarCheckbox"
        >
          <input
            type="checkbox"
            className={TopSixCoinsCSS.filterStarCheckbox}
            id="filterStarCheckbox"
            checked={favorites}
            onChange={handleChangeSelectStar}
          />
        </label>
        <div className={TopSixCoinsCSS.coinSelectBlock}>
          <div className={TopSixCoinsCSS.coinSelectWrapper}>
            {topSixMainCoins.map((coin, i) => {
              return (
                <label
                  htmlFor={coin}
                  className={
                    currency === coin
                      ? TopSixCoinsCSS.coinSelectLabelOff
                      : TopSixCoinsCSS.coinSelectLabelOn
                  }
                  key={i}
                >
                  <input
                    className={TopSixCoinsCSS.coinSelectInput}
                    type="radio"
                    name={coin}
                    id={coin}
                    value={coin}
                    checked={currency === coin}
                    onChange={handleChangeCurrency}
                  />
                  {coin}
                </label>
              );
            })}
          </div>
          <div className={TopSixCoinsCSS.coinSelectLine}></div>
        </div>
        <button className={TopSixCoinsCSS.headerButton} onClick={handleClick}>
          <img src="./arrowRight.svg" alt="arrowRight" />
        </button>
      </div>
      <div className={TopSixCoinsCSS.mainWrapper}>
        <TopSixCoinsTable
          tableRowData={filteredTableData}
          handleChangeRowStars={handleChangeRowStars}
        />
      </div>
    </div>
  );
});
