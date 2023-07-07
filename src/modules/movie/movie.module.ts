import { Module } from '@nestjs/common';
import { MovieController } from './controllers';
import { join } from 'path';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MOVIE_PACKAGE } from '../constants';
import { MOVIE_PACKAGE_NAME } from './protos/movie';

@Module({
  imports: [ConfigModule],
  controllers: [MovieController],
  providers: [
    {
      provide: MOVIE_PACKAGE,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: MOVIE_PACKAGE_NAME,
            protoPath: [join(__dirname, './protos/movie.proto')],
            url: configService.get('MOVIE_API_GRPC_URL'),
            loader: {
              defaults: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class MovieModule {}
