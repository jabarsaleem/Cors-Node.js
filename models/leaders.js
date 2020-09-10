const mongoose= require('mongoose');
const schema= mongoose.Schema;
var leaderschema= new schema(

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
   
    abbr: {
        type: String,
        required:true
    },
    designation: {
        type: String,
        required: true,
    },
  

},
{
    timestamps: true
}
);

var leaders = mongoose.model('leader', leaderschema);
module.exports = leaders;