import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type LoginUIProps = PageUIProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
