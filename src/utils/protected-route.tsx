import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { getIsAuthChecked, getUser } from '../services/authSlice';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  // location: pathname /profile, user == null, onlyUnAuth = false
  // location: /login, from: /profile, user == null, onlyUnAuth = true
  // location: /login, from: /profile, user != null, onlyUnAuth = true
  // location: /profile, user != null, onlyUnAuth = false
  // location: /profile, user == null, onlyUnAuth = false

  // if (!isAuthChecked) {
  //   return <p>Загрузка...</p>;
  // }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // onlyUnAuth && !user
  // !onlyUnAuth && user

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected component={component} onlyUnAuth />;
