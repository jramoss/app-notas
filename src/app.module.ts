import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration,databaseConfig],
      isGlobal: true,
      cache: true,

    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      applicationName: 'app-notas',
      logger: 'advanced-console',
      logging: ['error', 'warn', 'info'],

    }),
    UsersModule,
   ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
function Async(): import("@nestjs/typeorm").TypeOrmModuleOptions | undefined {
  throw new Error('Function not implemented.');
}

