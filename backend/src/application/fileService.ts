import multer from 'multer';
import path from 'path';

class FileService {
  private upload: multer.Multer;

  constructor() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    });

    this.upload = multer({ storage: storage });
  }

  getUploadMiddleware() {
    return this.upload.single('resume');
  }

  // Otros métodos relacionados con archivos podrían ir aquí
}

export default new FileService();