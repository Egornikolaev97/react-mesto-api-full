import React from "react";

const PopupWithForm = ({
  name,
  title,
  titleButton,
  isOpen,
  children,
  onClose,
  onSubmit,
  isValid,
}) => {
  React.useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  });

  return (
    <div
      className={`popup popup_${name}` + (isOpen && " popup_opened")}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="закрыть форму"
          onClick={onClose}
        >
          Закрыть
        </button>

        <form
          name={name}
          className="form form_profile-edit"
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="form__title">{title}</h2>
          <fieldset className="form__fieldset">{children}</fieldset>
          <button
            type="submit"
            disabled={!isValid}
            className={`form__submit form__submit_type-edit ${
              !isValid && "form__submit_disabled"
            }`}
            aria-label="сохранить изменения"
          >
            {titleButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
