import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';
// import { CookieSession } from 'cookie-session';
// const cookieSession = require('cookie-session')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // setupApp(app);

  // app.use(cookieSession({
  //   keys: ['abcdefg']
  // }))
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true
  //   })
  // )
  await app.listen(3012);
}
bootstrap();
