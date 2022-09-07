import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { email, password } = data;
    handleRegister(email, password);
  };

  return (
    <div className="form-page">
      <form name="login" className="form form__page" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_page">Регистрация</h2>
        <fieldset className="form__fieldset form__fieldset_page">
          <label className="form__field">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="form__input form__input_page"
              required
              minLength="2"
              maxLength="30"
            />
          </label>
          <label className="form__field form__field_page">
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              value={data.password}
              onChange={handleChange}
              autoComplete="off"
              className="form__input form__input_page"
              required
            />
          </label>
        </fieldset>
        <button type="submit" className="form__submit form__submit_type_page">
          Зарегистрироваться
        </button>
        <div className="form-page__subtitle">
          <p className="form-page__text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="form-page__link">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;