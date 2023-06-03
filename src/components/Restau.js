import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Restau(props) {
  return (
    <div className='d-flex justify-content-center'>
      <Row className='col-4'>
        {props.restaus.map(restau => (
          <Col key={restau.id} className='col-6'>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{restau.nom}</Card.Title>
                <div>
                  {restau.ville && <div>Ville: {restau.ville.nom}</div>}
                  {restau.zone && <div>Zone: {restau.zone.nom}</div>}
                </div>
                <div>
                  <div>Spécialités:</div>
                  <ul>
                    {restau.specialites.map(specialite => (
                      <li key={specialite.id}>{specialite.nom}</li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

