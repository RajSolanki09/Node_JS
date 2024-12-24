const addToPlaylist = async (req, res) => {
    try {
        const { userId } = req.cookies;  // Assuming the user ID is stored in cookies
        const { title, artist, url } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new playlist entry
        const newSong = new playl({
            title,
            artist,
            url
        });

        // Save the new playlist song
        await newSong.save();

        // Add the new song's ObjectId to the user's playlist
        user.playlist.push(newSong._id);
        await user.save();

        res.status(200).json({ message: 'Song added to playlist', playlist: user.playlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = addToPlaylist;
