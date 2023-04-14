import { Response } from "express";
export const findMsg_ = (code: String, campo: String, res: Response) => {
  let msg;
  const MSG = [
    { code: "01", msg: `Error al grabar el registro.`, tipo: "error" },
    { code: "02", msg: `No existen ${campo}`, tipo: "info" },
    { code: "10", msg: `Registro ${campo} realizado`, tipo: "success" },
  ];
  const RES = MSG.find((e) => e.code == code);
  return RES ? res.json(RES) : msg;
};
