import {CacheInterceptor, CacheKey, Controller, Get, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('vehicles')
  @CacheKey('vehicles')
  @UseInterceptors(CacheInterceptor)
  async getHello(): Promise<string> {

    const instance = axios.create({
      baseURL: 'https://test.gestya.com/api/',
      proxy: false,
      auth : {
        username: 'ehc1',
        password: 'gestya1',
      },
    });

    const result = await instance.post('wservicedev.jss', {
      action: 'DATOSACTUALES',
      user: 'ehc1',
      pwd: 'gestya1',
      output: [
        'la',
        'lo',
        'fp',
        'se',
        've',
        'ev',
        't1',
        't2',
        'ch',
        'fc',
        'es',
        'b1',
        'b2',
        's1',
        's2',
        's3',
        'cs',
        'od',
        'ed',
        'em',
      ],
    });

    if (result.data) {
    return  result.data;
    }
  }
}
