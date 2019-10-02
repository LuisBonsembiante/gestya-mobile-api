import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
    nombre: String,
    alias: String,
    patente: String,
    gps: Number,
    latitud: String,
    longitud: String,
    fecha: String,
    sentido: Number,
    velocidad: Number,
    evento: Number,
    temperatura1: Number,
    temperatura2: Number,
    chofer: String,
    fecha_comunicacion: String,
    bateria1: String,
    bateria2: String,
    sensor1: Number,
    sensor2: Number,
    sensor3: Number,
    calidad_senial: String,
    odometro: Number,
    evento_description: String,
    poul_evento_description: String,
    ignicion: String
},{ strict: false });