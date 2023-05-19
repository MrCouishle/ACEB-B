import express from "express";
import { getDatosGrafica, putCapacidadSum, putCapacidadRes } from "../controllers/graficas.controller";

export const GRAFICAS = express.Router();

GRAFICAS.get("/graficas/get-datos/:nit", getDatosGrafica);
GRAFICAS.put("/graficas/put-sum/:nit", putCapacidadSum);
GRAFICAS.put("/graficas/put-res/:nit", putCapacidadRes);