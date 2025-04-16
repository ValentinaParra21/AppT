import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.error('Encabezado Authorization no proporcionado');
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
        console.error('Token no encontrado en el encabezado Authorization');
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Token decodificado:', decoded); // Log para depuración
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('Token expirado:', error);
            return res.status(401).json({ message: 'Token expirado' });
        }
        console.error('Token inválido:', error);
        return res.status(401).json({ message: 'Token inválido' });
    }
};

const verifyRole = (rolesPermitidos) => (req, res, next) => {
    const userRoles = req.user?.roles || []; // Maneja el caso donde roles no esté definido
    const hasRole = userRoles.some((role) => rolesPermitidos.includes(role));

    if (!hasRole) {
        console.error('Acceso denegado. Roles del usuario:', userRoles);
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
};

export { verifyJWT, verifyRole };
