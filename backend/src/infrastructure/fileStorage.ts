import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Configuración del almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    // Asegúrate de que el directorio 'uploads' exista o crea uno si no existe
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // Guarda el archivo con un nombre único para evitar sobreescrituras
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Filtrado de archivos para aceptar solo ciertos tipos
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export { upload };

