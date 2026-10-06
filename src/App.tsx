import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Virtual Art Gallery</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<div>List/Gallery View Placeholder</div>} />
          <Route path="/artwork/:id" element={<div>Detail View Placeholder</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;