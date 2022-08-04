const express =require("express");
const app = express();
const morgan = require("morgan");
const {mongoose}=require('./database');

//setings
app.set("nombreApp","Aplicacion para manejo de gastos SRI");
app.set("puerto",process.env.PORT|| 3000);

//middleware

app.use(morgan("dev"));
app.use(express.json());

//routes

app.use("/api/gastos",require("./server/routes/server.routes"));
app.listen(app.get("puerto"),() =>{
    console.log("Nombre de la APP",app.get("nombreApp"));
    console.log("Puerto del servidor",app.get("puerto"));
})


app.use("/api/gastos/tipo",require("./server/routes/server.routes"));
