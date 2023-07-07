/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "movie";

export interface Empty {
}

export interface MovieListRequest {
  page: number;
  limit: number;
  searchTerm?: string | undefined;
}

export interface MovieListResponse {
  pagination: PaginationResponse | undefined;
  items: MovieInfo[];
}

export interface PaginationResponse {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
}

export interface MovieInfo {
  name: string;
  coverUrl: string;
}

export const MOVIE_PACKAGE_NAME = "movie";

export interface MovieServiceClient {
  getMovieList(request: MovieListRequest, metadata?: Metadata): Observable<MovieListResponse>;
}

export interface MovieServiceController {
  getMovieList(
    request: MovieListRequest,
    metadata?: Metadata,
  ): Promise<MovieListResponse> | Observable<MovieListResponse> | MovieListResponse;
}

export function MovieServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getMovieList"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MovieService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MovieService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MOVIE_SERVICE_NAME = "MovieService";
