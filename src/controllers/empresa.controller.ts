import { Request, Response } from "express";
import { msg_, getCoordinates } from "../helpers/global";
import { EMPRESA_MODEL } from "../models/empresa.schema";

export const postEmpresa = async (req: Request, res: Response) => {
  try {
    const apiKey = "AIzaSyCUxkcVPUx0rrBV85-8itCu-CNhaRgDP04";

    const DATA = await getCoordinates(req.body.direccion, apiKey);
    console.log(req.body);

    const BODY = {
      nombre_empresa: req.body.nombre_empresa,
      tipo_empresa: req.body.tipo_empresa,
      nit: req.body.nit,
      direccion: req.body.direccion,
      latitud: DATA.latitude,
      longitud: DATA.longitude,
      capacidad_total: req.body.capacidad_total,
      capacidad_actual: 0,
      sucursal_principal: req.body.sucursal_principal,
      ruta_opcion: req.body.ruta_opcion,
    };

    new EMPRESA_MODEL(BODY)
      .save()
      .then(() => {
        msg_("10", "de EMPRESA", res);
      })
      .catch((error) => {
        console.log("2", error);
        if (error.errors) {
          for (const propiedad in error.errors) return msg_("05", propiedad, res);
        } else {
          for (const prop in error.keyPattern) return msg_("08", prop, res);
        }
      });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const getEmpresa = async (req: Request, res: Response) => {
  try {
    const { dato } = req.params;
    console.log(dato);

    const DATA = await EMPRESA_MODEL.find({
      $or: [{ nombre_empresa: { $regex: dato, $options: "ix" } }, { nit: { $regex: dato, $options: "i" } }],
    });
    if (DATA) res.json(DATA);
    else msg_("02", "empresa", res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
export const getEmpresasMenu = async (req: Request, res: Response) => {
  try {
    const { dato } = req.params;
    console.log("dato ->", dato);

    const DATA = await EMPRESA_MODEL.find({ sucursal_principal: dato });
    DATA.length ? res.json(DATA) : msg_("02", "empresa", res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
export const getEmpresaName = async (req: Request, res: Response) => {
  try {
    const { dato } = req.params;

    const DATA = (await EMPRESA_MODEL.findOne({ ruta_opcion: dato })) || {};
    if ("_id" in DATA) res.json(DATA);
    else msg_("02", "empresa", res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const getEmpresas = async (req: Request, res: Response) => {
  try {
    const DATA = await EMPRESA_MODEL.find();
    if (DATA?.length) res.json(DATA);
    else msg_("02", "empresa", res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const putEmpresa = async (req: Request, res: Response) => {
  try {
    const DATA = await EMPRESA_MODEL.updateOne({ nit: req.body.nit }, req.body);
    if (DATA.modifiedCount) return msg_("?-s", `Empresa ${req.body.nombre_empresa} modificada correctamente`, res);
    else msg_("03", "", res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const deleteEmpresa = async (req: Request, res: Response) => {
  try {
    const { nit } = req.params;
    const DATA = await EMPRESA_MODEL.deleteOne({ nit: nit });
    if (DATA.deletedCount)
      return msg_("?-s", `Empresa ${req.params.nombre_empresa} con NIT ${req.params.nit} eliminada correctamente`, res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
