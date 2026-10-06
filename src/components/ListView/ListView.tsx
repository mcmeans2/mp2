import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArtworks } from '../../hooks/useArtworks';
import { processArtworks } from '../../helpers/listHelper';
import { getImageUrl } from '../../helpers/imageHelper';
import styles from './ListView.module.css';

export default function ListView() {
  const { artworks, loading, error } = useArtworks();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<'title' | 'date_display'>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  if (loading) return <div>Loading exhibition...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const displayedArtworks = processArtworks(artworks, searchQuery, sortKey, sortDirection);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input 
          type="text" 
          placeholder="Search by title or artist..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        
        <select 
          value={sortKey} 
          onChange={(e) => setSortKey(e.target.value as 'title' | 'date_display')}
          className={styles.selectInput}
        >
          <option value="title">Sort by Title</option>
          <option value="date_display">Sort by Date</option>
        </select>

        <select 
          value={sortDirection} 
          onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
          className={styles.selectInput}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul className={styles.list}>
        {displayedArtworks.map((art, index) => (
          <li key={art.id} className={styles.listItem}>
            <Link 
              to={`/artwork/${art.id}`} 
              state={{ currentIndex: index, currentList: displayedArtworks }}
              className={styles.link}
            >
              <img 
                src={getImageUrl(art.image_id)} 
                alt={art.title} 
                className={styles.thumbnail} 
                loading="lazy"
                onError={(e) => {
                // Fallback to the placeholder
                 e.currentTarget.src = 'https://placehold.co/843x843/faf9f6/b50938?text=Image+Unavailable';
                }}
              />   
              <div className={styles.details}>
                <h2>{art.title}</h2>
                <p>{art.artist_display}</p>
                <small>{art.date_display}</small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {displayedArtworks.length === 0 && <p>No artworks match your criteria.</p>}
    </div>
  );
}