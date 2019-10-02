import { Document } from 'mongoose';

export interface Vehicle extends Document {
    readonly nombre: String;
    readonly alias: String;
    readonly patente: String;
    readonly gps: Number;
    readonly latitud: String;
    readonly longitud: String;
    readonly fecha: String;
    readonly sentido: Number;
    readonly velocidad: Number;
    readonly evento: Number;
    readonly temperatura1: Number;
    readonly temperatura2: Number;
    readonly chofer: String;
    readonly fecha_comunicacion: String;
    readonly bateria1: String;
    readonly bateria2: String;
    readonly sensor1: Number;
    readonly sensor2: Number;
    readonly sensor3: Number;
    readonly calidad_senial: String;
    readonly odometro: Number;
    readonly evento_description: String;
    readonly poul_evento_description: String;
    readonly ignicion: String
}