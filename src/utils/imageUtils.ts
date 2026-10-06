const AIC_IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2';

export const getImageUrl = (imageId: string | null): string => {
  if (!imageId || imageId.startsWith('mock-')) {
    // Return a placeholder if no image exists or if using mock data as a fallback 
    return 'https://placehold.co/843x843/faf9f6/b50938?text=Image+Not+Available';
  }
  
  return `${AIC_IMAGE_BASE_URL}/${imageId}/full/843,/0/default.jpg`;
};