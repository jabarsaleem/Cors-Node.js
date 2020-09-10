const mongoose= require('mongoose');

require ('mongoose-currency').loadType(mongoose);
const Currency= mongoose.Types.Currency;


const schema= mongoose.Schema;



var promoschema= new schema(

{
    name:{

        type: String,
        required: true,
        unique: true

    },
    description: {
        type: String,
        required: true
    },image: {
        type: String,
        required: true
    },
   
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
  

    
    
},
{
    timestamps: true
}
);



var promos = mongoose.model('promo', promoschema);
module.exports = promos;