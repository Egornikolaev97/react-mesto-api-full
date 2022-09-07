import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../hooks/useFormValidation";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
    setIsValid,
  } = useFormValidation({ name: "", link: "" });

  React.useEffect(() => {
    setValues({ name: "", link: "" });
    setIsValid(false);
    resetForm();
  }, [isOpen, setValues, setIsValid, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  };

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="form__field">
        <input
          id="place-input"
          name="name"
          autoComplete="off"
          placeholder="Название"
          type="text"
          className="form__input form__input_type_title"
          required
          minLength={2}
          maxLength={30}
          onChange={handleChange}
          value={values.name}
        />
        <span className={`form__error ${!isValid && "form__error_active"}`}>
          {!isValid && errors.name}
        </span>
      </label>
      <label className="form__field">
        <input
          id="link-input"
          name="link"
          autoComplete="off"
          placeholder="Ссылка на картинку"
          type="url"
          className="form__input form__input_type_link"
          required
          onChange={handleChange}
          value={values.link}
        />
        <span className={`form__error ${!isValid && "form__error_active"}`}>
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;