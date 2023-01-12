import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as functions from '@google-cloud/functions-framework';

const server = express(); // cloud function

async function bootstrap(expressInstance) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance), // cloud function
  );
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Enquete API')
    .setDescription('Sistema de enquetes')
    .setVersion('1.0')
    .addTag('Api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app.init(); // cloud function
}
bootstrap(server)
  .then((v) => {
    if (process.env.NODE_ENV === 'production') {
      console.log('🚀 Starting production server...');
    } else {
      console.log(`🚀 Starting development server...`);
      v.listen(process.env.PORT || 4000);
    }
  })
  .catch((err) => console.error('Nest broken', err));

functions.http('enquetesHttpFunction', server); // cloud function gen2
