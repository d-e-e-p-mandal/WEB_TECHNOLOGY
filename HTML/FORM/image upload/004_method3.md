
## 🔹 Step 1: Install Dependencies

Run the following command :

```bash
npm init -y
npm install express multer
```

## 🔹 Step 2: Frontend (HTML Form) : 
Create a file public/index.html with the following content:


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Image Upload using Multer</title>
  <style>
    body { font-family: Arial; text-align: center; margin-top: 50px; }
    input, button { margin: 10px; }
    img { width: 200px; margin-top: 20px; border-radius: 10px; }
  </style>
</head>
<body>
  <h2>Upload Image (Multer)</h2>
  <form id="uploadForm" enctype="multipart/form-data">
    <input type="file" name="image" accept="image/*" required>
    <button type="submit">Upload</button>
  </form>

  <div id="preview"></div>

  <script>
    const form = document.getElementById('uploadForm');
    const preview = document.getElementById('preview');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      preview.innerHTML = `
        <p>${data.message}</p>
        <img src="${data.filePath}" alt="Uploaded Image">
      `;
    });
  </script>
</body>
</html>
```

## 🔹 Step 3: Backend (Node.js + Express + Multer)
Create a file server.js with the following code:
```js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Serve static files from public & uploads
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only image files are allowed!'));
  }
});



// Route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  res.json({
    message: 'Image uploaded successfully!',
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```
// or 

```js
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// ✅ Basic multer setup — stores uploads in 'uploads/' folder
const upload = multer({ dest: "uploads/" });

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Upload route (handles single image file)
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }

  res.json({
    message: "✅ File uploaded successfully!",
    fileInfo: req.file,
    fileUrl: `/uploads/${req.file.filename}`,
  });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
```