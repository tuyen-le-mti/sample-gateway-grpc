import { Controller, Get, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MOVIE_SERVICE_NAME, MovieServiceClient } from '../protos/movie';
import { Metadata } from '@grpc/grpc-js';
import { MOVIE_PACKAGE } from 'src/modules/constants';

@Controller({ path: 'movie' })
export class MovieController {
  private movieService!: MovieServiceClient;
  constructor(
    @Inject(MOVIE_PACKAGE) private readonly clientService: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.movieService =
      this.clientService.getService<MovieServiceClient>(MOVIE_SERVICE_NAME);
  }

  @Get('/')
  getMovieList(): unknown {
    const request = { page: 1, limit: 10, searchTerm: 'abc' };

    const metadata = new Metadata();
    metadata.add('userId', 'test');

    return this.movieService.getMovieList(request, metadata);
  }
}
