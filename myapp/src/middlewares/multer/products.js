const multer = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join('public/imgs/products'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

module.exports = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const acceptExt = ['.jpg', '.png', '.webp', '.jpeg'];
        const ext = path.extname(file.originalname);
        
        if (!acceptExt.includes(ext)) {
            req.file = file;
        }
        cb(null, acceptExt.includes(ext));
    }
})