import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavBar';
import LoadingSpinner from './Components/LoadingSpinner'; // Composant de chargement
import './App.css';

// Chargement paresseux des composants
const Events = lazy(() => import('./Components/Events'));
const EventDetails = lazy(() => import('./Components/EventDetails'));
const NotFound = lazy(() => import('./Components/NotFound'));

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventName" element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;