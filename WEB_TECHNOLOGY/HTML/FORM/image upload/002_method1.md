
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
    const uploadBtn = document.getElementById('uploadBtn');
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');

    uploadBtn.addEventListener('click', async () => {
      const file = imageInput.files[0];
      if (!file) return alert("Please select an image first.");

      // Convert image to Base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;

        // Send Base64 string to backend
        const res = await fetch('/upload-base64', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });

        const data = await res.json();
        preview.innerHTML = `
          <p>${data.message}</p>
          <img src="${data.filePath}" alt="Uploaded Image">
        `;
      };
      reader.readAsDataURL(file);
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

// Middleware to parse Base64 JSON (set limit for large images)
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// POST route for Base64 image
app.post('/upload-base64', (req, res) => {
  const { image } = req.body;

  // Extract base64 data and convert to buffer
  const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  // Save the file locally
  const fileName = `upload_${Date.now()}.png`;
  const filePath = path.join('uploads', fileName);
  fs.writeFileSync(filePath, buffer);

  res.json({
    message: 'Image uploaded successfully!',
    filePath: `/${filePath}`,
  });
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```