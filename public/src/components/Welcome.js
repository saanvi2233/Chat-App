import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
  // Check if currentUser exists before accessing its properties
  if (!currentUser) {
    // If currentUser is undefined or null, display a loading message or return null
    return null;
  }

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 1rem;

  img {
    height: 15rem; /* Reduced image height */
    max-width: 100%;
    margin-bottom: 1.5rem; /* Reduced margin */
  }

  h1 {
    margin: 0.8rem 0; /* Reduced margins for headings */
    font-size: 2rem; /* Reduced font size for h1 */
  }

  h3 {
    margin: 0.4rem 0; /* Reduced margins for h3 */
    font-size: 1.2rem; /* Reduced font size for h3 */
  }

  span {
    color: #4e0eff;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    img {
      height: 12rem; /* Further reduced image height for smaller screens */
    }

    h1 {
      font-size: 1.8rem; /* Adjusted font size for h1 */
    }

    h3 {
      font-size: 1rem; /* Adjusted font size for h3 */
    }
  }

  @media screen and (max-width: 480px) {
    img {
      height: 10rem; /* Further reduced image height for even smaller screens */
    }

    h1 {
      font-size: 1.5rem; /* Further reduced font size for h1 */
    }

    h3 {
      font-size: 0.8rem; /* Further reduced font size for h3 */
    }
  }
`;