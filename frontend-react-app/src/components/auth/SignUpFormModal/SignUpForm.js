import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

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
      console.log('this is the data', data);
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

  if (sessionUser) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type='password'
          name='confirm_password'
          onChange={updateConfirmPassword}
          value={confirmPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;