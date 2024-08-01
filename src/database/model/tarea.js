import mongoose, { Schema } from "mongoose";
import moment from "moment-timezone";

const tareaSchema = new Schema({
  idUsuario: {
    type: String,
  },
  tarea: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 40,
  },
  realizada: {
    type: Boolean,
    default: false,
    required: true,
  },
  fechaCreacion: {
    type: String,
    default: Date.now,
  },
  fechaActualizacion: {
    type: String,
    default: Date.now,
  },
});

const Tarea = mongoose.model("tarea", tareaSchema);

export default Tarea;
