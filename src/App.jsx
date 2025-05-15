import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import UserDetailPage from './pages/UserDetailPage';
import SearchBar from './components/SearchBar';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    }), [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<SearchBar darkMode={darkMode}/>} />
          <Route path="/user/:username" element={<UserDetailPage darkMode={darkMode}/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
