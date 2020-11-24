
// cfg multer lib para trabalhar com envio de imagens em requisições POST.
// alocando imagem no diskStorage.

// multForm part data - multer;
import multer from "multer";
import path from "path";

// tratando imagem;
export default {
  storage: multer.diskStorage({
    // caminho onde a imagem sera salva - pasta uploads;
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};
