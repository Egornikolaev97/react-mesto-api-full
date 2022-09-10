require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Joi, celebrate, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./midlewares/auth');
const handleError = require('./midlewares/handleError');
const NotFoundError = require('./utils/NotFoundError');
const { requestLogger, errorLogger } = require('./midlewares/logger');

console.log(process.env.NODE_ENV);
console.log(process.env.JWT_SECRET);
console.log('test');
const { PORT = 3004 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/^http(s)?:\/\/((www.)?([\w-]+\.)+\/?)\S*$/),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('hello world');
});
