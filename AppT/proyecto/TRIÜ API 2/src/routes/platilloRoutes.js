import express from "express";
import { createPlatillo, getPlatillo, getPlatilloById, updatePlatillo, deletePlatillo } from "../controllers/platilloController.js";
import { verifyJWT ,verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /platillos:
 *   post:
 *     summary: Crear un nuevo platillo
 *     description: Crea un nuevo platillo en la base de datos.
 *     tags:
 *       - Platillos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del platillo
 *               precio:
 *                 type: number
 *                 description: Precio del platillo
 *               descripcion:
 *                 type: string
 *                 description: Descripción del platillo
 *               estado:
 *                 type: string
 *                 description: Estado del platillo (ej. "activo", "inactivo")
 *                 enum:
 *                   - activo
 *                   - inactivo
 *               categoria:
 *                 type: string
 *                 description: ID de la categoría del platillo (referencia a la colección de categorías)
 *             required:
 *               - nombre
 *               - precio
 *               - descripcion
 *               - estado
 *               - categoria
 *     responses:
 *       201:
 *         description: Platillo creado con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error en el servidor
 */
router.post('/',verifyJWT,verifyRole(['Admin', 'Mesero','Root']), createPlatillo);

/**
 * @swagger
 * /platillos:
 *   get:
 *     summary: Obtener todos los platillos
 *     description: Obtiene una lista de todos los platillos almacenados.
 *     tags:
 *       - Platillos
 *     responses:
 *       200:
 *         description: Lista de platillos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   precio:
 *                     type: number
 *                   descripcion:
 *                     type: string
 *                   estado:
 *                     type: string
 *                     enum:
 *                       - activo
 *                       - inactivo
 *                   categoria:
 *                     type: string
 *                     description: ID de la categoría del platillo (referencia a la colección de categorías)
 *       500:
 *         description: Error del servidor
 */
router.get('/',verifyJWT,verifyRole(['Cocinero','Admin','Mesero','Root']), getPlatillo);

/**
 * @swagger
 * /platillos/{id}:
 *   get:
 *     summary: Obtener un platillo específico
 *     description: Obtiene un platillo por su ID.
 *     tags:
 *       - Platillos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del platillo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Platillo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 precio:
 *                   type: number
 *                 descripcion:
 *                   type: string
 *                 estado:
 *                   type: string
 *                   enum:
 *                     - activo
 *                     - inactivo
 *                 categoria:
 *                   type: string
 *                   description: ID de la categoría del platillo (referencia a la colección de categorías)
 *       404:
 *         description: Platillo no encontrado
 */
router.get('/:id',verifyJWT,verifyRole(['Cocinero','Admin','Mesero','Root']), getPlatilloById);

/**
 * @swagger
 * /platillos/{id}:
 *   put:
 *     summary: Actualiza un platillo específico
 *     description: Actualiza los datos de un platillo por su ID.
 *     tags:
 *       - Platillos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del platillo
 *         schema:
 *           type: string
 *       - in: body
 *         name: platillo
 *         description: Objeto con los nuevos datos del platillo.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             precio:
 *               type: number
 *             descripcion:
 *               type: string
 *             estado:
 *               type: string
 *               enum:
 *                 - activo
 *                 - inactivo
 *             categoria:
 *               type: string
 *               description: ID de la categoría del platillo (referencia a la colección de categorías)
 *     responses:
 *       200:
 *         description: Platillo actualizado
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Platillo no encontrado
 */
router.put('/:id',verifyJWT,verifyRole(['Admin','Root']), updatePlatillo);

/**
 * @swagger
 * /platillos/{id}:
 *   delete:
 *     summary: Elimina un platillo
 *     description: Elimina un platillo de la base de datos por su ID.
 *     tags:
 *       - Platillos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del platillo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Platillo eliminado con éxito
 *       404:
 *         description: Platillo no encontrado
 */
router.delete('/:id',verifyJWT,verifyRole(['Admin','Root']), deletePlatillo);

export default router;
