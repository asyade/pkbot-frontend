import React, { Component, useState, useRef, useEffect, useContext } from 'react'
import {OHLC, MarketIdentifier, getOhlc} from '../Api'
import {MarketContext} from '../contexts/MarketContext'
import styles from './Market.module.css'
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

function MarketChart(props: { candles: OHLC[] }) {
    const candlesOptions = {
        chart: {
          id: "candles",
          group: "ohlc",
          animations: {
            enabled: false,
          },
          type: 'candlestick',
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      } as ApexOptions;

    const volumesOptions = {
      chart: {
        id: "volumes",
        group: "ohlc",
        animations: {
          enabled: false,
        },
        type: 'bar',
      },
      title: {
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    } as ApexOptions;
    
    var mainSerie = []
    var volumeSerie = []
    for (var i = 0; i < props.candles.length; i++) {
      const candle = props.candles[i];
      mainSerie.push([candle.time, candle.open, candle.high, candle.low, candle.close])
      volumeSerie.push({x: candle.time, y: candle.volume })
    }
    const mainSeries = [
      {
        data: mainSerie,
      }
    ]


    const volumeSeries = [
      {
        data: volumeSerie,
      }
    ]
    return (
        <div>
            <ReactApexChart
              type="candlestick"
              options={candlesOptions}
              series={mainSeries}
              height={600}
            />
            <ReactApexChart
              type="line"
              options={volumesOptions}
              series={volumeSeries}
              height={300}
            />
        </div>
    )
}

export default MarketChart
