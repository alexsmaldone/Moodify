import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp,login } from '../../../store/session';
import LoginFormModal from '../LoginFormModal';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const data = await dispatch(signUp(username, email, password, confirmPassword, firstName, lastName));
      if (data) {
        setErrors(data)
      }
      return null;
    }
    return setErrors(['Both Passwords Must Match'])
  }
  //     return(dispatch(signUp(username, email, password)))
  //       .catch(async(res) => {
  //         const data = await res
  //         if(data) setErrors(data)
  //       })
  //   }
  //   return setErrors(['Both passwords must match'])
  // }
  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // const demoLogin = async(e) => {
  //   e.preventDefault();
  //   dispatch(login({email: "demoe@aa.io", password: "password"}))
  // }

  if (sessionUser) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signUpBlackBox'>
      <div className='signUpElements'>
        <div className='spotifyLogo'>
        </div>
        <form className='formMainDiv' onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='formWelcomeBox'>
            <h2 className='formWelcomeBoxTxt'>Sign up for a free Moodify account.</h2>
          </div>
          <div>
            <label className='forminputs'>
              <input
                className='formInputIndiv'
                type='text'
                placeholder='What is your first name?'
                name='firstName'
                onChange={updateFirstName}
                value={firstName}
              />
              <input
                type='text'
                className='formInputIndiv'
                placeholder='What is your last name?'
                name='last_name'
                onChange={updateLastName}
                value={lastName}
              />
              <input
              type='text'
              className='formInputIndiv'
              placeholder='Username'
              name='username'
              onChange={updateUsername}
              value={username}
              />
              <input
                type='text'
                className='formInputIndiv'
                placeholder='Email'
                name='email'
                onChange={updateEmail}
                value={email}
              />
              <input
              type='password'
              className='formInputIndiv'
              placeholder='Create a password'
              name='password'
              onChange={updatePassword}
              value={password}
              />
              <input
                type='password'
                className='formInputIndiv'
                placeholder='Confirm the password'
                name='confirm_password'
                onChange={updateConfirmPassword}
                value={confirmPassword}
                required={true}
              />
            </label>
          </div>
          <div className='submitButtons'>
            <button type='submit' className='submitBtn'>CONTINUE</button>
          </div>
        </form>
        <div className='orBox'>
          <div className='orElement'>------------------ OR ------------------</div>
        </div>
        <div className='loginFromSignUp'>
          <h2 className='loginFromSignUpTxt'>Already on Spotify?</h2>
          <div className='loginFromSignUpBtn'>
              <LoginFormModal />
          </div>
        </div>
        <div className='demoUserBox'>
          <button className='demoUserLogBtn'
          // onClick={demoLogin}
          > DEMO </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
