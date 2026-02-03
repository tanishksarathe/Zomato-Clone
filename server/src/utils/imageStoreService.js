import cloudinary from "../config/cloudinary.js";

export const uploadImagesToCloudinary = async (multipleFiles) => {
  try {
    const uploadedImages = multipleFiles.map(async (item) => {
      const b64 = Buffer.from(item.buffer).toString("base64");

      const dataURI = `data:${item.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI,{
        folder: "Restaurant/Menu",
        height: 500,
        width: 500,
        crop: "fill",
      });

      return {
        url: result.url,
        publicID: result.public_id,
      };
    });

    console.log(
      "Uploaded Image ye return de rha h after the map and before Promise : ",
      uploadedImages,
    );

    const uploadAllPromise = await Promise.all(uploadedImages);

    console.log(
      "Uploaded Image ye return de rha h after Promise : ",
      uploadAllPromise,
    );

    return uploadAllPromise;
  } catch (error) {
    throw new Error("Image Upload Failed");
  }
};
