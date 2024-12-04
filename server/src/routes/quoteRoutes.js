import express from 'express';
import Quote from '../models/Quote.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.findAll();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cotações.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cotação.' });
  }
});

export default router;
