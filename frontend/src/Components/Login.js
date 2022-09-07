import React, { useState } from "react";

const Login = ({ handleLogin }) => {
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
    const { email, password } = data;
    handleLogin(email, password);
  };

  return (
    <div className="form-page">
      <form name="login" className="form form__page" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_page">Вход</h2>
        <fieldset className="form__fieldset form__fieldset_page">
          <label className="form__field">
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
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
              value={data.password}
              onChange={handleChange}
              placeholder="Пароль"
              autoComplete="off"
              className="form__input form__input_page"
              required
            />
          </label>
        </fieldset>
        <button type="submit" className="form__submit form__submit_type_page">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;