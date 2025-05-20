import React from 'react';
import { Card, Col, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Event = ({ event, onBuy, onToggleLike }) => {
    const navigate = useNavigate();

  const handleEventClick = () => {
    navigate(`/events/${event.id}`, { state: { event } });
  };
  return (
    <Col md={6} lg={4} className="mb-4">
      <Card className="h-100">
        <Card.Img 
          variant="top" 
          src={event.nbTickets > 0 ? `src/assets/${event.img}` : 'src/assets/sold_out.png'} 
          alt={event.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title 
            onClick={handleEventClick}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {event.name}
          </Card.Title>
          <Card.Text className="text-muted">{event.description}</Card.Text>
          
          <div className="d-flex justify-content-between mb-2">
            <Badge bg="info">${event.price}</Badge>
            <Badge bg={event.nbTickets > 0 ? "success" : "danger"}>
              {event.nbTickets > 0 ? `${event.nbTickets} tickets` : 'Sold Out'}
            </Badge>
          </div>
          
          <div className="mb-3">
            <small className="text-muted">
              Participants: {event.nbParticipants}
            </small>
          </div>
          
          <div className="d-flex gap-2 mt-auto">
            <Button
              variant={event.like ? "danger" : "outline-primary"}
              onClick={onToggleLike}
            >
              {event.like ? 'Dislike' : 'Like'}
            </Button>
            
            <Button 
              variant="primary" 
              onClick={onBuy}
              disabled={event.nbTickets <= 0}
              className="flex-grow-1"
            >
              {event.nbTickets > 0 ? "Book an event" : "Sold Out"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Event;