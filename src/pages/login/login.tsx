import React, { FC, SyntheticEvent } from 'react';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/authSlice';
import { LoginUI } from '@ui-pages';
import { useForm } from '../../utils/hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  });

  const { email, password } = values;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      onChange={handleChange}
      password={password}
      setPassword={setValues}
      handleSubmit={handleSubmit}
    />
  );
};
