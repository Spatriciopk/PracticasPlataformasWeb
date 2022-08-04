const Gasto=require('../models/gastos');

const gastosController={};



gastosController.createGastos= async(req,res)=>{
    const gasto=new Gasto(req.body);
    console.log(gasto);
    await gasto.save();
    res.json('status: Gasto guardado');
    }

    gastosController.editGasto=async(req,res)=>{
        const {id}=req.params;
        const gasto={
        tipo: req.body.tipo,
        ruc: req.body.ruc,
        empresa: req.body.empresa,
        monto: req.body.monto
        };
        await Gasto.findByIdAndUpdate(id, {$set:gasto},{new: true});
        res.json('status: Gasto actualizado');
        }
    gastosController.deleteGasto=async(req,res)=>{
        
        await Gasto.findOneAndRemove(req.body.id);
        res.json('Dato Eliminiado');
        
}

gastosController.getGasto=async(req,res)=>{
    console.log(req.params.id);
    const gasto= await Gasto.findById(req.params.id);
    res.json(gasto);
    }

gastosController.getGastos= async(req, res)=>
{
    const gastos= await Gasto.find();
    res.json(gastos);
}

gastosController.getGastosTipo= async(req, res)=>
{
    var {tipo}=req.params;
    tipo = tipo+"";
    const gastos= await Gasto.find({tipo:tipo}).exec();
    res.json(gastos)
}
module.exports=gastosController;


