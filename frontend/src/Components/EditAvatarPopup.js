import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateUser }) => {
  const avatarRef = React.useRef();

  const { values, errors, isValid, handleChange, resetForm, setValues, setIsValid } = useFormValidation({ avatar: '' });

  const handleSubmit = (event) =>  {
    event.preventDefault();
    onUpdateUser({ avatar: avatarRef.current.value });
  };

  React.useEffect(() => {
    setValues({ avatar: '' });
    setIsValid(false);
    resetForm();
  }, [setValues, setIsValid, isOpen, resetForm]);

  return (
    <PopupWithForm
    name="avatar"
    title="Обновить аватар"
    titleButton="Сохранить изменения"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isValid={isValid}
    >
      <label className="form__field">
        <input
        name="avatar"
        id="avatar-input"
        ref={avatarRef}
        onChange={handleChange}
        value={values.avatar}
        autoComplete="off"
        placeholder="ссылка на картинку"
        type="url"
        className="form__input form__input_type_link"
        required />
        <span className={`form__error ${errors.avatar && 'form__error_active'}`}>{errors.avatar}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
