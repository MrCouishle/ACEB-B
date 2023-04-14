import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface usuario {
  id: string;
  tipo_id: string;
  nivel_usuario: string;
  nombre: string;
  nombre_empresa: string;
  direccion: string;
  nit: string;
  nombre_usu: string;
  estado_sistema: string;
  contrasena: string;
  restricciones: [];
}

const USUARIO_SCHEMA = new Schema<usuario>(
  {
    id: {
      type: String,
      required: true,
    },
    tipo_id: {
      type: String,
      required: true,
    },
    nivel_usuario: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    nombre_empresa: {
      type: String,
      required: true,
    },
    nit: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    nombre_usu: {
      type: String,
      required: true,
    },
    estado_sistema: {
      type: String,
      required: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    restricciones: {
      type: [],
    },
  },
  { timestamps: true }
);

// USUARIO_SCHEMA.pre("save", function (next) {
//   bcrypt.hash(this.contrasena, 10, (err, hash) => {
//     err ? next(new Error("F")) : (this.contrasena = hash), next();
//   });
// });

USUARIO_SCHEMA.index({ id: 1 }, { unique: true });

export const USUARIO_MODEL = model<usuario>("usuario", USUARIO_SCHEMA);
