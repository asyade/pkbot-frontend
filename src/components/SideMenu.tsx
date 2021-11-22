import React, { useState, useContext } from 'react'
import {getMarkets, MarketIdentifier} from '../Api'
import { MarketContext } from '../contexts/MarketContext'
import styles from './SideMenu.module.css'


function MarketSelector() {
    const {marketAvailable, marketLoaded, loadMarket, loadMarkets, focusMarket} = useContext(MarketContext)

    if (marketAvailable.length == 0) {
        loadMarkets();
    }

    const marketAvailableElems = marketAvailable.map(e => <li onClick={() => loadMarket(e)} className={styles.listItem} key={`${e.exchange_name} ${e.base}/${e.quote}`}>{`${e.exchange_name} ${e.base}/${e.quote}`}</li>)
    const marketLoadedElems = marketLoaded.map(e => <li onClick={() => focusMarket(e)} className={styles.listItem} key={`${e.exchange_name} ${e.base}/${e.quote}`}>{`${e.exchange_name} ${e.base}/${e.quote}`}</li>)

    return (
        <div className="SideMenu">
            <span className={styles.listLabel}>Loaded</span>
            <ul className={styles.list}>
                { marketLoadedElems }
            </ul>
            <span className={styles.listLabel}>Available</span>
            <ul className={styles.list}>
                { marketAvailableElems }
            </ul>
        </div>
    )
}

export default MarketSelector
