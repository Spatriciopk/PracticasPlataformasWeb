const { Router } = require("express");
const router = Router();
 

// 6. La ruta que devuelva todos los usuarios tiene la siguiente estructura
router.get("/", (req, res) => {
  return res.json("Todos los usuarios enviados");
});

// 7. La ruta que devuelva un usuario específico tiene la siguiente estructura
router.get("/:id", (req, res) => {
  if (req.params.id === "U001") {
    return res.json("Usuario 001 correcto");
  }
  return res.status(404).json("Usuario no encontrado");
});



// 8. La ruta que añade un usuario es


router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    return res.status(201).json("Usuario creado");
  }
  res.status(400).json("Usuario no creado");
});
// 9. Exportar el módulo
module.exports = router;
