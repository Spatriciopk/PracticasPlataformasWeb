const express=require('express');
const app=express();
//const port = 3000
const morgan =require('morgan');
app.use(morgan('combined'));
app.use(morgan('dev'));
app.use(express.static('public')), /*Para el midlewire */
app.set('nombreApp','Aplicacion para manejo de gastos SRI');
//console.log(app.get('nombreApp'));
app.set('puerto',4000);
app.listen(app.get('puerto'), ()=>{
        console.log('Nombre de la App',app.get('nombreApp'));
        console.log('Puerto del servidor',app.get('puerto'));
       })
app.set('view engine','ejs');
app.use(express.json());
app.get('/misitio', (req,res)=>{
        logger(req,res);
res.send('Bienvenido a mi sitio web Patricio Cadena <br><a href="/misitio/gastos">Gastos</a> <br><a href="/misitio/about">About</a>');
});
/*app.listen(port, ()=>{
console.log('Servidor escuchando en el puerto ' + port);
})*/
app.get('/misitio/about', (req,res)=>{
res.send('<h1>Acerca de nosotros</h1>');
logger(req,res);
});
app.get('/misitio/gastos', (req,res)=>{
        logger(req,res);
res.json(
{
gasto:'Salud',
monto:14575.60,
informacion:'Corresponde a consultas medicas, pagos de seguros, medicinas'
}
);
});


        /*{
    "ci":"1727322552",
    "ingresos":28000,
    "gastos":17000
}
        
        */ 
        app.post('/misitio/calculo', (req,res)=>{
                console.log(req.body);
                res.send('Cálculo impuesto a la renta');
                logger(req,res);
        });

        //Formulario con ruta
        app.post('/misitio/usuario/:id',(req, res)=>{
                console.log(req.body);
                console.log(req.params);
                res.send('Usuario nuevo registrado');
                logger(req,res);
                })

                app.put('/misitio/usuario/:id',(req, res)=>{
                        console.log(req.body);
                        console.log(req.params);
                        res.send('Datos del usuario '+req.params.id+" actualizado");
                        logger(req,res);
                        })

        /*{
    "ci":"1727322552",
    "nombre":"Patricio",
    "apellido":"Cadena"
}
 */


app.delete('/misitio/usuario/:id', (req,res)=>{
        res.send('Usuario '+ (req.params.id) +' borrado');
        logger(req,res);
        });



        /*Practica 7 */
function logger(req,res,next){
        console.log('Ruta Recibida '+ req.protocol+'://'+req.get('host')+ req.originalUrl);
        //next();
}

app.get('/midlewire',(req,res)=>{
        res.render('index.ejs');
       })

/*Midleware a nivel de direccionador */
var router = express.Router();

router.use(function (req, res, next) {
        console.log('Time:', Date.now());
        //next();
      });

app.use('/router', router);