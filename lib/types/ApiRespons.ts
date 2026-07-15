export interface PaginatedResponse<T> {
  totalArtworks: number;
  size: number;
  page: number;
  result: T[];
}