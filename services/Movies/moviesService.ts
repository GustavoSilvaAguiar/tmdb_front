import type IMovieResponse from "~/interfaces/movieResponse";

class MoviesService {
  public getMovieList = async (page: number = 1) => {
    const response = await useAPI<IMovieResponse>("/movie/popular", {
      params: { page },
    });
    return response.data;
  };
}

export default new MoviesService();
