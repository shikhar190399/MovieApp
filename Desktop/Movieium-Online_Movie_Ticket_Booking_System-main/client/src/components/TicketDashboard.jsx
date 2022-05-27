import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

const TicketDashboard = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    movie: '',
    date: '',
    seats: '',
    ticket_price: '',
  });

  const fetchShowDetails = async () => {
    const response = await fetch(`${props.host}/api/movies/getshowdetails`, {
      method: 'POST',
      body: JSON.stringify({ showId: params.showId }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const jsonResponse = await response.json();

    setShow(jsonResponse);
  };

  useEffect(() => {
    if (!props.user.isLoggedIn) {
      navigate('/login');
    }
    fetchShowDetails();
  }, []);

  const successMessage = () => {
    alert('Success');
  };

  return (
    <div id="ticket-dashboard">
      <h2>Get Ticket</h2>
      <div id="show-details">
        <div>
          Movie: <span>{show.movie}</span>
        </div>
        <div>
          Time Slot:{' '}
          <select>
            <option>10 AM – 12 PM</option>
            <option>2 PM – 4 PM</option>
            <option>4 PM – 6 PM</option>
          </select>
        </div>
        <div>
          Seat No.:{' '}
          <select>
            {Array.from(new Array(60)).map((item, idx) => (
              <option>{idx + 1}</option>
            ))}
          </select>
        </div>
        <button id="pay-btn" onClick={successMessage}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TicketDashboard;
