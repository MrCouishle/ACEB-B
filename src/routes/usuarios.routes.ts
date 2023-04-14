import express from "express";
import { postUsuario, getUsuario, putRestriccion } from "../controllers/usuario.controller";

export const USUARIO = express.Router();

USUARIO.post("/usuario/crear", postUsuario);
USUARIO.get("/usuario/login/:nombre_usu/:contrasena", getUsuario);
USUARIO.put("/usuario/restricciones/:nombre_usu", putRestriccion);