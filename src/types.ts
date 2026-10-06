export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  image_id: string | null;
  department_title: string | null;
  date_display: string;
}

export interface ArtworksResponse {
  data: Artwork[];
}