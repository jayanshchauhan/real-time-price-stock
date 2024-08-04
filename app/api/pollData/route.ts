// app/api/pollData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('my-stock-crypto-db');
    const collection = db.collection('prices');

    // Fetch the latest prices
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,cardano,polkadot,solana',
        vs_currencies: 'usd',
      },
    });

    const data = response.data;
    const timestamp = new Date();

    // Store the response in MongoDB
    await collection.insertOne({ data, timestamp });

    // Transform data for the frontend
    const transformedData = Object.keys(data).map((key) => ({
      crypto: key,
      price: data[key].usd,
      timestamp,
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data', error });
  }
}
