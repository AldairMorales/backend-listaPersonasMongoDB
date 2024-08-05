const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    dni: { type: String, required: true },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true }
});

module.exports = mongoose.model('Person', PersonSchema);
