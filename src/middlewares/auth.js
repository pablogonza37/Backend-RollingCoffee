import jwt from 'jsonwebtoken';

const auth = (roles = []) => (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'Token requerido' });
  }

  try {
    const verify = jwt.verify(token, process.env.SECRET_JWT);
    const rolUsuario = verify.rol;

    if (roles.length === 0 || roles.includes(rolUsuario)) {
      req.idUsuario = verify.uid;
      return next();
    } else {
      return res.status(403).json({ msg: 'Acceso denegado' });
    }

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Token inválido' });
    }
    console.error(error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default auth;
