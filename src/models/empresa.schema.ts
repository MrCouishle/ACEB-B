import { Schema, model } from "mongoose";

interface empresa {
  nombre_empresa: string;
  tipo_empresa: string;
  nit: string;
  direccion: string;
  latitud: number;
  longitud: number;
  capacidad_total: number;
  capacidad_actual: number;
  sucursal_principal: string;
  ruta_opcion: string;
}

const EMPRESA_SCHEMA = new Schema<empresa>({
  nombre_empresa: {
    type: String,
    required: true,
  },
  tipo_empresa: {
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
  latitud: {
    type:  Number,
  },
  longitud: {
    type: Number,
  },
  capacidad_total: {
    type: Number,
    required: true,
  },
  capacidad_actual: {
    type: Number,
    required: true,
  },
  sucursal_principal: {
    type: String,
    required: true,
  },
  ruta_opcion: {
    type: String,
    required: true,
  }
});

EMPRESA_SCHEMA.index({nombre_empresa:1}, {unique: true});

export const EMPRESA_MODEL = model <empresa>("empresa", EMPRESA_SCHEMA)