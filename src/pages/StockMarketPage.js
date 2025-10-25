import React, { useState, useEffect } from 'react';
import './StockMarketPage.css';

const StockMarketPage = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState('SPX');

    useEffect(() => {
        fetchStockData();
    }, [selectedIndex]);

    const fetchStockData = async () => {
        // Simulate stock data
        const mockStocks = [
            { symbol: 'SPX', name: 'S&P 500', price: 4520.75, change: 15.25, changePercent: 0.34 },
            { symbol: 'DJI', name: 'Dow Jones', price: 35120.50, change: 85.75, changePercent: 0.24 },
            { symbol: 'NASDAQ', name: 'NASDAQ', price: 14150.25, change: -25.50, changePercent: -0.18 }
        ];
        setStocks(mockStocks);
    };

    return (
        <div className="stock-market-page">
            <div className="page-header">
                <h1>Stock Markets</h1>
                <p>Live market data and financial indices</p>
            </div>

            <div className="market-indices">
                {stocks.map(stock => (
                    <div key={stock.symbol} className={`index-card ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                        <div className="index-header">
                            <h3>{stock.symbol}</h3>
                            <span className="index-name">{stock.name}</span>
                        </div>
                        <div className="index-price">${stock.price.toLocaleString()}</div>
                        <div className="index-change">
                            {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockMarketPage;