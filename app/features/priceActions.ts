// app/features/priceActions.ts
import axios from 'axios';
import { setPrices } from './priceSlice';

export const fetchPrices = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/pollData');
    console.log('API Response:', response.data);

    // Transform the response data into an array, if needed
    const pricesArray = Object.keys(response.data).map((key) => {
      return {
        crypto: key,
        price: response.data[key].usd,
        timestamp: new Date(),
      };
    });

    dispatch(setPrices(pricesArray));
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};
