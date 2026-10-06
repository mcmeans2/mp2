import { useLocation, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../helpers/imageHelper';
import type { Artwork } from '../../types';
import styles from './DetailView.module.css';

interface LocationState {
  currentIndex: number;
  currentList: Artwork[];
}

export default function DetailView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state as LocationState;

  if (!state || !state.currentList) {
    return (
      <div className={styles.container}>
        <p>Artwork not found. Please return to the gallery.</p>
        <button onClick={() => navigate('/')} className={styles.navBtn}>Back to Gallery</button>
      </div>
    );
  }

  const { currentIndex, currentList } = state;
  const artwork = currentList[currentIndex];

  // Pagination 
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < currentList.length - 1;

  const handleNavigate = (newIndex: number) => {
    const nextArtwork = currentList[newIndex];
    navigate(`/artwork/${nextArtwork.id}`, {
      state: { currentIndex: newIndex, currentList }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img 
          src={getImageUrl(artwork.image_id)} 
          alt={artwork.title} 
          className={styles.image} 
          onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/843x843/faf9f6/b50938?text=Image+Unavailable';
          }}
        />
      </div>
      
      <div className={styles.details}>
        <h2>{artwork.title}</h2>
        <h3>{artwork.artist_display}</h3>
        <p><strong>Date:</strong> {artwork.date_display}</p>
        <p><strong>Department:</strong> {artwork.department_title || 'Uncategorized'}</p>
        
        <div className={styles.pagination}>
          <button 
            onClick={() => handleNavigate(currentIndex - 1)} 
            disabled={!hasPrev}
            className={styles.navBtn}
          >
            &larr; Previous
          </button>
          <button 
            onClick={() => handleNavigate(currentIndex + 1)} 
            disabled={!hasNext}
            className={styles.navBtn}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}