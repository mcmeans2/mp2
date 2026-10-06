import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArtworks } from '../../hooks/useArtworks';
import { getImageUrl } from '../../helpers/imageHelper';
import styles from './GalleryView.module.css';

export default function GalleryView() {
  const { artworks, loading, error } = useArtworks();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const departments = Array.from(
    new Set(artworks.map(art => art.department_title).filter(Boolean))
  ) as string[];

  const displayedArtworks = selectedFilter 
    ? artworks.filter(art => art.department_title === selectedFilter)
    : artworks;

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <button 
          className={selectedFilter === null ? styles.activeFilter : styles.filterBtn}
          onClick={() => setSelectedFilter(null)}
        >
          All Departments
        </button>
        {departments.map(dept => (
          <button 
            key={dept}
            className={selectedFilter === dept ? styles.activeFilter : styles.filterBtn}
            onClick={() => setSelectedFilter(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {displayedArtworks.map((art, index) => (
          <Link 
            key={art.id}
            to={`/artwork/${art.id}`} 
            state={{ currentIndex: index, currentList: displayedArtworks }}
            className={styles.card}
          >
            <img 
                src={getImageUrl(art.image_id)} 
                alt={art.title} 
                className={styles.thumbnail} 
                loading="lazy"
                onError={(e) => {
                // Fallback to the placeholder
                 e.currentTarget.src = 'https://placehold.co/843x843/faf9f6/b50938?text=Rights+Restricted';
                }}
              />   
            <div className={styles.overlay}>
              <p className={styles.title}>{art.title}</p>
            </div>
          </Link>
        ))}
      </div>
      {displayedArtworks.length === 0 && <p>No artworks found for this department.</p>}
    </div>
  );
}