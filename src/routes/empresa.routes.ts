import express from "express";
import {
  postEmpresa,
  getEmpresa,
  getEmpresas,
  putEmpresa,
  getEmpresasMenu,
  deleteEmpresa,
  getEmpresaName,
} from "../controllers/empresa.controller";

export const EMPRESA = express.Router();

EMPRESA.post("/empresa/post", postEmpresa);
EMPRESA.get("/empresa/obtener-empresas", getEmpresas);
EMPRESA.get("/empresa/obtener-empresas/:dato", getEmpresa);
EMPRESA.get("/empresa/obtener-empresa/:dato", getEmpresaName);
EMPRESA.get("/empresa/obtener-empresa-menu/:dato", getEmpresasMenu);
EMPRESA.put("/empresa/editar-empresa", putEmpresa);
EMPRESA.delete("/empresa/eliminar-empresa/:nit", deleteEmpresa);
