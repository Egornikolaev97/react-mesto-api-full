import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
          <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button type="button" className="profile__edit-btn" aria-label="редактировать профиль" onClick={onEditProfile}></button>
        </div>
        <button type="button" className="profile__add-btn" aria-label="добавить фотографии" onClick={onAddPlace}></button>
      </section>
      <section aria-label="Фотографии красивых мест" className="photo-grid">
        {cards.map((card) => (
          <Card
          card={card}
          key={card._id}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
};

export default Main;
