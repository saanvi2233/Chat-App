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
    height: 20rem;
    max-width: 100%;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 1rem 0;
    font-size: 2.5rem;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }

  span {
    color: #4e0eff;
    font-weight: bold;
  }
`;