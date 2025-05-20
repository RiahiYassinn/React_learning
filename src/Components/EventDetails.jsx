import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

const EventDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;

  if (!event) {
    return (
      <Container className="mt-4">
        <h2>Événement non trouvé</h2>
        <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img 
          variant="top" 
          src={`src/assets/${event.img}`} 
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>{event.description}</Card.Text>
          <div className="d-flex justify-content-between mb-3">
            <span>Prix: ${event.price}</span>
            <span>Billets disponibles: {event.nbTickets}</span>
            <span>Participants: {event.nbParticipants}</span>
          </div>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Retour
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EventDetails;