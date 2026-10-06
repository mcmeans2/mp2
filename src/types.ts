export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  image_id: string | null;
  department_title: string | null;
  date_display: string;
  is_public_domain: boolean; // Only return public domain artworks because of image copyrights 
}

export interface ArtworksResponse {
  data: Artwork[];
}