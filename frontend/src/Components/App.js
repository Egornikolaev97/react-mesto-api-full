import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from "./ImagePopup";
import avatarPreloader from "../images/avatarka.jpg";
import api from "../utils/Api.js";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import BurgerMenu from "./BurgerMenu";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const App = () => {
  const navigate = useNavigate();
  //states variables of components
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [isBurgerMenuOpen, setIsBurgerMenu] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState([]);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = React.useState({
    name: "Загрузка",
    about: "...",
    avatar: avatarPreloader,
  });

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, userCard]) => {
          setCurrentUser(userData);
          setCards(userCard);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.email) {
            setLoggedIn(true);
            setUserEmail(res.email);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleRegister = (email, password) => {
    auth
      .register({ email, password })
      .then((data) => {
        if (data.email) {
          localStorage.setItem("jwt", data.token);
          setUserEmail(email);
        }
        setIsSuccess(true);
        setIsInfoToolTipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoToolTipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        setLoggedIn(true);
        setUserEmail(email);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoToolTipOpen(true);
        setIsSuccess(false);
      });
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
    setIsBurgerMenu(false);
  };

  const handleBurgerClick = () => {
    if (loggedIn) {
      setIsBurgerMenu(!isBurgerMenuOpen);
    }
  };

  //functions for openning popups
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const confirmCardDelete = (card) => {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  };

  //function for setting like to card
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .toggleLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  //function for deleting card
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //function for editing user info
  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //function for edtiting user avatar
  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //function for adding cards
  const handleAddCards = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //function for closing popups
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <BurgerMenu
          userEmail={userEmail}
          handleLogOut={handleLogOut}
          isBurgerMenuOpen={isBurgerMenuOpen}
        />
        <Header
          userEmail={userEmail}
          handleLogOut={handleLogOut}
          loggedIn={loggedIn}
          handleBurgerClick={handleBurgerClick}
          isBurgerMenuOpen={isBurgerMenuOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={confirmCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/signin"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
        </Routes>

        {loggedIn ? <Footer /> : null}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCards}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar}
          onConfirm={handleCardDelete}
          card={cardToDelete}
        />

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
