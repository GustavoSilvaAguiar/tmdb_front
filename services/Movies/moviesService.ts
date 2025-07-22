import type IMovieResponse from "~/interfaces/movieResponse";

class MoviesService {
  public getMovieList = async (page: number = 1) => {
    const response = await useAPI<IMovieResponse>("/movie/popular", {
      params: { page },
    });
    return response.data;
  };

  public getTrendingMovies = async (page: number = 1) => {
    const response = await useAPI<IMovieResponse>("/trending/movie/day", {
      params: { page },
    });
    return response.data;
  };

  public getTopRatedMovies = async (page: number = 1) => {
    const response = await useAPI<IMovieResponse>("/movie/top_rated", {
      params: { page },
    });
    return response.data;
  };
}

export default new MoviesService();
