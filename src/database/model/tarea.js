import mongoose, {Schema} from "mongoose";

const tareaSchema = new Schema({
    tarea:{
        type: String,
        required: true,
        unique: true,
        minLength:3,
        maxLength:40
    },
    realizada:{
    type: Boolean,
    required: true,
},
})

const Tarea = mongoose.model('tarea', tareaSchema);

export default Tarea;