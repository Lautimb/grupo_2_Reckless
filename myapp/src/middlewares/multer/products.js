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
		
		const acceptedExt = ['.jpg','.webp','.jpeg','.png']
		const ext = path.extname(file.originalname)
		 req.body.files = false;
		if(!acceptedExt.includes(ext)){
			req.body.files = file
		}
		cb(null,acceptedExt.includes(ext));
    }
})