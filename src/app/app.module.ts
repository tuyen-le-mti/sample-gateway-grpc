import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from 'src/modules/movie';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
