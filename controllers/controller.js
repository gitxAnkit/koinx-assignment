import axios from "axios";
import catchAsync from "../utils/catchAsync.js";
import Coin from "../models/coinModel.js";

export const handleSaveCoinData = async () => {
    try {
        // Fetch API URL and key from environment variables
        const apiUrl = process.env.COIN_GECKO_BASE_URL;
        const apiKey = process.env.COIN_GECKO_API_KEY;

        // List of coin IDs to process
        const coinIds = ["bitcoin", "ethereum", "matic-network"];
        // Process each coin sequentially
        for (const coinId of coinIds) {
            await func(coinId, apiUrl, apiKey);
        }

        console.log("All coin data saved successfully.");
    } catch (error) {
        // Log and re-throw the error
        console.error("Error in handleSaveCoinData:", error.message);
        throw error; // Re-throw for further handling
    }
};

const func = async (coinId, apiUrl, apiKey) => {
    try {
        // Fetch data from CoinGecko API
        const response = await axios.get(`${apiUrl}/coins/${coinId}`, {
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
            },
        });

        // Extract relevant data
        const data = response.data.market_data;
        const dataObj = {
            price: data.current_price.usd,
            marketCap: data.market_cap.usd,
            price_change_24h: data.price_change_percentage_24h,
        };


        // Find the coin document in the database
        const coin = await Coin.findOne({ name: coinId });

        if (!coin) {
            throw new Error(`Coin with name ${coinId} not found in the database.`);
        }

        // Push new data into the coin's data array
        coin.data.push(dataObj);

        // Save the updated coin document
        await coin.save();

    } catch (error) {
        console.error(`Error processing coin ID ${coinId}:`, error.message);
        throw error; // Re-throw to stop further processing
    }
};
export const getStats = catchAsync(async (req, res, next) => {

})
export const getDeviation = catchAsync(async (req, res, next) => {

})