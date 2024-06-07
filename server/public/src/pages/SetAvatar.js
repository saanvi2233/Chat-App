import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";

  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  // useeffect taki vo ek bar run ho
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      
      if (!user) {
        toast.error("User not found in local storage", toastOptions);
        return;
      }
  
      try {
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
  
        console.log(data);
  
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
  
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));
  
          navigate("/"); 
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      } catch (error) {
        console.error("Error setting avatar:", error);
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };
  
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = Buffer.from(response.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching avatars. Please try again.", toastOptions);
        setIsLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  return (
    <>
    
      <Container>
        {isLoading ? (
          <img src={loader} alt="loader" className="loader" />
        ) : (
          <div className="content">
            <div className="title-container">
              <h1>Pick an Avatar as Profile Picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                </div>
              ))}
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>
              Set as Profile Picture
            </button>
          </div>
        )}
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #131324;

  .loader {
    max-width: 100%;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #997af0;
    }
  }
`;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { setAvatarRoute } from "../utils/APIRoutes";
// import { Buffer } from "buffer";

// export default function SetAvatar() {
//   const api = "https://api.multiavatar.com/45678945";

//   const navigate = useNavigate();

//   const [avatars, setAvatars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined);

//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   const setProfilePicture = async () => {
//     if (selectedAvatar === undefined) {
//       toast.error("Please select an avatar", toastOptions);
//     } else {
//       const user = JSON.parse(localStorage.getItem("chat-app-user"));
      
//       if (!user) {
//         toast.error("User not found in local storage", toastOptions);
//         return;
//       }

//       try {
//         const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
//           image: avatars[selectedAvatar],
//         });

//         console.log(data);

//         if (data.isSet) {
//           user.isAvatarImageSet = true;
//           user.avatarImage = data.image;

//           localStorage.setItem("chat-app-user", JSON.stringify(user));

//           navigate("/"); // Replace with your actual route
//         } else {
//           toast.error("Error setting avatar. Please try again.", toastOptions);
//         }
//       } catch (error) {
//         console.error("Error setting avatar:", error);
//         toast.error("Error setting avatar. Please try again.", toastOptions);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchAvatars = async () => {
//       const cachedAvatars = JSON.parse(localStorage.getItem("cached-avatars")) || [];
//       if (cachedAvatars.length >= 4) {
//         setAvatars(cachedAvatars);
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const data = [];
//         for (let i = 0; i < 4; i++) {
//           const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
//           const buffer = Buffer.from(response.data);
//           data.push(buffer.toString("base64"));
//         }

//         setAvatars(data);
//         setIsLoading(false);

//         // Cache the avatars in localStorage
//         localStorage.setItem("cached-avatars", JSON.stringify(data));
//       } catch (error) {
//         console.error("Error fetching avatars:", error);
//         toast.error("Error fetching avatars. Please try again.", toastOptions);
//         setIsLoading(false);
//       }
//     };

//     fetchAvatars();
//   }, []);

//   return (
//     <>
//       <Container>
//         {isLoading ? (
//           <img src={loader} alt="loader" className="loader" />
//         ) : (
//           <div className="content">
//             <div className="title-container">
//               <h1>Pick an Avatar as Profile Picture</h1>
//             </div>
//             <div className="avatars">
//               {avatars.map((avatar, index) => (
//                 <div
//                   key={index}
//                   className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
//                   onClick={() => setSelectedAvatar(index)}
//                 >
//                   <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
//                 </div>
//               ))}
//             </div>
//             <button className="submit-btn" onClick={setProfilePicture}>
//               Set as Profile Picture
//             </button>
//           </div>
//         )}
//       </Container>
//       <ToastContainer />
//     </>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   height: 100vh;
//   width: 100vw;
//   background-color: #131324;

//   .loader {
//     max-width: 100%;
//   }

//   .content {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     gap: 3rem;
//   }

//   .title-container {
//     h1 {
//       color: white;
//     }
//   }

//   .avatars {
//     display: flex;
//     gap: 2rem;

//     .avatar {
//       border: 0.4rem solid transparent;
//       padding: 0.4rem;
//       border-radius: 5rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       transition: 0.5s ease-in-out;

//       img {
//         height: 6rem;
//         transition: 0.5s ease-in-out;
//       }
//     }

//     .selected {
//       border: 0.4rem solid #4e0eff;
//     }
//   }

//   .submit-btn {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     transition: 0.5s ease-in-out;

//     &:hover {
//       background-color: #997af0;
//     }
//   }
// `;
