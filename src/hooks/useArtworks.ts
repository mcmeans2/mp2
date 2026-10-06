import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Artwork, ArtworksResponse } from '../types';

// Hardcoded data in case of API failure or rate limiting 
const MOCK_DATA: Artwork[] = [
  {
    id: 27992,
    title: "A Sunday on La Grande Jatte — 1884",
    artist_display: "Georges Seurat",
    image_id: "mock-image-id-1", 
    department_title: "Painting and Sculpture",
    date_display: "1884/86",
    is_public_domain: true,
  },
  {
    id: 111628,
    title: "Nighthawks",
    artist_display: "Edward Hopper",
    image_id: "mock-image-id-2",
    department_title: "Arts of the Americas",
    date_display: "1942",
    is_public_domain: true,
  }
];

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        // Fetching 100 artworks 
        const response = await axios.get<ArtworksResponse>(
        'https://api.artic.edu/api/v1/artworks?limit=100&fields=id,title,artist_display,image_id,department_title,date_display,is_public_domain'
        );
        // Filter out artworks restricted by copyright
        const publicArtworks = response.data.data.filter(art => art.is_public_domain);
        setArtworks(publicArtworks);

        setError(null);
      } catch (err) {
        console.error("API fetch failed.", err);
        setArtworks(MOCK_DATA);
        setError("Unable to connect to the Art Institute API. Displaying mock data.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return { artworks, loading, error };
};