import {useEffect} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {Home} from './pages/Home/Home';
import {VehicleDetails} from './pages/VehicleDetails/VehicleDetails';
import {useLocalStorage} from './hooks/useLocalStorage';
import styles from './App.module.scss';

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>
            Car Showroom
          </Link>
          <button onClick={toggleTheme} className={styles.themeButton}>
            {theme === 'light' ? 'Toggle to dark' : 'Toggle to light'}
          </button>
        </div>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;