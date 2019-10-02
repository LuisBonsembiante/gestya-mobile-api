import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Vehicle } from 'src/interfaces/vehicle.interface';
import { VehicleDTO } from 'src/dtos/vehicle-dto';

@Injectable()
export class VehiclesService {
    constructor(
        @Inject('VEHICLE_MODEL') private readonly vehicleModel: Model<Vehicle>
    ) {

    }

    public async createOrUpdate(user: string, vehicle: VehicleDTO) {
        let query = { "nombre": vehicle.nombre };
        let update = vehicle;
        let options = { upsert: true, useFindAndModify: false };
        let model = await this.vehicleModel.findOneAndUpdate(query, update, options);
        return true;
    }

    public async createAll(vehicles: any[]) {
        if (vehicles != null || vehicles.length > 0) {
            this.vehicleModel.insertMany(vehicles);
        }
        return true;
    }

    public async getLastVehicles(userName: string, pagination: number, orderBy: string, countElements: number, filterType: string, filterValue: string): Promise<Vehicle[]> {
        pagination = (pagination == null || pagination <= 0) ? 1 : pagination;
        let orderByObject = {};
        orderByObject[orderBy == null ? "nombre" : orderBy] = 1;

        let query = {

        }
        return await this.vehicleModel.find(query).skip((pagination - 1) * countElements).limit(countElements * pagination).sort(orderByObject).exec();
    }
}
