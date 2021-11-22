import React, { useState, useRef, useEffect } from 'react'
import {getMarkets, MarketIdentifier} from '../Api'

function MarketSelector(props: { selectionCallback: Function }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [markets, setMarkets] = useState<MarketIdentifier[]>([])
    React.useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        getMarkets(false, true)
            .then(res => {
                if (res?.available) {
                    res.available.sort(function(a, b){
                        if(a.base < b.base) { return -1; }
                        if(a.base > b.base) { return 1; }
                        return 0;
                    })
                    setMarkets(res.available)
                }
            })
            .catch(e => console.log(`Failed to fetch markets ${e}`))
    })

    var availableExchange: string[] = [];
    for (var elem of markets) {
        if (!availableExchange.find(e => e === elem.exchange_name)) {
            availableExchange.push(elem.exchange_name);
        }
    }
    const elems = markets.map(e => <option key={`${e.exchange_name} ${e.base}/${e.quote}`}>{`${e.exchange_name} ${e.base}/${e.quote}`}</option>)
    
    function updateSelection(selection: string) {
        let exchange_name = selection.split(" ")[0];
        let market_name = selection.split(" ")[1];
        let base = market_name.split("/")[0];
        let quote = market_name.split("/")[1];
        props.selectionCallback({
            exchange_name: exchange_name,
            base: base,
            quote: quote,
        } as MarketIdentifier)
    }

    return (
        <div>
            <select onChange={(event) => updateSelection(event.target.value)} value={""}>{elems}</select>
        </div>
    )
}

export default MarketSelector
