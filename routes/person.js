const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Crear una nueva persona
router.post('/', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todas las personas
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una persona por ID
router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).json({ message: 'Persona no encontrada' });
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una persona
router.put('/:id', async (req, res) => {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPerson) return res.status(404).json({ message: 'Persona no encontrada' });
        res.json(updatedPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una persona
router.delete('/:id', async (req, res) => {
    try {
        const deletedPerson = await Person.findByIdAndDelete(req.params.id);
        if (!deletedPerson) return res.status(404).json({ message: 'Persona no encontrada' });
        res.json({ message: 'Person deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
