import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidation from '../hooks/useFormValidation';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm, setValues, setIsValid } = useFormValidation({ name: '', about: ''});

  React.useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about});
    setIsValid(true);
    resetForm();
  }, [currentUser, isOpen, setValues, setIsValid, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name:  values.name,
      about: values.about
    });
  };

  return (
    <PopupWithForm
    name="edit"
    title="Редактировать профиль"
    titleButton="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isValid={isValid}>

      <label className="form__field">
        <input
          id="name-input"
          name="name"
          placeholder="Введите имя"
          autoComplete="off"
          type="text"
          required
          minLength={2}
          maxLength={40}
          className="form__input form__input_type_name"
          onChange={handleChange}
          value={values.name}
        />
        <span className={`form__error ${!isValid && 'form__error_active'}`}>{!isValid && errors.name}</span>
      </label>
      <label className="form__field">
        <input
          id="about-input"
          placeholder="Введите профессию"
          name="about"
          autoComplete="off"
          type="text"
          required
          minLength={2}
          maxLength={200}
          className="form__input form__input_type_about"
          onChange={handleChange}
          value={values.about}
        />
        <span className={`form__error ${!isValid && 'form__error_active'}`}>{errors.about}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
