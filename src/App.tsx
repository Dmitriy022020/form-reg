import React, {useEffect, useState} from 'react';
import './App.css';


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [agree, setAgree] = useState(false);
  const [emailState, setEmailState] = useState('hidden')
  const [passState, setPassState] = useState('hidden')
  const [rePassState, setRePassState] = useState('hidden')

  const handlerChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  const handlerChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const handlerChangeRePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(event.target.value);
  }
  const handlerChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  }
  const handlerChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  }
  const handlerChangeAgree = () => {
    setAgree(!agree);
  }
  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail('');
    setPassword('');
    setRePassword('');
    setCity('');
    setGender('');
    setAgree(false)
    console.log('submit')
    alert('Регистрация прошла успешно')
  }

  //---Проверка email---
  const regexpEmail = /^[\w-.]{2,}@[\w-]{2,}\.[\w]{2,}$/;
  const emailControl = regexpEmail.test(email);
  const alertEmail = 'неверный формат';
  const handlerBlurEmail = () => {
    if (!emailControl) {
      if (email !== '') {
        setEmailState('visible')
      }
    }
  }
  useEffect(() => {
    if (emailState === 'visible') {
      if (emailControl) {
        setEmailState('hidden')
      }
    }
  }, [emailControl, emailState]);

//---Проверка пароля---
  const regexpPass1 = /[0-9]/;
  const regexpPass2 = /[A-Z]/;
  const regexpPass3 = /[a-z]/;
  const passControl1 = regexpPass1.test(password);
  const passControl2 = regexpPass2.test(password);
  const passControl3 = regexpPass3.test(password);
  const passControlLength = password.length >= 8;
  const passControl = passControl1 && passControl2 && passControl3 && passControlLength;
  const alertPass = passControlLength ? (passControl ? 'ок' : 'цифры, заглавные и строчные лат. буквы') : 'слишком короткий пароль';
  const handlerBlurPass = () => {
    if (!passControl) {
      if (password !== '') {
        setPassState('visible')
      }
    }
  }
  useEffect(() => {
    if (passState === 'visible') {
      if (passControl) {
        setPassState('hidden')
      }
    }
  }, [passControl, passState]);

  //---Проверка повтора пароля---
  const rePassControl = password === rePassword;
  const alertRePass = 'пароль не совпадает';
  const handlerBlurRePass = () => {
    if (!rePassControl) {
      if (rePassword !== '') {
        setRePassState('visible')
      }
    }
  }
  useEffect(() => {
    if (rePassState === 'visible') {
      if (rePassControl) {
        setRePassState('hidden')
      }
    }
  },[rePassControl, rePassState]);

//---Активность кнопки---
  const subForm = {
    email,
    password,
    rePassword,
    city,
    gender,
    agree,
    emailState,
    passState,
    rePassState,
  }
  const isSubmitButtonDisable = Object.values(subForm)
      .filter(e => e === false || e === '')
      .length === 0
    && emailControl && passControl && rePassControl;

  console.log(subForm);

  return (
    <form onSubmit={handlerSubmit} className="app">
      <div className='row_1'>
        <legend><h3>Регистрация</h3></legend>
      </div>
      <div className='col_1'>
        <label>E-mail</label>
        <label>Пароль</label>
        <label>Пароль еще раз</label>
        <label>Город</label>
        <label>Пол</label>
      </div>
      <div className='col_2'>
        <div>
          <input
            type='email'
            value={email}
            className='width'
            onChange={handlerChangeEmail}
            onBlur={handlerBlurEmail}
          />
          <i className={emailState}>{alertEmail}</i>
        </div>
        <div>
          <input
            type='password'
            value={password}
            className='width'
            placeholder='не менее 8 символов'
            onChange={handlerChangePassword}
            onBlur={handlerBlurPass}
          />
          <i className={passState}>{alertPass}</i>
        </div>
        <div>
          <input
            type='password'
            value={rePassword}
            className='width'
            placeholder='повторите пароль'
            onChange={handlerChangeRePassword}
            onBlur={handlerBlurRePass}
          />
          <i className={rePassState}>{alertRePass}</i>
        </div>
        <select
          value={city}
          className='width'
          onChange={handlerChangeCity}
        >
          <option defaultValue='' hidden>
            выбрать
          </option>
          <option value='Тверь'>
            Тверь
          </option>
          <option value='Москва'>
            Москва
          </option>
          <option value='Санкт-Петербург'>
            Санкт-Петербург
          </option>
        </select>
        <span>
          <label>
            <input
              type='radio'
              value='мужской'
              name='gender'
              onChange={handlerChangeGender}
            />
            мужской
          </label>
          <label>
            <input
              type='radio'
              value='женский'
              name='gender'
              onChange={handlerChangeGender}
            />
            женский
          </label>
        </span>
      </div>
      <div className='row_3'>
        <span>
          <label>
            <input
              type='checkbox'
              className='checkbox'
              checked={agree}
              onChange={handlerChangeAgree}
            />
          Согласие на обработку персональных данных
          </label>
        </span>
        <button
          type='submit'
          disabled={!isSubmitButtonDisable}
          className={isSubmitButtonDisable ? 'button' : 'button_hidden button'}
        >
          Подтвердить
        </button>
      </div>
    </form>
  )
}

export default App;
