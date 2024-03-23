const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

r

module.exports = router;
