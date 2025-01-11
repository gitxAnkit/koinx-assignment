import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Coin name is required."]
    },
    data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CoinData",
        required: true
    }]
});

const Coin = mongoose.model("Coin", coinSchema);
export default Coin;