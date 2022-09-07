import React from "react";
import successImage from "../images/successImage.svg";
import failImage from "../images/failImage.svg";

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div
      className={`popup ` + (isOpen && " popup_opened")}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="закрыть окно"
          onClick={onClose}
        >
          Закрыть
        </button>
        <div className="popup__tooltip">
          <img
            className="popup__tooltip-image"
            src={isSuccess ? successImage : failImage}
            alt={isSuccess ? "Успешно" : "Ошибка"}
          />
          <h2 className="popup__message">
            {isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;