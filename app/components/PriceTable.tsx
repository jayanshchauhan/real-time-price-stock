// app/components/PriceTable.tsx
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrices } from '../features/priceActions';

const PriceTable = () => {
  const dispatch = useDispatch();
  const prices = useSelector((state) => state.price.prices);

  useEffect(() => {
    dispatch(fetchPrices());

    const interval = setInterval(() => {
      dispatch(fetchPrices());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (!Array.isArray(prices) || prices.length === 0) {
    return <div>No price data available.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Crypto</th>
          <th>Price (USD)</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price, index) => (
          <tr key={index}>
            <td>{price.crypto}</td>
            <td>{price.price}</td>
            <td>{new Date(price.timestamp).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
