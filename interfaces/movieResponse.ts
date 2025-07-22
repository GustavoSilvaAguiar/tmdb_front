import type IMovie from "./movieInterface";

export default interface IMovieResponse {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}