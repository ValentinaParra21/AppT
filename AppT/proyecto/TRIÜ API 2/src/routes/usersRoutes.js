import express from "express";
import { CreateUsuario, getUsuario, getUsuarioById, updateUsuario, deleteUsuario } from "../controllers/userController.js";
import {verifyJWT,verifyRole} from '../middleware/authMiddleware.js'

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *  */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *           example: "Juan"
 *         apellidos:
 *           type: string
 *           description: Apellidos del usuario
 *           example: "Pérez González"
 *         correo:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: "juan.perez@example.com"
 *         rol:
 *           type: string
 *           description: ID del rol asignado al usuario
 *           example: "63e4fcd6a8f3c41b4b9d1234"
 *       required:
 *         - nombre
 *         - apellidos
 *         - correo
 *         - rol
 */

// 1. Crear usuario
/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Crear un nuevo Usuario
 *     description: Permite crear un nuevo Usuario en el sistema.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la información del Usuario
 */
router.post("/", verifyJWT, verifyRole(['Admin','Root']), CreateUsuario);

// 2. Obtener todos los usuarios
/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve todos los usuarios registrados en el sistema.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios en el sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get("/", verifyJWT, verifyRole(['Admin','Root']), getUsuario);

// 3. Obtener un usuario por ID
/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtener un Usuario por ID
 *     description: Devuelve los detalles de un Usuario específico usando su ID.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Usuario que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", verifyJWT, verifyRole(['Admin','Root']), getUsuarioById);

// 4. Actualizar un usuario existente
/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Actualizar un Usuario existente
 *     description: Permite actualizar los datos de un Usuario existente.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Usuario que se desea actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en los datos del Usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:id", verifyJWT, verifyRole(['Admin','Root']), updateUsuario);

// 5. Eliminar un usuario
/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Eliminar un Usuario del sistema
 *     description: Permite eliminar un Usuario por su ID.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id", verifyJWT, verifyRole(['Admin','Root']), deleteUsuario);

export default router;
