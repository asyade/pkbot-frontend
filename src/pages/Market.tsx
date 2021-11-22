import React, { Component, useState, useRef, useEffect, useContext } from 'react'
import {OHLC, MarketIdentifier} from '../Api'
import MarketChart from '../components/MarketChart'
import {MarketContext} from '../contexts/MarketContext'
import styles from './Market.module.css'
import ReactApexChart from 'react-apexcharts';
import * as R from 'ramda'
import { ApexOptions } from 'apexcharts';

function Market() {
    const { focusedMarket } = useContext(MarketContext);
    if (focusedMarket === null) {
        return <div>No market selected</div>
    }
    return (
        <div>
        {focusedMarket.candles && <MarketChart candles={focusedMarket.candles}/>}
        </div>
    )
}

export default Market
