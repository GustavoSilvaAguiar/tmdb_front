import type { IMovieDetail } from "~/interfaces/movieInterface";
import type IMovieResponse from "~/interfaces/movieResponse";

class MoviesService {
  public getMovieList = async (page: number = 1) => {
    const response = await useAPI<IMovieResponse>("/movie/popular", {
      params: { page },
    });
    return response.data.value;
  };

  public getTrendingMovies = async (page: number = 1) => {
    const response = await useAPI<IMovieResponse>("/trending/movie/day", {
      params: { page },
    });
    return response.data.value;
  };

  public getTopRatedMovies = async (page: number = 1) => {
    const response = await useAPI<IMovieResponse>("/movie/top_rated", {
      params: { page },
    });
    return response.data.value;
  };

  public getMovieDetails = async (id: number) => {
    const response = await useAPI<IMovieDetail>(`/movie/${id}`);
    return response.data.value;
  };

  public getSimilarMovies = async (id: number) => {
    const response = await useAPI<IMovieResponse>(`/movie/${id}/similar`);

    return response.data.value;
  };

  public getDiscoverMovie = async (filters: {
    page: number;
    with_genres?: number;
  }) => {
    const response = await useAPI<IMovieResponse>("/discover/movie", {
      params: { ...filters },
    });

    return response.data.value;
  };
}

export default new MoviesService();
