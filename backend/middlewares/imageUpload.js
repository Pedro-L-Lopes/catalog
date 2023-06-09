const multer = require("multer"); // Upload de arquivos
const path = require("path"); // Modulo padrão de caminhos/diretorios do node

// Destino da imagem
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      // Ver se a url por onde ela foi inserida inclui "users"
      folder = "users";
    } else if (req.baseUrl.includes("products")) {
      folder = "products";
    }

    cb(null, `uploads/${folder}/`); // Callback configurando o destino da imagem
  },

  filename: (req, file, cb) => {
    // Mudando nome do arquivo para não ter substituição de arquivo
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    //expressão regular para verificar as extensões do arquivo
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // Upload de png e jpg
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

const imageUploadProducts = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    //expressão regular para verificar as extensões do arquivo
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // Upload de png e jpg
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
}).array("images", 3);

module.exports = { imageUpload, imageUploadProducts };
