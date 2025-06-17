import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAT:-1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "internal server error"});
    }
}

export async function getNotesById(req, res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Notes not found"});
        res.json(note);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "internal server error"});
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new:true,
            }
    );
        if(!updatedNote) return res.status(404).json({message:"Notes not found"});
        
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "internal server error"});
    }
}

export async function deleteNote(req, res) {
    try {
        const deleteNode = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNode) return res.status(404).json({message:"Notes not found"});
        res.status(200).json({message:"Notes deleted successfully!!.."});
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "internal server error"});
    }
}