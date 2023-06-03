import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Restau from './Restau';

export default function Form() {
  const [villes, setVilles] = useState([]);
  const [zones, setZones] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [restaus, setRestaus] = useState([]);
  const [selectedVille, setSelectedVille] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [btnFilter, setBtnFilter] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/ville/all')
      .then(response => response.json())
      .then(data => setVilles(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedVille) {
      fetch(`http://localhost:8080/api/zone/byVille/${selectedVille}`)
        .then(response => response.json())
        .then(data => setZones(data))
        .catch(error => console.log(error));
    } else {
      fetch('http://localhost:8080/api/zone/all')
        .then(response => response.json())
        .then(data => setZones(data))
        .catch(error => console.log(error));
    }
  }, [selectedVille]);

  useEffect(() => {
    if (selectedZone) {
      fetch(`http://localhost:8080/api/restau/specs/zone/${selectedZone}`)
        .then(response => response.json())
        .then(data => setSpecs(data))
        .catch(error => console.log(error));
    }
    fetch('http://localhost:8080/api/specialite/all')
      .then(response => response.json())
      .then(data => setSpecs(data))
      .catch(error => console.log(error));
  }, [selectedZone]);

  useEffect(() => {
    if (selectedZone && selectedSpec && btnFilter) {
      fetch(`http://localhost:8080/api/restau/zone/${selectedZone}/spec/${selectedSpec}`)
        .then(response => response.json())
        .then(data => setRestaus(data))
        .catch(error => console.log(error));
    } else {
      fetch('http://localhost:8080/api/restau/all')
        .then(response => response.json())
        .then(data => setRestaus(data))
        .catch(error => console.log(error));
    }
  }, [selectedZone, selectedSpec, btnFilter]);

  const handleVilleChange = event => {
    setSelectedVille(event.target.value);
  };

  const handleZoneChange = event => {
    setSelectedZone(event.target.value);
  };

  const handleSpecChange = event => {
    setSelectedSpec(event.target.value);
  };

  const handleBtnFilter = event => {
    event.preventDefault();
    setBtnFilter(true);
  };

  const handleBtnReset = () => {
    setSelectedVille('');
    setSelectedZone('');
    setSelectedSpec('');
    setBtnFilter(false);
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-center mt-5 vh-60">
          <form className="col-4">
            <div className="form-group mb-3">
              <label>Ville:</label>
              <select className="form-select" onChange={handleVilleChange}>
                <option value="">Toutes les villes</option>
                {villes.map(ville => (
                  <option key={ville.id} value={ville.id}>
                    {ville.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Zone:</label>
              <select className="form-select" onChange={handleZoneChange}>
                <option value="">Toutes les zones</option>
                {zones.map(zone => (
                  <option key={zone.id} value={zone.id}>
                    {zone.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Spécialité:</label>
              <select className="form-select" onChange={handleSpecChange}>
                <option value="">Toutes les spécialités</option>
                {specs.map(spec => (
                  <option key={spec.id} value={spec.id}>
                    {spec.nom}
                  </option>
                ))}
              </select>
            </div>
            <hr />
            <div className="form-group mb-3">
              <button className="btn btn-primary me-2" onClick={handleBtnFilter}>
                Filtrer
              </button>
              <button className="btn btn-secondary" onClick={handleBtnReset}>
                Réinitialiser
              </button>
            </div>
          </form>
        </div>
      </div>
      <Restau restaus={restaus}></Restau>
    </>
  );
}
