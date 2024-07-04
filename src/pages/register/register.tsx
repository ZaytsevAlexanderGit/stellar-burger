import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/authSlice';
import { useForm } from '../../utils/hooks/useForm';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = values;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: name, email: email, password: password }));
  };

  return (
    <RegisterUI
      errorText=''
      onChange={handleChange}
      email={email}
      userName={name}
      password={password}
      handleSubmit={handleSubmit}
    />
  );
};
