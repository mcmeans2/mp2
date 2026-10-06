import type { Artwork } from '../types';

export const processArtworks = (
  artworks: Artwork[],
  searchQuery: string,
  sortKey: 'title' | 'date_display',
  sortDirection: 'asc' | 'desc'
): Artwork[] => {
  // Filter
  let processed = artworks;
  if (searchQuery.trim() !== '') {
    const lowerQuery = searchQuery.toLowerCase();
    processed = processed.filter(art => 
      art.title.toLowerCase().includes(lowerQuery) || 
      (art.artist_display && art.artist_display.toLowerCase().includes(lowerQuery))
    );
  }

  // Sort
  processed.sort((a, b) => {
    const valA = (a[sortKey] || '').toLowerCase();
    const valB = (b[sortKey] || '').toLowerCase();
    
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return processed;
};