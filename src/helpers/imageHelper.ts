export const getImageUrl = (imageId: string | null): string => {
  if (!imageId || imageId.startsWith('mock-')) {
    return 'https://placehold.co/843x843/faf9f6/b50938?text=Image+Unavailable';
  }
  
  return `${import.meta.env.BASE_URL}artworks/${imageId}.jpg`;
};