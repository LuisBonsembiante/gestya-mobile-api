import { Connection } from 'mongoose';
import { VehicleSchema } from '../schemas/vehicle.schema';


export const schemaProviders = [
    {
        provide: 'VEHICLE_MODEL',
        useFactory: (connection: Connection) => connection.model('vehicle', VehicleSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];