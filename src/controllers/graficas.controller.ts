import { Request, Response } from "express";
import { msg_ } from "../helpers/global";
import { EMPRESA_MODEL } from "../models/empresa.schema";

export const putCapacidadSum = async (req: Request, res: Response) => {
  try {
    const { nit } = req.params;
    console.log("🚀 ~ file: graficas.controller.ts:8 ~ putCapacidad ~ eq.params:", req.params)
    const BODY = {
      capacidad_actual: req.body.capacidad_actual,
    };
    console.log("🚀 ~ file: graficas.controller.ts:12 ~ putCapacidad ~ BODY:", BODY)
    const GET = await EMPRESA_MODEL.findOne({ nit });
    if(GET) BODY.capacidad_actual = BODY.capacidad_actual + GET.capacidad_actual 
    console.log("🚀 ~ file: graficas.controller.ts:14 ~ putCapacidad ~ GET:", GET)
    console.log("🚀 ~ file: graficas.controller.ts:12 ~ putCapacidad ~ BODY:", BODY)
    const DATA = await EMPRESA_MODEL.updateOne({ nit }, BODY);
    if (DATA.modifiedCount)
      return msg_("?-s", `Capacidad actualizada - ${req.body.capacidad_actual} entradas añadidas`, res);
    else if ((BODY.capacidad_actual === GET?.capacidad_actual))
      return msg_("13", `Capacidad no actualizada, no hay ingresos nuevos`, res);
    else msg_("03", "", res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const putCapacidadRes = async (req:Request, res:Response) => {
  try {
    const {nit} = req.params;
    console.log("🚀 ~ file: graficas.controller.ts:32 ~ putCapacidadRes ~ req.params:", req.params)
    const BODY = {
      capacidad_actual: req.body.capacidad_actual,
    }
    console.log("🚀 ~ file: graficas.controller.ts:36 ~ putCapacidadRes ~ BODY:", BODY)
    const GET = await EMPRESA_MODEL.findOne({ nit });
    if(GET) BODY.capacidad_actual = GET.capacidad_actual - BODY.capacidad_actual
    const DATA = await EMPRESA_MODEL.updateOne({nit}, BODY);
    if (DATA.modifiedCount)
    return msg_("?-s", `Capacidad actualizada - ${req.body.capacidad_actual} entradas añadidas`, res);
  else if ((BODY.capacidad_actual === GET?.capacidad_actual))
    return msg_("13", `Capacidad no actualizada, no hay ingresos nuevos`, res);
  else msg_("03", "", res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
}

export const getDatosGrafica = async (req: Request, res: Response) => {
  try {
    const { nit } = req.params;
    const DATA = await EMPRESA_MODEL.findOne(
      { nit },
      {
        capacidad_total: 1,
        capacidad_actual: 1,
      }
    );
    if (DATA) res.json(DATA);
    else msg_("02", "grafica", res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
