import express from "express";
import { createFactura, getFactura, getFacturasEs, updateFactura, deleteFactura } from "../controllers/facturaController.js";
import { verifyJWT, verifyRole } from "../middleware/authMiddleware.js";
const Frouter = express.Router()

// 1. Crear facturas
/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     description: Permite crear una nueva factura.
 *     tags:
 *       - Facturas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del cliente o entidad
 *                 example: "Juan Pérez"
 *               celular:
 *                 type: number
 *                 description: Número de celular del cliente
 *                 example: 123456789
 *               valor:
 *                 type: number
 *                 description: Valor total de la factura
 *                 example: 1500
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *                 example: "juanperez@example.com"
 *               Pedidos:
 *                 type: string
 *                 description: ID del pedido relacionado con la factura
 *                 example: "63e4fcd6a8f3c41b4b9d1234"
 *             required:
 *               - nombre
 *               - celular
 *               - valor
 *               - Pedidos
 *     responses: 
 *       201:
 *         description: Factura creada exitosamente
 *       400:
 *         description: Error en los datos de la factura
 */
Frouter.post("/", verifyJWT, verifyRole(['Mesero','Admin', 'Root']), createFactura);

// 2. Obtener todas las facturas
/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     description: Devuelve todas las facturas registradas.
 *     tags:
 *       - Facturas
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la factura
 *                   nombre:
 *                     type: string
 *                     description: Nombre del cliente o entidad
 *                   celular:
 *                     type: number
 *                     description: Número de celular del cliente
 *                   valor:
 *                     type: number
 *                     description: Valor total de la factura
 *                   correo:
 *                     type: string
 *                     description: Correo electrónico del cliente
 *                   Pedidos:
 *                     type: string
 *                     description: ID del pedido relacionado con la factura
 *                   example:
 *                     _id: "63e4fcd6a8f3c41b4b9d1234"
 *                     nombre: "Juan Pérez"
 *                     celular: 123456789
 *                     valor: 1500
 *                     correo: "juanperez@example.com"
 *                     Pedidos: "673acfddec4faa747f9378da"
 *       500:
 *         description: Error en el servidor
 */
Frouter.get("/", verifyJWT, verifyRole(['Mesero','Admin', 'Root']), getFactura);

// 3. Obtener una factura por ID
/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     description: Devuelve los detalles de una factura específica usando su ID.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la factura
 *                 nombre:
 *                   type: string
 *                   description: Nombre del cliente o entidad
 *                 celular:
 *                   type: number
 *                   description: Número de celular del cliente
 *                 valor:
 *                   type: number
 *                   description: Valor total de la factura
 *                 correo:
 *                   type: string
 *                   description: Correo electrónico del cliente
 *                 Pedidos:
 *                   type: string
 *                   description: ID del pedido relacionado con la factura
 *       404:
 *         description: Factura no encontrada
 */
Frouter.get("/:id", verifyJWT, verifyRole(['Mesero','Admin', 'Root']), getFacturasEs);

// 4. Actualizar una factura existente
/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualizar una factura existente
 *     description: Permite actualizar los datos de una factura existente.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura que se desea actualizar
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
 *                 description: Nombre del cliente o entidad
 *                 example: "Juan Pérez"
 *               celular:
 *                 type: number
 *                 description: Número de celular del cliente
 *                 example: 123456789
 *               valor:
 *                 type: number
 *                 description: Valor total de la factura
 *                 example: 1500
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *                 example: "juanperez@example.com"
 *               Pedidos:
 *                 type: string
 *                 description: ID del pedido relacionado con la factura
 *                 example: "63e4fcd6a8f3c41b4b9d1234"
 *             required:
 *               - nombre
 *               - celular
 *               - valor
 *               - Pedidos
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *       400:
 *         description: Error en los datos de la factura
 *       404:
 *         description: Factura no encontrada
 */
Frouter.put("/:id", verifyJWT, verifyRole(['Admin', 'Root']), updateFactura);

// 5. Eliminar una factura
/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura
 *     description: Permite eliminar una factura por su ID.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Factura eliminada exitosamente
 *       404:
 *         description: Factura no encontrada
 */
Frouter.delete("/:id", verifyJWT, verifyRole(['Admin', 'Root']), deleteFactura);

export default Frouter;
