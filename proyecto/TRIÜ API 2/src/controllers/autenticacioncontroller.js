import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const user = await User.findOne({ correo }).populate('rol');
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const roles = Array.isArray(user.rol) ? user.rol.map((rol) => rol.nombre) : [];

        const token = jwt.sign(
            {
                id: user._id,
                nombre: user.nombre,
                apellidos: user.apellidos,
                roles,
            },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );
        return res.json({
            token,
            user: {
                _id: user._id,
                nombre: user.nombre,
                apellidos: user.apellidos,
                correo: user.correo,
                roles,
            },
        });
    } catch (error) {
        console.error('Error del servidor:', error);
        return res.status(500).json({ msg: 'Error del servidor' });
    }
};

export default login;
