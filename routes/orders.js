const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create an order
router.post('/create', async (req, res) => {
  const { userId, products } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        products,
      },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving orders' });
  }
});

// Get an order by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({ where: { id } });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving order' });
  }
});

// Update an order
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, products } = req.body;
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { userId, products },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.delete({ where: { id } });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;
