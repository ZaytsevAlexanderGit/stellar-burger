import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '../../utils/hooks/useForm';

export const ForgotPassword: FC = () => {
  const { values, handleChange, setValues } = useForm({
    email: ''
  });

  const [error, setError] = useState<Error | null>(null);

  const { email } = values;

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      onChange={handleChange}
      email={email}
      handleSubmit={handleSubmit}
    />
  );
};
