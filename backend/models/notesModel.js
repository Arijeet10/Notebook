const mongoose=require("mongoose");

const notesSchema=mongoose.Schema({
    title:{type:String,required:true},
    details:{type:String,required:true}
});

const Notes=mongoose.model("Note",notesSchema);

module.exports=Notes;
