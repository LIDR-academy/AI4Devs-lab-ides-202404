import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);

  if (error.code === 'P2000') {
    return res.status(400).json({
      error: `El valor de la columna ingresado es muy largo`,
    });
  } else if (error.code === 'P2002') {
    return res
      .status(400)
      .json({ error: 'El correo electrónico ya está en uso' });
  } else {
    return res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};

export default errorHandlerMiddleware;
