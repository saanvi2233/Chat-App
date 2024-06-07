import React from 'react';
import styled from 'styled-components';

export default function Message() {
  return (
    <Container>
      {/* Example messages */}
      <MessageContent>
        <p>Message 1</p>
        <p>Message 2</p>
        <p>Message 3</p>
        <p>Message 4</p>
        <p>Message 5</p>
        <p>Message 6</p>
        <p>Message 7</p>
        <p>Message 8</p>
        <p>Message 9</p>
        <p>Message 10</p>
      </MessageContent>
    </Container>
  );
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #333;
  font-size: 2rem;
  overflow-y: auto; /* Make the container scrollable vertically */
`;

const MessageContent = styled.div`
  width: 80%; /* Adjusted width */
  max-height: 100%; /* Ensures the content doesn't overflow */
  overflow-y: auto; /* Enable vertical scrolling within the content */
`;
