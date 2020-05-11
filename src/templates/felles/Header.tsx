import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { theme } from '../../styles/theme';

interface Props {
  heading: string;
  small?: boolean;
}

const Background = styled.div`
  background-color: ${theme.colors.navBlaLighten80};
  border-bottom: 0.3rem solid ${theme.colors.navBlaLighten60};
  border-top: 0.3rem solid ${theme.colors.navBlaLighten60};
  display: flex;
  justify-content: center;
  text-align: center;
`;

const StyledSidetittel = styled(Sidetittel)`
  font-size: 1.7rem;
`;

const MaxWidth = styled.div`
  padding: 2rem;
  max-width: 50rem;
`;

const Header = (props: Props) => {
  return (
    <Background>
      <MaxWidth>
        <StyledSidetittel>{props.heading}</StyledSidetittel>
      </MaxWidth>
    </Background>
  );
};

export default Header;