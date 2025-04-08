const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Rota para criar um novo filme
router.post('/filme', async (req, res) => {
    const { nome, genero, ano, avaliacao } = req.body;

    // salvar o filme
    const filme = await prisma.filme.create({
        data: { nome, genero, ano, avaliacao}, });

    return res.status(201).json(filme);
});


// Rota para listar todos os filmes
router.get('/filmes', async (req, res) => {
    const filmes = await prisma.filme.findMany();
    return res.json(filmes);
});


// Atualizar um filme existente
router.put('/filme/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, genero, ano, avaliacao } = req.body;
    
    // atualizar o filme
    const filme = await prisma.filme.update({
        where: { id: Number(id) },
        data: { nome, genero, ano, avaliacao}, });
    
    return res.json(filme);
});

// Deletar um filme existente
router.delete('/filme/:id', async (req, res) => {
    const { id } = req.params;
    
    // deletar o filme
    await prisma.filme.delete({
        where: { id: Number(id) },
    });
    
    return res.status(204).send();
});

// listar filmes por gênero
router.get('/filmes/genero/:genero', async (req, res) => {
    const { genero } = req.params;
    
    // buscar filmes com o gênero informado
    const filmes = await prisma.filme.findMany({
        where: { genero },
    });
    
    return res.json(filmes);
});

// Rota para buscar um filme com avaliação maior que um valor informado
router.get('/filmes/avaliacao/:avaliacao', async (req, res) => {
    const { avaliacao } = req.params;
    
    // buscar filmes com avaliação maior que o valor informado
    const filmes = await prisma.filme.findMany({
        where: { avaliacao: { gt: Number(avaliacao) } },
    });
    
    return res.json(filmes);
});