const express = require("express");
const app = express();

app.use(express.json());
//rutas


app.listen(3000);
console.log ("Server corriendo en el Puerto 3000")





// 10. En app.js colocar la llamada a las rutas
app.use("/users", require("./routes/users"));




// 14. Se debe importar el archivo sobre el que queremos hacer la prueba
module.exports = app;