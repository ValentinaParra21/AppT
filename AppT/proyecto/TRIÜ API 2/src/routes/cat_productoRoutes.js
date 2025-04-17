import express from "express";
import { createCat_Producto, getCat_Producto, getCat_ProductoById, updateCat_Producto, deleteCat_Producto } from "../controllers/cat_productoController.js";
import {verifyJWT,verifyRole} from '../middleware/authMiddleware.js'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Cat_Productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cat_Producto:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría de producto
 *           example: "Electrónica"
 *       required:
 *         - nombre
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoría de producto
 *     description: Crea una nueva categoría de producto en la base de datos.
 *     tags:
 *       - Cat_Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cat_Producto'
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error en el servidor
 */
router.post("/", verifyJWT, verifyRole(['Admin', 'Mesero','Root']), createCat_Producto);

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías de productos
 *     description: Obtiene una lista de todas las categorías de productos almacenadas.
 *     tags:
 *       - Cat_Productos
 *     responses:
 *       200:
 *         description: Lista de categorías de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cat_Producto'
 *       500:
 *         description: Error del servidor
 */
router.get("/", verifyJWT, verifyRole(['Admin', 'Mesero','Root']), getCat_Producto);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener una categoría de producto específica
 *     description: Obtiene una categoría de producto por su ID.
 *     tags:
 *       - Cat_Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría de producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría de producto encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cat_Producto'
 *       404:
 *         description: Categoría de producto no encontrada
 */
router.get("/:id", verifyJWT, verifyRole(['Admin', 'Mesero','Root']), getCat_ProductoById);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría de producto específica
 *     description: Actualiza los datos de una categoría de producto por su ID.
 *     tags:
 *       - Cat_Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría de producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cat_Producto'
 *     responses:
 *       200:
 *         description: Categoría de producto actualizada con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Categoría de producto no encontrada
 */
router.put("/:id", verifyJWT, verifyRole(['Admin', 'Mesero','Root']), updateCat_Producto);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría de producto
 *     description: Elimina una categoría de producto de la base de datos por su ID.
 *     tags:
 *       - Cat_Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría de producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría de producto eliminada con éxito
 *       404:
 *         description: Categoría de producto no encontrada
 */
router.delete("/:id", verifyJWT, verifyRole(['Admin', 'Mesero','Root']), deleteCat_Producto);

export default router;
