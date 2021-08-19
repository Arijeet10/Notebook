const router=require("express").Router();
const Notes=require("../models/notesModel");

//get all notes
router.route("/").get((req,res)=>{
    Notes.find()
        .then(items=>res.json(items))
        .catch(err=>res.status(400).json("Error: "+err));
});

//get particular note details
router.route("/:id").get((req,res)=>{
    Notes.findById(req.params.id)
        .then(notes=>res.json(notes))
        .catch(err=>res.status(400).json("Error: "+err));
});

//create a note
router.route("/").post((req,res)=>{
    const newNote=new Notes({
        title:req.body.title,
        details:req.body.details
    });

    newNote.save()
        .then(()=>res.json("Note Saved"))
        .catch(err=>res.status(400).json("Error: "+err));
});

//delete a note
router.route("/:id").delete((req,res)=>{
    Notes.findByIdAndDelete(req.params.id)
        .then(()=>res.json("Successfully Deleted"))
        .catch(err=>res.status(400).json("Error: "+err));
});

//update a note
router.route("/:id").patch((req,res)=>{
    Notes.updateOne(
        {_id:req.params.id},
        {$set:req.body}
        )
        .then(()=>res.json("Successfully Updated"))
        .catch(err=>res.status(400).json("Error: "+err));

});

module.exports=router;