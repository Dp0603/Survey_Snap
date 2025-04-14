// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dqi8cb2gn",
//   api_key: "722297699712292",
//   api_secret: "Xnzz5eTJfoaZOWnx-JL2gLKttkM",
// });

// const uploadFileToCloudinary = async (file) => {
//   try {
//     const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
//     return cloudinaryResponse;
//   } catch (error) {
//     throw new Error("Cloudinary upload failed: " + error.message);
//   }
// };

// module.exports = { uploadFileToCloudinary };


const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFileToCloudinary = async (file) => {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

module.exports = { uploadFileToCloudinary };
