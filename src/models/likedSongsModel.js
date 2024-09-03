import mongoose from 'mongoose';

const likedSongsSchema = new mongoose.Schema({
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const likedSongsModel = mongoose.model('LikedSongs', likedSongsSchema);

export default likedSongsModel;
