const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/products', async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            }
        });
        res.json(products);

    }
    catch (error){
        next(error);
    }
});


router.get('/products/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const productId = parseInt(id);
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                category: true
            }
        });

        console.log(product)
        res.json(product);

    }
    catch (error){
        next(error);
    }
});

router.post('/products', async (req, res, next) => {
    try {
        const { name, categoryId } = req.body;

        const newProduct = await prisma.product.create({
            data: {
                name,
                categoryId,
            },
        });

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

router.delete('/products/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const productId = parseInt(id);
        const product = await prisma.product.delete({
            where: {
                id: productId
            }
        });

        console.log(product)
        res.json(product);

    }
    catch (error){
        next(error);
    }
});

router.put('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, categoryId } = req.body;
        const productId = parseInt(id);
        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name,
                categoryId
            }
        });
        console.log(product)
        res.json(product);
    }
    catch (error){
        next(error);
    }
});

module.exports = router;