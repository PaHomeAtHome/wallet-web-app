import PasswordStrengthBar from 'react-password-strength-bar';
import sprite from '../../../images/icons/sprite-all-icons.svg';
import FormError from '../../FormError';
import {
  FormInput,
  InputBlock,
  InputContent,
  InputLabel,
  FormInputIcon,
} from '../Inputs.styled';

const PasswordInput = ({
  value,
  passwordError,
  touchedError,
  handleChange,
}) => {
  return (
    <InputBlock>
      <InputContent>
        <FormInputIcon error={passwordError && touchedError ? 'true' : 'false'}>
          <use href={sprite + '#icon-lock'}></use>
        </FormInputIcon>
        <FormInput
          id="password"
          type="password"
          name="password"
          placeholder=" "
          required
          onChange={handleChange}
          value={value}
          error={passwordError && touchedError ? 'true' : 'false'}
        />
        <InputLabel htmlFor="password">Password</InputLabel>
      </InputContent>
      <PasswordStrengthBar password={value} shortScoreWord="" />
      <FormError name="password" />
    </InputBlock>
  );
};

export default PasswordInput;
