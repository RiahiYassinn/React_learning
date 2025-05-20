import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Alert, Spinner ,Modal } from 'react-bootstrap';
import { getEventById, deleteEvent } from '../service/api';
const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        if (!response.data) {
          throw new Error('Event does not exist');
        }
        setEvent(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);
    const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEvent(id);
      navigate('/events', {
        state: { message: `Event "${event.name}" deleted successfully` }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };
  
    if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

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
          src={`/assets/${event.img}`} 
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
              <Button 
      variant="warning" 
      onClick={() => navigate(`/events/${event.id}/edit`)}
    >
      Modifier
    </Button>
                <Button 
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Event
            </Button>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{event.name}"? This action cannot be undone.
          {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default EventDetails;