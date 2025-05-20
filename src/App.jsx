import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavBar';
import LoadingSpinner from './Components/LoadingSpinner';
import './App.css';

const Events = lazy(() => import('./Components/Events'));
const EventDetails = lazy(() => import('./Components/EventDetails'));
const AddEvent = lazy(() => import('./Components/AddEvent'));
const NotFound = lazy(() => import('./Components/NotFound'));
const UpdateEvent = lazy(() => import('./Components/UpdateEvent'));

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/events/:id/edit" element={<UpdateEvent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;