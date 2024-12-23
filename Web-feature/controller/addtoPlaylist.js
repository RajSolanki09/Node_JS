const Feature = require("../modele/feature.schema");

const addToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;

        // Find the playlist and update it by pushing the new song
        const updatedPlaylist = await Feature.findByIdAndUpdate(
            playlistId,
            { $push: { songs: songId } },
            { new: true }
        );

        if (!updatedPlaylist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({
            success: true,
            message: "Song added to playlist successfully",
            playlist: updatedPlaylist
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding song to playlist",
            error: error.message
        });
    }
}

module.exports = { addToPlaylist };
