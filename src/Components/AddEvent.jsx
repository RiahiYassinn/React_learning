import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { addEvent } from '../service/api';
import { useNavigate } from 'react-router-dom';
import eventSchema from '../schemas/eventSchema';

const AddEvent = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    img: '',
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'nbTickets' || name === 'nbParticipants' 
        ? Number(value) 
        : value
    }));
  };

  const validateForm = () => {
    try {
      eventSchema.parse(event);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.errors.forEach(err => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await addEvent(event);
      navigate('/events');
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Ajouter un événement</h2>
      
      {serverError && <Alert variant="danger">{serverError}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom de l'événement</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={event.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
                    <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image (nom du fichier)</Form.Label>
          <Form.Control
            type="file"
            name="img"
            value={event.img}
            onChange={handleChange}
            isInvalid={!!errors.img}
          />
                    <Form.Control.Feedback type="invalid">
            {errors.img}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prix</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={event.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
          />
                    <Form.Control.Feedback type="invalid">
            {errors.price}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre de tickets</Form.Label>
          <Form.Control
            type="number"
            name="nbTickets"
            value={event.nbTickets}
            onChange={handleChange}
            isInvalid={!!errors.nbTickets}
          />
                    <Form.Control.Feedback type="invalid">
            {errors.nbTickets}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">
            Ajouter l'événement
          </Button>
          <Button variant="secondary" onClick={() => navigate('/events')}>
            Annuler
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddEvent;