import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { BiPowerOff } from 'react-icons/bi';

export default function Logout() {

  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <Button onClick={handleClick}>  {/* Pass handleClick function to onClick */}
      <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%; /* Adjusted border-radius for circular shape */
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Added transition for smoother hover effect */
  &:hover {
    background-color: #7f6dfc; /* Darken the background color on hover */
  }
  svg {
    font-size: 2rem; /* Adjusted icon size */
    color: white;
  }
`;