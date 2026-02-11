import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }));
  
 // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Sistema Fiscal API')
    .setDescription('API para gerenciamento de documentos fiscais')
    .setVersion('1.0.2')
    .addBasicAuth({ type: 'http', scheme: 'basic' }, 'basic')
    .addSecurityRequirements('basic')
    .setContact('Suporte', 'https://lanjr.com.br/support', 'support@lanjr.com.br')
    .setDescription('API para gerenciamento de documentos fiscais, incluindo funcionalidades de cadastro, consulta e geração de relatórios.')
    .addTag('Documentos Fiscais', 'Operações relacionadas a documentos fiscais')
    .setOpenAPIVersion('3.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')

    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
