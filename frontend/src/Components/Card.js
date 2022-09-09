import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const { name, link, likes } = card;

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `photo-grid__delete ${isOwn ? '' : 'photo-grid__delete_hidden'}`;

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `photo-grid__like ${isLiked ? 'photo-grid__like-active': ''}`;

    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleCardLike = () => {
        onCardLike(card);
    }

    const handleCardDelete = () => {
        onCardDelete(card);
    }

    return (
        <div className="photo-grid__item">
            <button type="button" className="photo-grid__show-btn" onClick={handleCardClick}>
                <img className="photo-grid__image" src={link} alt={name}/>
            </button>
            <div className="photo-grid__info">
                <h2 className="photo-grid__title">{name}</h2>
                <div className="photo-grid__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
                    <span className="photo-grid__like-counter">{likes.length}</span>
                </div>
                <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
            </div>
        </div>
    )
}

export default Card;