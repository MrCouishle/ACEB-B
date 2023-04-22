import { Response } from "express";
export const findMsg_ = (code: String, campo: String, res: Response) => {
  let msg;
  const MSG = [
    { code: "01", msg: `Error al grabar el registro.`, tipo: "error" },
    { code: "02", msg: `No existen ${campo}`, tipo: "info" },
    { code: "03", msg: `Error al actualizar el registro.`, tipo: "error"},
    { code: "04", msg: `Error al borrar registro.`, tipo: "error" },
    { code: "05", msg: `${campo} es requerido.`, tipo: "info" },
    { code: "10", msg: `Registro ${campo} realizado`, tipo: "success" },
    { code: "PZi", msg: `${campo}`, tipo: "info" },
    { code: "PZs", msg: `${campo}`, tipo: "success" },
  ];
  const RES = MSG.find((e) => e.code == code);
  return RES ? res.json(RES) : msg;
};
