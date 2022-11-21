import styled from 'styled-components';
import Button from './Button';

export const ButtonStyled = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${p => p.theme.radii.exlg};
  border: ${p => p.theme.borders.none};
  background-color: ${p => p.theme.colors.activeButtonBg};
  color: ${p => p.theme.colors.activeButtonColor};
  transition: ${p => p.theme.transition.backgroundColor},
    ${p => p.theme.transition.transform};
  min-width: 280px;
  min-height: 50px;
  text-transform: uppercase;
  font-size: ${p => p.theme.fontSizes.m};
  line-height: ${p => p.theme.lineHeights.body};
  font-weight: 400;
  line-height: ${p => p.theme.lineHeights.body};
  letter-spacing: 0.1em;

  &:hover,
  &:focus {
    /* background-color: ${p => p.theme.colors.hover}; */
    transform: scale(1.1);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${p => p.theme.colors.disabled};
    color: ${p => p.theme.colors.disabledText};
  }
`;

export const AuthButton = styled(ButtonStyled)`
  position: relative;
  padding: 4px 22px;
  margin-left: ${p => p.theme.space[9]};
  margin-right: ${p => p.theme.space[9]};
`;

export const RedirectFormButton = styled(AuthButton)`
  border: ${p => p.theme.borders.unactiveButtonBorder};
  background-color: transparent;
`;
