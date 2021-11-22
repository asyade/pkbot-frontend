import axios from 'axios'

const API_BASEURL: string = "http://localhost:8000";

axios.defaults.baseURL = API_BASEURL;

export type MarketIdentifier = {
    base: string,
    quote: string,
    exchange_name: string,
}

export type GetMarketsResult = {
    available?: MarketIdentifier[],
    loaded?: MarketIdentifier[],
}

export async function getMarkets(loaded: boolean, available: boolean): Promise<GetMarketsResult | null> {
    let resp = await axios.get(`market?loaded=${loaded}&available=${available}`);
    if (resp.status === 200) {
        return resp.data as GetMarketsResult
    } else {
        return null
    }
}

export type MarketSettings = {
    ohlc_refresh_rate?: any,
};

export type GetMarketResult = {
    settings: MarketSettings,
    first_ohlc?: number,
    last_ohlc?: number,
}

export async function getMarket(id: MarketIdentifier): Promise<GetMarketResult | null> {
    let resp = await axios.get(`market/${id.exchange_name}/${id.base}/${id.quote}`);
    if (resp.status === 200) {
        return resp.data as GetMarketResult
    } else {
        return null
    }
}

export type OHLC = {
    time: number,
    open: string,
    high: string,
    low: string,
    close: string,
    open_normalized: number,
    high_normalized: number,
    low_normalized: number,
    close_normalized: number,
    vwap: string,
    volume: string,
    count: number,
}

export type GetOhlcResult = {
    data: OHLC[],
}

export async function getOhlc(id: MarketIdentifier, from: number, to: number | null): Promise<OHLC[] | null> {
    let query = `market/${id.exchange_name}/${id.base}/${id.quote}/ohlc?from=${from}`;
    if (to !== null) {
        query += `&to=${to}`
    }
    let resp = await axios.get(query);
    if (resp.status === 200) {
        return resp.data.data
    } else {
        return null
    }
}