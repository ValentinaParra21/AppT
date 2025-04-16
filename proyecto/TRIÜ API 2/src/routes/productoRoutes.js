import express from "express";
import { createProducto, getProducto, getProductoById, updateProducto, deleteProducto } from "../controllers/productoController.js";
import {verifyJWT,verifyRole} from '../middleware/authMiddleware.js'
const router = express.Router();

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto en la base de datos.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Zapatos deportivos"
 *               stock:
 *                 type: number
 *                 description: Cantidad en stock del producto
 *                 example: 50
 *               cat_producto:
 *                 type: string
 *                 description: ID de la categoría del producto
 *                 example: "63e4fcd6a8f3c41b4b9d1234"
 *             required:
 *               - nombre
 *               - stock
 *               - cat_producto
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error en el servidor
 */
router.post('/', verifyJWT, verifyRole(['Admin','Root']), createProducto);

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Obtiene una lista de todos los productos almacenados.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del producto
 *                   nombre:
 *                     type: string
 *                     description: Nombre del producto
 *                   stock:
 *                     type: number
 *                     description: Cantidad en stock
 *                   cat_producto:
 *                     type: string
 *                     description: ID de la categoría del producto
 *       500:
 *         description: Error del servidor
 */
router.get('/',verifyJWT,verifyRole(['Admin','Root']), getProducto);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto específico
 *     description: Obtiene un producto por su ID.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del producto
 *                 nombre:
 *                   type: string
 *                 stock:
 *                   type: number
 *                 cat_producto:
 *                   type: string
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', verifyJWT, verifyRole([ 'Admin', 'Root']), getProductoById);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto específico
 *     description: Actualiza los datos de un producto por su ID.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *       - in: body
 *         name: producto
 *         description: Objeto con los nuevos datos del producto.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             stock:
 *               type: number
 *             cat_producto:
 *               type: string
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', verifyJWT, verifyRole(['Admin', 'Root']), updateProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto de la base de datos por su ID.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', verifyJWT, verifyRole(['Admin','Root']), deleteProducto);

export default router;
