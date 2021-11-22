import React, { createContext, useState, FC } from "react";
import { MarketIdentifier, getMarkets, getMarket, getOhlc, GetMarketResult, OHLC } from "../Api";

export type MarketContextState = {
    marketLoaded: MarketIdentifier[],
    marketAvailable: MarketIdentifier[],
    focusedMarket: MarketFocus | null,
    loadMarkets: Function,
    loadMarket: Function,
    focusMarket: Function,
}

const contextDefaultValues: MarketContextState = {
    marketAvailable: [],
    marketLoaded: [],
    focusedMarket: null,
    loadMarkets: () => {},
    loadMarket: () => {},
    focusMarket: () => {},
};

export const MarketContext = createContext<MarketContextState>(undefined as any)

export type MarketFocus = {
  id: MarketIdentifier,
  state: GetMarketResult,
  candles?: OHLC[],
};

const MarketProvider: FC = ({ children }) => {
  const [focusedMarket, setFocusedMarket] = useState<MarketFocus | null>(null);
  const [marketAvailable, setMarketAvailable] = useState<MarketIdentifier[]>(contextDefaultValues.marketAvailable);
  const [marketLoaded, setMarketLoaded] = useState<MarketIdentifier[]>(contextDefaultValues.marketLoaded);
  const loadMarkets = () => {
    getMarkets(true, true)
        .then(res => {
            if (res?.available) {
                res.available.sort(function(a, b){
                    if(a.base < b.base) { return -1; }
                    if(a.base > b.base) { return 1; }
                    return 0;
                })
                let can_be_load = res.available.filter((a: MarketIdentifier) => !res.loaded?.find(b => a.exchange_name === b.exchange_name && a.quote === b.quote && a.base === b.base))
                setMarketAvailable(can_be_load)
                setMarketLoaded(res.loaded || [])
            }
        })  
        .catch(e => console.log(`Failed to fetch markets ${e}`))
  }
  const loadMarket = (id: MarketIdentifier) => {
    getMarket(id).then(() => loadMarkets())
      .catch(e => console.error(e))
  }

  const focusMarket = (id: MarketIdentifier | null) => {
    if (id) {
      getMarket(id).then((state) => {
        if (!state) {
          console.error(`Failed to load ${id}`)
          return
        }
        
        setFocusedMarket({
          id,
          state,
        })
        if (state.first_ohlc && state.first_ohlc) {
          getOhlc(id, state.first_ohlc, state.last_ohlc || null).then(e => {
            setFocusedMarket({
              id,
              state,
              candles: e || []
            })
          })
        }
      })
    } else {
      setFocusedMarket(null)
    }
  }

  return (
    <MarketContext.Provider
      value={{
        marketAvailable,
        focusedMarket,
        marketLoaded,
        loadMarkets,
        loadMarket,
        focusMarket,
      } as MarketContextState}
    >
      {children}
    </MarketContext.Provider>
  );
};

export default MarketProvider;
