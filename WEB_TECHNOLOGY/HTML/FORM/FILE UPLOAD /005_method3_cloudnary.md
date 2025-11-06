## IN CLOUDNARY 
#### FOLDER STRUCTURE :
```
`project/
├── server.js
├── .env
└── public/
    └── index.html
```
```BASH
npm install express
npm install multer
npm install cloudinary
npm install multer-storage-cloudinary
npm install dotenv
``` 


.env file //You can get these from your Cloudinary Dashboard
```.env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cloudinary Image Upload</title>
  <style>
    body { font-family: sans-serif; text-align: center; margin-top: 50px; }
    img { width: 200px; margin-top: 20px; border-radius: 10px; }
  </style>
</head>
<body>
  <h1>Upload Image to Cloudinary</h1>

  <form id="uploadForm" enctype="multipart/form-data">
    <input type="file" name="image" id="imageInput" accept="image/*" required>
    <button type="submit">Upload</button>
  </form>

  <div id="result"></div>

  <script>
    const form = document.getElementById("uploadForm");
    const result = document.getElementById("result");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      result.innerHTML = `
        <p>${data.message}</p>
        <img src="${data.imageUrl}" alt="Uploaded Image">
      `;
    });
  </script>
</body>
</html>
```

#### BACKEND :
```js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const app = express();

// ✅ Configure Cloudinary : do it in cloud config file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Set up Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads_demo", // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

// ✅ Initialize Multer
const upload = multer({ storage: storage });

// ✅ Upload Route (POST)
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "✅ Image uploaded to Cloudinary successfully!",
    imageUrl: req.file.path, // Cloudinary secure URL
    publicId: req.file.filename,
  });
});

// ✅ Start Server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

### Update and Delete also form cloudnary 
```js
const { cloudinary } = require('../cloudConfig');
const Listing = require("../models/listing");

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  // Find listing first (to get old image info)
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Update listing fields
  Object.assign(listing, req.body.listing);

  if (req.file) {
    // Delete old image from Cloudinary if exists
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    // Add new image info
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  
  // Find listing to get image info
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Delete image from Cloudinary if exists
  if (listing.image && listing.image.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  // Delete listing from DB
  await Listing.findByIdAndDelete(id);
  
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
```


# Object.assign() in JavaScript

`Object.assign(target, source)` is a method used to copy all enumerable properties from the **source** object to the **target** object.

## Usage in Updating Objects

- Copies properties from one object (`source`) into another (`target`).
- Overwrites existing properties in the target with properties from the source.
- Useful for updating an object with new values without manually assigning each field.

## Example

```js
const listing = {
  title: "Old Title",
  price: 500
};

const updates = {
  title: "New Title",
  price: 1000
};

Object.assign(listing, updates);

console.log(listing);
// Output: { title: "New Title", price: 1000 }
```
