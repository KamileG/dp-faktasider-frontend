import * as React from "react";
import { ReactNode, RefObject } from "react";
import styled from "styled-components/macro";
import Navigasjonsmeny from "./Navigasjonsmeny/Navigasjonsmeny";
import Header from "../felles/Header";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import DevKnapper from "../../components/DevKnapper/DevKnapper";
import { MainContentStyle } from "./MainContentStyle";
import withErrorBoundary from "../../components/withErrorBoundary";
import Filtrering from "./TilpassInnhold/TilpassInnhold";
import { theme } from "../../styles/theme";
import { Block } from "../../utils/richTextUtils/richTextTypes";

interface Props {
  header: string;
  beskrivelse: string;
  children: ReactNode;
  publiseringsTidspunkt?: string;
  wordCountRef?: RefObject<HTMLElement>;
  kortFortalt?: Block[];
}

const ContentStyle = styled.div`
  flex-grow: 1;
  position: relative;
  min-height: 30vh;
  @media (${theme.media.bigScreen}) {
    display: flex;
    align-items: flex-start;
    .order-1 {
      order: 1;
    }
    .order-2 {
      order: 2;
      flex-grow: 1;
    }
    .order-3 {
      order: 3;
    }
  }
`;

const Style = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
`;

function FaktaSideLayout(props: Props) {
  return (
    <>
      <LanguageSelector />
      <Style>
        <DevKnapper />
        <ContentStyle>
          <Navigasjonsmeny className="order-1" />
          {props.wordCountRef && <Filtrering wordCountRef={props.wordCountRef} className="order-3" />}
          <div className="order-2">
            <Header
              heading={props.header}
              beskrivelse={props.beskrivelse}
              publiseringsTidspunkt={props.publiseringsTidspunkt}
              kortFortalt={props.kortFortalt}
            />
            <MainContentStyle>{props.children}</MainContentStyle>
          </div>
        </ContentStyle>
      </Style>
    </>
  );
}

export default withErrorBoundary(FaktaSideLayout, "FaktaSideLayout");
