import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { addPlaylist, addMostPlayedSong, addLikedSong, getPlaylists, getLikedSongs, getMostPlayedSongs, addSongToPlaylist, getSongById } from '../controllers/playlistController.js';

const playlistRouter = express.Router();


playlistRouter.post('/create', addPlaylist);
playlistRouter.post('/add', addSongToPlaylist);
playlistRouter.post('/most', addMostPlayedSong);
playlistRouter.post('/liked', addLikedSong);
playlistRouter.get('/getplay', getPlaylists);
playlistRouter.get('/likedplay', getLikedSongs);
playlistRouter.get('/mostplay', getMostPlayedSongs);
playlistRouter.get('/song/:id', getSongById);



export default playlistRouter;
