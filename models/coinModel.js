import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Coin name is required."]
    },
    data: [{
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
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Coin = mongoose.model("Coin", coinSchema);
export default Coin;