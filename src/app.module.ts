import {CacheInterceptor, CacheModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersService} from './users/users.service';
import {AuthController} from './auth/auth.controller';
import {UsersModule} from './users/users.module';
import {EventsModule} from './socket/events/events.module';
import {AuthModule} from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import {APP_INTERCEPTOR} from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { schemaProviders } from './providers/schema.provider';
import { VehiclesController } from './controllers/vehicles/vehicles.controller';
import { VehiclesService } from './services/vehicles/vehicles.service';

@Module({
  imports: [EventsModule, AuthModule, UsersModule,

    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 3600, // seconds
      max: 100, // maximum number of items in cache
    }),
    DatabaseModule
  ],
  controllers: [AppController, AuthController, VehiclesController],
  providers: [AppService, UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    ...schemaProviders,
    VehiclesService
  ],
  exports: [],
})
export class AppModule {}
