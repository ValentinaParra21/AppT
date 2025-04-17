import express from 'express';
import { createCategoria, getCategoria, getCategoriaById, updateCategoria, deleteCategoria } from '../controllers/categoriaController.js';
import {verifyJWT,verifyRole} from '../middleware/authMiddleware.js'
const routers = express.Router();


/**
 * @swagger
 * /categorias:
 *   post:
 *     tags:
 *       - Categorías
 *     summary: Crear una nueva categoría
 *     description: Crea una nueva categoría en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la categoría
 *                 example: "Electrónica"
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la categoría
 *                 example: "Productos relacionados con tecnología"
 *             required:
 *               - nombre
 *               - descripcion
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error en el servidor
 */
routers.post('/',verifyJWT, verifyRole(['Admin', 'Mesero','Root']), createCategoria);


/**
 * @swagger
 * /categorias:
 *   get:
 *     tags:
 *       - Categorías
 *     summary: Obtener todas las categorías
 *     description: Devuelve todas las categorías almacenadas.
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la categoría
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la categoría
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la categoría
 *                   example:
 *                     _id: "63e4fcd6a8f3c41b4b9d1234"
 *                     nombre: "Electrónica"
 *                     descripcion: "Productos relacionados con tecnología"
 *       500:
 *         description: Error en el servidor
 */
routers.get('/',verifyJWT, verifyRole(['Admin', 'Mesero','Root']), getCategoria);


/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     tags:
 *       - Categorías
 *     summary: Obtener una categoría por ID
 *     description: Devuelve los detalles de una categoría específica usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la categoría
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la categoría
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la categoría
 *       404:
 *         description: Categoría no encontrada
 */
routers.get('/:id',verifyJWT, verifyRole(['Admin', 'Mesero','Root']), getCategoriaById);


/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     tags:
 *       - Categorías
 *     summary: Actualizar una categoría
 *     description: Actualiza los datos de una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre de la categoría
 *                 example: "Hogar"
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción de la categoría
 *                 example: "Productos para el hogar"
 *             required:
 *               - nombre
 *               - descripcion
 *     responses:
 *       200:
 *         description: Categoría actualizada con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Categoría no encontrada
 */
routers.put('/:id',verifyJWT, verifyRole(['Admin', 'Mesero','Root']), updateCategoria);


/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     tags:
 *       - Categorías
 *     summary: Eliminar una categoría
 *     description: Elimina una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito
 *       404:
 *         description: Categoría no encontrada
 */
routers.delete('/:id',verifyJWT, verifyRole(['Admin','Root']), deleteCategoria);

export default routers;
