import * as React from "react";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";
import withErrorBoundary from "../../components/withErrorBoundary";
import SistOppdatert from "../faktaside/SistOppdatert";
import { Block } from "../../utils/richTextUtils/richTextTypes";
import BlockContent from "../../components/BlockContent/BlockContent";
import { typografiStyle } from "../faktaside/MainContentStyle";

interface Props {
  heading: string;
  beskrivelse: string;
  small?: boolean;
  publiseringsTidspunkt?: string;
  kortFortalt?: Block[];
}

const Background = styled.div`
  background-color: ${theme.colors.navBlaLighten80};
  border-bottom: ${theme.border.banner};
  border-top: ${theme.border.banner};
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: ${theme.layoutMargin};
`;

const StyledSidetittel = styled(Sidetittel)`
  margin-bottom: 1rem;
`;
const ContentStyle = styled.div`
  text-align: left;
  ${typografiStyle};
  margin: 2rem 0;
  max-width: 35rem;
`;

const MaxWidth = styled.div`
  padding: 1.5rem 0.5rem 2rem;
  max-width: 50rem;
`;

const Header = (props: Props) => {
  return (
    <Background>
      <MaxWidth>
        <StyledSidetittel>{props.heading}</StyledSidetittel>
        <ContentStyle>
          <Normaltekst>{props.beskrivelse}</Normaltekst>
          <BlockContent blocks={props.kortFortalt || []} />
        </ContentStyle>
        {props.publiseringsTidspunkt && <SistOppdatert publiseringsTidspunkt={props.publiseringsTidspunkt} />}
      </MaxWidth>
    </Background>
  );
};

export default withErrorBoundary(Header, "Header");
