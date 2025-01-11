import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Coin name is required."]
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    price_change_24h: {
        type: Number,
        required: true,
    }
},
    { timestamps: true }
);
const CoinData = mongoose.model("CoinData", schema);
export default CoinData;
