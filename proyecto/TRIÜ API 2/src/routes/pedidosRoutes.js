import express from "express";
import { createPedido, getPedido, getPedidoEs, updatePedido, deletePedido } from "../controllers/pedidoController.js";
import { verifyJWT , verifyRole } from "../middleware/authMiddleware.js";
const rounter = express.Router();

// 1. Crear pedido
/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: Permite crear un nuevo pedido.
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos del pedido
 */
rounter.post("/", verifyJWT, verifyRole(['Mesero','Admin', 'Root']), createPedido);

// 2. Obtener todos los pedidos
/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     description: Devuelve todos los pedidos realizados.
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
rounter.get("/", verifyJWT, verifyRole(['Mesero','Admin', 'Root']), getPedido);

// 3. Obtener un pedido por ID
/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     description: Devuelve los detalles de un pedido específico usando su ID.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido no encontrado
 */
rounter.get("/:id", verifyJWT, verifyRole(['Mesero','Admin', 'Root']), getPedidoEs);

// 4. Actualizar un pedido
/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Actualizar un pedido existente
 *     description: Permite actualizar los datos de un pedido existente.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido que se desea actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *       400:
 *         description: Error en los datos del pedido
 *       404:
 *         description: Pedido no encontrado
 */
rounter.put("/:id", verifyJWT, verifyRole(['Admin', 'Root']), updatePedido);

// 5. Eliminar un pedido
/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     description: Permite eliminar un pedido por su ID.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido eliminado exitosamente
 *       404:
 *         description: Pedido no encontrado
 */
rounter.delete("/:id", verifyJWT, verifyRole(['Admin', 'Root']), deletePedido);

export default rounter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del pedido
 *         hora:
 *           type: string
 *           description: Hora del pedido
 *         total:
 *           type: number
 *           format: float
 *           description: Valor total del pedido
 *         Descripcion:
 *           type: string
 *           description: Descripción del pedido
 *         estado:
 *           type: string
 *           enum: ["Activo", "inactivo"]
 *           description: Estado del pedido
 *           default: "Activo"
 *       required:
 *         - fecha
 *         - hora
 *         - total
 *         - Descripcion
 */
