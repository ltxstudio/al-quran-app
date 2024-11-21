import React, { useState, useEffect } from 'react';
import SurahList from './components/SurahList';
import SurahDetails from './components/SurahDetails';
import Bookmarks from './components/Bookmarks';
import Search from './components/Search';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Select,
  MenuItem,
  Grid,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';

const App = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [language, setLanguage] = useState('quran');
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [view, setView] = useState('home');

  useEffect(() => {
    import(`./data/${language}.json`)
      .then((data) => setSurahs(data.default))
      .catch((error) => console.error('Error loading Quran data:', error));
  }, [language]);

  const toggleBookmark = (ayah) => {
    setBookmarks((prev) =>
      prev.some((item) => item.number === ayah.number)
        ? prev.filter((item) => item.number !== ayah.number)
        : [...prev, ayah]
    );
  };

  return (
    <Box sx={{ bgcolor: darkMode ? 'grey.900' : 'grey.100', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="sticky" color="primary" sx={{ boxShadow: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Al-Quran App
          </Typography>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{
              color: '#fff',
              mr: 2,
              minWidth: 120,
              '& .MuiSelect-icon': { color: '#fff' },
            }}
          >
            <MenuItem value="quran">Arabic</MenuItem>
            <MenuItem value="quran_bn">Bengali</MenuItem>
            <MenuItem value="quran_en">English</MenuItem>
            <MenuItem value="quran_es">Spanish</MenuItem>
            <MenuItem value="quran_fr">French</MenuItem>
            <MenuItem value="quran_id">Indonesian</MenuItem>
            <MenuItem value="quran_ru">Russian</MenuItem>
            <MenuItem value="quran_sv">Swedish</MenuItem>
            <MenuItem value="quran_tr">Turkish</MenuItem>
            <MenuItem value="quran_ur">Urdu</MenuItem>
            <MenuItem value="quran_zh">Chinese</MenuItem>
          </Select>
          <IconButton color="inherit" onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <SurahList surahs={surahs} onSelectSurah={setSelectedSurah} />
          </Grid>
          <Grid item xs={12} md={8}>
            <SurahDetails surah={selectedSurah} toggleBookmark={toggleBookmark} />
          </Grid>
        </Grid>

        {view === 'bookmarks' && <Bookmarks bookmarks={bookmarks} />}
        {view === 'search' && <Search surahs={surahs} onSelectSurah={setSelectedSurah} />}
      </Container>

      <BottomNavigation
        value={view}
        onChange={(event, newValue) => setView(newValue)}
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: darkMode ? 'grey.800' : 'white',
          boxShadow: 3,
        }}
      >
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Bookmarks" value="bookmarks" icon={<BookmarkIcon />} />
        <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default App;
