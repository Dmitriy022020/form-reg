import React, {useState} from 'react';
import './App.css';


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [agree, setAgree] = useState(false);
  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [rePassError, setRePassError] = useState(false)

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
    setEmailError(true)
  }
  // useEffect(() => {
  //   if (!emailControl && email !== '') {
  //     setEmailError(true)
  //   } else {
  //     setEmailError(false)
  //   }
  // }, [emailControl, email]);

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
    setPassError(true)
  }
  // useEffect(() => {
  //   if (!passControl && password !== '') {
  //     setPassError(true)
  //   } else {
  //     setPassError(false)
  //   }
  // }, [passControl, password]);

  //---Проверка повтора пароля---
  const rePassControl = password === rePassword;
  const alertRePass = 'пароль не совпадает';
  const handlerBlurRePass = () => {
    setRePassError(true)
  }
  // useEffect(() => {
  //   if (!rePassControl && rePassword !== '') {
  //     setRePassError(true)
  //   } else {
  //     setRePassError(false)
  //   }
  // }, [rePassControl, rePassword]);

//---Активность кнопки---
  const subForm = {
    email,
    password,
    rePassword,
    city,
    gender,
    agree,
    emailError,
    passError,
    rePassError,
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
          {!emailControl && email !== '' && emailError && <i className='error'>{alertEmail}</i>}
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
          {passError && !passControl && password !== '' && <i className='error'>{alertPass}</i>}
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
          {rePassError && !rePassControl && rePassword !== '' && <i className='error'>{alertRePass}</i>}
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
