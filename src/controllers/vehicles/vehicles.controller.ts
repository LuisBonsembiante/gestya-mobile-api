import { Body, Controller, Post, Put } from '@nestjs/common';
import { PaginatorDTO } from 'src/dtos/paginator';
import { VehiclesService } from 'src/services/vehicles/vehicles.service';
import { VehicleDTO } from 'src/dtos/vehicle-dto';

@Controller('vehicles')
export class VehiclesController {
    constructor(
        private vehiclesService: VehiclesService
    ){

    }
    @Put("createOrUpdate")
    public createOrUpdateVehicle(@Body() vehicleDTO: VehicleDTO){
        this.vehiclesService.createOrUpdate("asdf",vehicleDTO);
        return {"message": "ok"};
    }

    @Post("createAll")
    public createAll(@Body() vehicles: any[]){
        this.vehiclesService.createAll(vehicles);
        return {"message": "ok"};
    }

    @Post("last")
    public lastVehicles(@Body() paginator: PaginatorDTO){
        paginator = !(paginator)? new PaginatorDTO(): paginator;
        let result = this.vehiclesService.getLastVehicles("test",paginator.page,paginator.orderBy,paginator.count,paginator.filterType,paginator.filterValue);
        return result;
    }
}
