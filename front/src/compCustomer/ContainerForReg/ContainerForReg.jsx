import './ContainerForReg.css';
import { Link, useNavigate } from 'react-router-dom';
import { registration } from '../../store/Slices/userSlicer.js';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../ReadyToUseComponents/alert.jsx';

export default function ContainerForRegLog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [Cpassword, setCpassword] = useState('');
  const [login, setlogin] = useState('');
  const { error } = useSelector((state) => state.users);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handleChangeEmail = (e) => {
    setemail(e.target.value);
  };
  const handleChangeLogin = (e) => {
    setlogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    setpassword(e.target.value);
  };
  const handleChangeCPassword = (e) => {
    setCpassword(e.target.value);
  };

  const checkPasswords = (p, cp) => {
    if (p !== cp) {
      setPasswordsMatch(false);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkPasswords(password, Cpassword)) {
      return;
    }
    const resultAction = await dispatch(
      registration({
        email,
        password,
        login,
      }),
    );
    if (resultAction.status === 500) {
      alert(error.message);
    } else {
      console.log('Результат регистрации:', resultAction.payload);
      localStorage.setItem('token', resultAction.payload.refreshToken);
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <main className="container-for-reg-log">
      {!passwordsMatch && <Alert message="Passwods must be the same" />}
      <section className="flex-con">
        <article className="article-for-form">
          <img src="./images/registrationPhoto.png" alt="" className="img width" />
          <div className="switch">
            <p className="uppercase">
              switch to
              <Link to="/login" className="span">
                <span className="span"> login</span>
              </Link>
            </p>
          </div>
          <form action="register" onSubmit={handleSubmit} className="registration-form width">
            <h3>registration</h3>
            <p>
              <button>As customer</button>/<button>As freelancer</button>
            </p>

            <div className="inputs">
              <input
                className="input-form"
                type="Email"
                placeholder="Entire your email"
                onChange={handleChangeEmail}
                value={email}
              />
              <input
                className="input-form"
                type="text"
                placeholder="Entire your login"
                onChange={handleChangeLogin}
                value={login}
              />
              <input
                className="input-form"
                type="password"
                placeholder="Password"
                onChange={handleChangePassword}
                value={password}
              />
              <input
                className="input-form"
                type="password"
                placeholder="Confirm password"
                onChange={handleChangeCPassword}
                value={Cpassword}
              />
            </div>
            <input type="submit" className="reg-button" value="Register" />
          </form>
        </article>
      </section>
    </main>
  );
}
