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
  padding: 0.3rem; /* Reduced padding for smaller size */
  border-radius: 50%; /* Adjusted border-radius for circular shape */
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Added transition for smoother hover effect */

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.4rem; /* Adjusted padding for medium screens */
  }

  @media screen and (max-width: 480px) {
    padding: 0.2rem; /* Further reduced padding for smaller screens */
  }

  &:hover {
    background-color: #7f6dfc; /* Darken the background color on hover */
  }

  svg {
    font-size: 1.5rem; /* Reduced icon size for smaller buttons */
    color: white;
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    svg {
      font-size: 1.8rem; /* Adjusted icon size for medium screens */
    }
  }

  @media screen and (max-width: 480px) {
    svg {
      font-size: 1.3rem; /* Further reduced icon size for smaller screens */
    }
  }
`;
