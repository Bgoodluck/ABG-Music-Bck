// import playlistModel from '../models/playlistModel.js';

// const addPlaylist = async (req, res) => {
//     try {
//         const { name, description, userId } = req.body;

//         if (!name || !userId) {
//             return res.status(400).json({ success: false, message: "Name and User ID are required." });
//         }

//         const newPlaylist = new playlistModel({
//             name,
//             description,
//             userId
//         });

//         await newPlaylist.save();

//         res.status(201).json({ success: true, message: "Playlist created successfully.", playlist: newPlaylist });
//     } catch (error) {
//         console.error("Error creating playlist:", error);
//         res.status(500).json({ success: false, message: "An error occurred while creating the playlist." });
//     }
// };

// export { addPlaylist };

import playlistModel from '../models/playlistModel.js';
import mostPlayedModel from '../models/mostPlayedModel.js';
import likedSongsModel from '../models/likedSongsModel.js';


const addPlaylist = async (req, res) => {
    try {
        const { name, description, userId } = req.body;

        if (!name || !userId) {
            return res.status(400).json({ success: false, message: "Name and User ID are required." });
        }

        const newPlaylist = new playlistModel({
            name,
            description,
            userId
        });

        await newPlaylist.save();

        res.status(201).json({ success: true, message: "Playlist created successfully.", playlist: newPlaylist });
    } catch (error) {
        console.error("Error creating playlist:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the playlist." });
    }
};


const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;

        if (!playlistId || !songId) {
            return res.status(400).json({ success: false, message: "Playlist ID and Song ID are required." });
        }

        const playlist = await playlistModel.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ success: false, message: "Playlist not found." });
        }

        // Check if the song is already in the playlist
        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ success: false, message: "Song is already in the playlist." });
        }

        // Add the song to the playlist
        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json({ success: true, message: "Song added to playlist successfully.", playlist });
    } catch (error) {
        console.error("Error adding song to playlist:", error);
        res.status(500).json({ success: false, message: "An error occurred while adding the song to the playlist." });
    }
};


const addMostPlayedSong = async (req, res) => {
    try {
        const { songId, userId } = req.body;

        if (!songId || !userId) {
            return res.status(400).json({ success: false, message: "Song ID and User ID are required." });
        }

        const mostPlayedSong = new mostPlayedModel({ songId, userId });
        await mostPlayedSong.save();

        res.status(201).json({ success: true, message: "Most played song added successfully.", mostPlayedSong });
    } catch (error) {
        console.error("Error adding most played song:", error);
        res.status(500).json({ success: false, message: "An error occurred while adding the most played song." });
    }
};

const addLikedSong = async (req, res) => {
    try {
        const { songId, userId } = req.body;

        if (!songId || !userId) {
            return res.status(400).json({ success: false, message: "Song ID and User ID are required." });
        }

        const likedSong = new likedSongsModel({ songId, userId });
        await likedSong.save();

        res.status(201).json({ success: true, message: "Liked song added successfully.", likedSong });
    } catch (error) {
        console.error("Error adding liked song:", error);
        res.status(500).json({ success: false, message: "An error occurred while adding the liked song." });
    }
};

// Fetch all playlists
// const getPlaylists = async (req, res) => {
//     try {
//         const playlists = await playlistModel.find({ userId: req.userId }); // Adjust as needed
//         res.json(playlists);
//     } catch (error) {
//         console.error("Error fetching playlists:", error);
//         res.status(500).json({ success: false, message: "An error occurred while fetching playlists." });
//     }
// };
const getPlaylists = async (req, res) => {
    try {
        const playlists = await playlistModel.find();
        res.json(playlists);
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching playlists." });
    }
};

// Fetch all liked songs
const getLikedSongs = async (req, res) => {
    try {
        const likedSongs = await likedSongsModel.find({ userId: req.userId }); // Adjust as needed
        res.json(likedSongs);
    } catch (error) {
        console.error("Error fetching liked songs:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching liked songs." });
    }
};

// Fetch all most played songs
const getMostPlayedSongs = async (req, res) => {
    try {
        const mostPlayedSongs = await mostPlayedModel.find({ userId: req.userId }); // Adjust as needed
        res.json(mostPlayedSongs);
    } catch (error) {
        console.error("Error fetching most played songs:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching most played songs." });
    }
};

const getSongById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching song with ID:", id);
        const song = await songModel.findById(id);
        
        if (!song) {
            console.log("Song not found for ID:", id);
            return res.status(404).json({ success: false, message: "Song not found." });
        }

        console.log("Song found:", song);
        res.status(200).json({ success: true, song });
    } catch (error) {
        console.error("Error fetching song by ID:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching the song." });
    }
};


export { addPlaylist,
         addLikedSong,
         addMostPlayedSong,
         getPlaylists,
         getLikedSongs,
         getMostPlayedSongs,
         addSongToPlaylist,
         getSongById
        };