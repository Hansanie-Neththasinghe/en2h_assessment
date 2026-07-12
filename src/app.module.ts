import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Configure SQLite Database
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // Saves database in the project root
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Auto-load entities
      synchronize: true, // Auto-create tables (Only for development!)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
