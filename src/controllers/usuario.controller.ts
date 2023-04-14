import { Request, Response } from "express";
import { msg_ } from "../helpers/global";
import { USUARIO_MODEL } from "../models/usuario.schema";
import { JwtGenerator_ } from "../helpers/jwt";
import bcrypt from "bcrypt";

export const postUsuario = (req: Request, res: Response) => {
  try {
    console.log("🚀 ~ file: usuario.controller.ts:29 ~ postUsuario ~ req.body:", req.body)
    new USUARIO_MODEL(req.body)
      .save()
      .then(() => {
        msg_("10", "de USUARIO", res);
      })
      .catch((error: any) => {
        if (error.errors) {
          for (const propiedad in error.errors) {
            console.log(error)
            return msg_("01", propiedad, res);
          }
        } else {
          for (const prop in error.keyPattern) {
            console.log(error)
            return msg_("01", prop, res);
          }
        }
      });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre_usu, contrasena } = req.params;
    const DATA = await USUARIO_MODEL.findOne({ nombre_usu });
    if (DATA) {
      const flag_contrasena = bcrypt.compareSync(contrasena, DATA.contrasena);
      if (flag_contrasena) {
        const token = await JwtGenerator_(DATA.id);
        DATA.contrasena = "";
        res.json({ data: DATA, token: token });
      } else msg_("01", "", res);
    } else msg_("01", "", res);
  } catch (error) {
    res.json({ msg: error });
    console.error(error);
  }
};

export const putRestriccion = async (req: Request, res: Response) => {
  try {
    const { nombre_usu } = req.params;
    const { restricciones } = req.body;
    const DATA = await USUARIO_MODEL.updateOne(
      { nombre_usu: nombre_usu },
      { $set: { restricciones: restricciones } }
    );
    if (!DATA.modifiedCount) msg_("01", "", res);
    else msg_("01", "modificado", res);
  } catch (error) {
    res.json({ msg: error });
  }
};
