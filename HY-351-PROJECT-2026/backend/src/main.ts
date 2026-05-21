import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session = require('express-session');

// entry point of app, confused me originally
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        sameSite: 'lax',
      }
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true // To allow cookies to pass across backend and frontend port
  });


  await app.listen(5000);
}
bootstrap();
