import React from 'react';

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_show popup_darkoverlay ${card && ' popup_opened'}`}
    onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="popup__fullscreen">
        <button type="button" className="popup__close popup__close-full" onClick={onClose}>
          Закрыть
        </button>
        <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
        <p className="popup__description">{card ? card.name : ''}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
