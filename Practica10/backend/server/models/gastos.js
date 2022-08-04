const mongoose=require('mongoose');
const {Schema}=mongoose;

const GastosSchema = new Schema({
    tipo:{type:String, required:true},
    ruc:{type:String, required: true},
    empresa:{type:String, required:true},
    monto:{type:Number, required:true}
})

module.exports=mongoose.model('Gasto',GastosSchema);