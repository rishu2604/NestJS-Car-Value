import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
    // The purpose of this property is to make sure that incoming requests don't have extraneous properties in the body that we are not expecting.
    // So for example, inside of our createUserDTO, we had said that only the email and password properties should exist by adding in whitelist of true right there.
    // That's going to make sure that any additional properties that we send along with the request will be stripped out for us automatically.
  )
  await app.listen(3000);
}
bootstrap();
