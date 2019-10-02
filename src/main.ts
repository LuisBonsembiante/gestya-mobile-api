import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {middleware} from './middleware/app.middleware';
import {RedisIoAdapter} from './socket/adapters/redis-io.adapter';
import * as helmet from 'helmet';
import * as compression from 'compression';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
  );
  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.use(middleware);
  app.use(helmet());
  app.use(compression());

  // app.useGlobalGuards(new (AuthGuard('jwt'))(), new (AuthGuard('local'))());
  await app.listen(5001, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
