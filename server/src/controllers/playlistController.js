const asyncHandler = require("express-async-handler");
const Playlist = require("../models/playlistModel");

const createPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistName } = req.body;
    const playlist = new Playlist({
      userId: req.user.id,
      playlistName,
    });
    await playlist.save();
    res.status(201).json({ message: "Playlist created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const addToPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    playlist.songs.push({ songId });
    await playlist.save();
    res.json({ message: "Song added to playlist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const removeFromPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    playlist.songs = playlist.songs.filter(
      (song) => song.songId.toString() !== songId
    );
    await playlist.save();
    res.json({ message: "Song removed from playlist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

module.exports = {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
};
