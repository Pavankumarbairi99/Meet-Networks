const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadImageCloudinary = async(image) => {
    try {
        if (!process.env.CLOUD_NAME) throw new Error("Missing CLOUD_NAME in .env");
        if (!image) throw new Error("No image provided");

        const buffer = image.buffer || Buffer.from(await image.arrayBuffer());

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "TinderClone" },
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        return uploadResult;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
};

module.exports = uploadImageCloudinary;