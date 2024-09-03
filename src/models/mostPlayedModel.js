import mongoose from 'mongoose';

const mostPlayedSchema = new mongoose.Schema({
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    },
    playCount: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const mostPlayedModel = mongoose.model('MostPlayed', mostPlayedSchema);

export default mostPlayedModel;
