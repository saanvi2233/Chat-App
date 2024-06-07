import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import data from "@emoji-mart/data";
import Picker from 'emoji-picker-react';

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event) => {
    const sym = event.unified.split("-");
    const codeArray = [];
    sym.forEach((e1) => codeArray.push("0x" + e1));
    let emoji = String.fromCodePoint(...codeArray);
    setMsg(msg + emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
      {showEmojiPicker && (
        <div className="emoji-picker-wrapper">
          <Picker data={data} emojiButtonSize={30} onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </Container>
  );
}



const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 2rem;
  gap: 1rem;
  position: relative; /* Relative positioning for the container */

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
  }

  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    margin-top: 1rem; /* Adjusted margin top for spacing */

    input {
      width: 90%;
      height: 100%; /* Adjusted height to fill container */
      background-color: transparent;
      color: white;
      border: none;
      padding: 1rem;
      font-size: 1.6rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.5rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }

  .emoji-picker-wrapper {
    position: absolute;
    top: -450px;
    background-color: #080420;
    box-shadow: 0 5px 10px #9a86f3;
    border-color: #9a86f3;
    .emoji-scroll-wrapper::-webkit-scrollbar {
      background-color: #080420;
      width: 5px;

    .emoji-scroll-wrapper::-webkit-scrollbar {
      width: 5px;
      background-color: #080420;

      &-thumb {
        background-color: #9a86f3;
      }
    }

    .emoji-categories button {
      filter: contrast(0);
    }

    .emoji-search {
      background-color: transparent;
      border-color: #9a86f3;
    }

    .emoji-group:before {
      background-color: #080420;
    }
  }
`;