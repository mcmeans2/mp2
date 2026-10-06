import { Routes, Route, Link } from 'react-router-dom';
import ListView from './components/ListView/ListView'
import GalleryView from './components/GalleryView/GalleryView';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Virtual Art Gallery</h1>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>List View</Link>
          <Link to="/gallery" className={styles.navLink}>Gallery View</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/" element={<GalleryView />} />
          <Route path="/artwork/:id" element={<div>Detail View Placeholder</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;