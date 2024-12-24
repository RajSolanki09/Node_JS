const Image = require("../modele/feature.schema");

const saveImage = async (req, res) => {
    const { url } = req.body;

    try {
        const image = new Image({ url });
        await Image.save();

        res.redirect('/img/images');
    } catch (err) {
        res.status(500).send('saving image URL');
    }
};

const getImg = async (req, res) => {
    try {
        const images = await Image.find(); 
        res.render('imgupload', { images });
    } catch (err) {
        res.status(500).send('Error retrieving image URLs');
    }
};

module.exports = { saveImage, getImg };
