| Method          | Sent Data Type         | Backend Parser        | Pros                        | Cons                      |
|-----------------|------------------------|------------------------|------------------------------|----------------------------|
| **Base64**       | JSON string             | `express.json()`        | Simple, easy to debug         | 30–40% larger payload       |
| **Binary**       | Raw bytes               | `express.raw()`         | Smaller, faster               | Slightly harder to debug    |
| **Multer (optional)** | Multipart form-data     | `multer` middleware     | Easiest for production        | Extra dependency            |



### Folder Structure

project/
├── server.js
├── uploads/
└── public/
└── index.html