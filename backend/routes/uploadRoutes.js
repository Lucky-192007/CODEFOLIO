const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");

router.post("/image", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        message: "No image received."
      });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "portfolio"
    });

    res.status(200).json({
      imageUrl: result.secure_url
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Image upload failed."
    });
  }
});

module.exports = router;