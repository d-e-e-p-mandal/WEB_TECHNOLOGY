
---

## 🔹 Method 1: Upload Using Base64 (Simple & Clean)

### 🧩 Frontend — `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Upload Image (No Multer)</title>
  <style>
    body { font-family: sans-serif; text-align: center; margin-top: 50px; }
    img { width: 200px; margin-top: 20px; border-radius: 10px; }
  </style>
</head>
<body>
  <h1>Upload Image Without Multer</h1>
  <input type="file" id="imageInput" accept="image/*">
  <button id="uploadBtn">Upload</button>
  <div id="preview"></div>

  <script>
    const uploadBtn = document.getElementById("uploadBtn");
    const imageInput = document.getElementById("imageInput");
    const preview = document.getElementById("preview");

    uploadBtn.addEventListener("click", async () => {
      const file = imageInput.files[0];
      if (!file) {
        alert("Please select an image first!");
        return;
      }

      // Send the file as binary data
      const res = await fetch("/upload-binary", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: file,
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



Backend - server.js
```js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to serve uploaded files
app.use('/uploads', express.static('uploads'));

// Handle raw binary uploads
app.post(
  '/upload-binary',
  express.raw({ type: 'application/octet-stream', limit: '10mb' }),
  (req, res) => {
    const fileName = `upload_${Date.now()}.png`;
    fs.writeFileSync(path.join('uploads', fileName), req.body);
    res.json({
      message: 'Binary upload successful!',
      filePath: `/uploads/${fileName}`,
    });
  }
);

app.listen(3000, () =>
  console.log('Server running on http://localhost:3000')
);
```