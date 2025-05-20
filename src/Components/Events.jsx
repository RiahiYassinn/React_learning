import React, { useState, useEffect } from 'react';
import Event from './Event';
import { Container, Row, Alert, Spinner } from 'react-bootstrap';
import { getAllEvents } from '../service/api';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState({
    name: '',
    description: '',
    img: '',
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      setEvents(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de cycle de vie - Montage du composant
  useEffect(() => {
    console.log('Component did mount');
    setShowWelcome(true);
    
    const timer = setTimeout(() => {
      setShowWelcome(false);
      console.log('Welcome message hidden after 3 seconds');
    }, 3000);

    return () => {
      console.log('Component will unmount');
      clearTimeout(timer);
    };
  }, []);

  // Fonction de cycle de vie - Mise à jour
  useEffect(() => {
    console.log('Component did update');
  });

  const buy = (eventId) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId && event.nbTickets > 0) {
          const updatedEvent = {
            ...event,
            nbParticipants: event.nbParticipants + 1,
            nbTickets: event.nbTickets - 1
          };
          
          setAlertMessage(`You have booked: ${event.name}`);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2000);
          
          return updatedEvent;
        }
        return event;
      })
    );
  };

  const toggleLike = (eventId) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId ? {...event, like: !event.like} : event
      )
    );
  };

    if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Événements</h1>

      {showWelcome && (
        <Alert variant="info" dismissible onClose={() => setShowWelcome(false)}>
          <Alert.Heading>Bienvenue sur notre plateforme d'événements!</Alert.Heading>
          <p>
            Découvrez les meilleurs événements culturels en Tunisie.
            Réservez vos billets dès maintenant!
          </p>
        </Alert>
      )}

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Row>
        {events.map(event => (
          <Event 
            key={event.id} 
            event={event} 
            onBuy={() => buy(event.id)}
            onToggleLike={() => toggleLike(event.id)}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Events;