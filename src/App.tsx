import React, {useEffect, useState} from 'react';
import './App.css';


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [agree, setAgree] = useState(false);
  const [emailWasBlur, setEmailWasBlur] = useState(false);
  const [passWasBlur, setPassWasBlur] = useState(false);
  const [rePassWasBlur, setRePassWasBlur] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertPass, setAlertPass] = useState('');
  const [alertRePass, setAlertRePass] = useState('');

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
    setAgree(false);
    console.log('submit');
    alert('Регистрация прошла успешно');
  }

  //---Проверка email---
  useEffect(() => {
    if (!emailWasBlur || email === '') {
      return;
    }
    const regexpEmail = /^[\w-.]{2,}@[\w-]{2,}\.[\w]{2,}$/;
    const emailControl = regexpEmail.test(email);
    setAlertEmail((emailControl) ? '' : 'неверный формат');
  }, [email, emailWasBlur]);

  const handlerBlurEmail = () => {
    setEmailWasBlur(true);
  }

  //---Проверка пароля---
  useEffect(() => {
    if (!passWasBlur || password === '') {
      return;
    }
    const regexpPass1 = /[0-9]/;
    const regexpPass2 = /[A-Z]/;
    const regexpPass3 = /[a-z]/;
    const passControl1 = regexpPass1.test(password);
    const passControl2 = regexpPass2.test(password);
    const passControl3 = regexpPass3.test(password);
    const passControlLength = password.length >= 8;
    const passControl = passControl1 && passControl2 && passControl3 && passControlLength;
    setAlertPass(passControlLength ? (passControl ? '' : 'цифры, заглавные и строчные лат. буквы') : 'слишком короткий пароль');
  }, [password, passWasBlur]);

  const handlerBlurPass = () => {
    setPassWasBlur(true);
  }

  //---Проверка повтора пароля---
  useEffect(() => {
    if (!rePassWasBlur || rePassword === '') {
      return;
    }
    const rePassControl = password === rePassword;
    setAlertRePass(rePassControl ? '' : 'пароль не совпадает');
  }, [password, rePassword, rePassWasBlur]);

  const handlerBlurRePass = () => {
    setRePassWasBlur(true);
  }

//---Активность кнопки---
  const subForm = {
    email,
    password,
    rePassword,
    city,
    gender,
    agree,
  }
  const isSubmitButtonDisable = Object.values(subForm)
      .filter(e => e === false || e === '')
      .length === 0
    && !alertEmail && !alertPass && !alertRePass;

  console.log(subForm);

  return (
    <form onSubmit={handlerSubmit} className="app">
      <div className='header'>
        <legend><h3>Регистрация</h3></legend>
      </div>
      <label className='email'>E-mail</label>
      <label className='pass'>Пароль</label>
      <label className='rePass'>Пароль еще раз</label>
      <label className='city'>Город</label>
      <label className='gender'>Пол</label>
      <div className='emailInput column'>
        <input
          type='email'
          value={email}
          className='width'
          onChange={handlerChangeEmail}
          onBlur={handlerBlurEmail}
        />
        {alertEmail && <i className='error'>{alertEmail}</i>}
      </div>
      <div className='passInput column'>
        <input
          type='password'
          value={password}
          className='width'
          placeholder='не менее 8 символов'
          onChange={handlerChangePassword}
          onBlur={handlerBlurPass}
        />
        {alertPass && <i className='error'>{alertPass}</i>}
      </div>
      <div className='rePassInput column'>
        <input
          type='password'
          value={rePassword}
          className='width'
          placeholder='повторите пароль'
          onChange={handlerChangeRePassword}
          onBlur={handlerBlurRePass}
        />
        {alertRePass && <i className='error'>{alertRePass}</i>}
      </div>
      <div className='cityInput column'>
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
      </div>
      <span className='genderInput'>
          <label>
            <input
              type='radio'
              value='мужской'
              name='gender'
              onChange={handlerChangeGender}
              checked={(gender === 'мужской')}
            />
            мужской
          </label>
          <label>
            <input
              type='radio'
              value='женский'
              name='gender'
              onChange={handlerChangeGender}
              checked={(gender === 'женский')}
            />
            женский
          </label>
        </span>
      <label className='agreeInput'>
        <input
          type='checkbox'
          className='checkbox'
          checked={agree}
          onChange={handlerChangeAgree}
        />
        Согласие на обработку персональных данных
      </label>
      <div className='footer'>
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
