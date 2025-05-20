import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="text-center">
        <Card.Img variant="top" src="src/assets/notfound.jfif" />
        <Card.Body>
          <Card.Title>404 - Page Not Found</Card.Title>
          <Card.Text>
            La page que vous recherchez n'existe pas.
          </Card.Text>
          <Button variant="primary" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotFound;