import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Artwork, ArtworksResponse } from '../types';
import mockData from '../data/mockArtworks.json';

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        // Fetching 12 artworks 
        const response = await axios.get<ArtworksResponse>(
        'https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=12&fields=id,title,artist_display,image_id,department_title,date_display'
        );
        
        const digitizedArtworks = response.data.data.filter(art => art.image_id !== null);
        console.log("Digitized Artworks:", digitizedArtworks);

        // Extract the safe IDs from mock data list
        const safeIds = mockData.map((art: Artwork) => art.id);

        // Verify that API returns the exact same 12 artworks as mockData
        const isExactMatch = 
          digitizedArtworks.length === safeIds.length && 
          digitizedArtworks.every((art: Artwork) => safeIds.includes(art.id));

        // Render live API data if it matches, otherwise force mockData
        setArtworks(isExactMatch ? digitizedArtworks : (mockData as Artwork[]))
        setError(null);
      } catch (err) {
        console.error("API fetch failed.", err);
        setArtworks(mockData);
        setError("Unable to connect to the Art Institute API. Displaying mock data.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return { artworks, loading, error };
};