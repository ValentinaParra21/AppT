import express from 'express';
import  login  from '../controllers/autenticacioncontroller.js'; // Agregar extensión `.js`

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Autenticación:
 *       type: object
 *       properties:
 *         correo:
 *           type: string
 *           description: Correo electrónico del usuario.
 *           example: "pedro@gmail.com"
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *           example: "Daniel123$"
 *       required:
 *         - correo
 *         - password
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticar usuario
 *     description: Inicia sesión con las credenciales del usuario y devuelve un token JWT.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Autenticación'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación JWT.
 *       400:
 *         description: Credenciales incorrectas
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/', login);

export default router;
