import * as React from "react";
import { useVisForContext } from "../../../components/BlockContent/VisFor/VisForContext";
import styled from "styled-components/macro";
import { Checkbox } from "nav-frontend-skjema";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import withErrorBoundary from "../../../components/withErrorBoundary";
import { theme } from "../../../styles/theme";
import useUniqueId from "../../../utils/useUniqueId";
import { UnmountClosed } from "react-collapse";
import { getFiltreringsvalgLabel } from "./getFiltreringsLabel";
import getAlleTilpassInnholdValg from "./getAlleTilpassInnholdValg";
import { useFaktasideContext } from "../FaktaSideContext";
import { useWordCount } from "./useWordCount";
import { RefObject } from "react";

const StyledNav = styled.nav`
  border: ${theme.border.banner};
  border-right: none;
  background-color: white;
  padding: ${theme.layoutPadding};
  padding-bottom: 3rem; // Så chatbotten frida ikke legger seg over tekst i Tilpass innhold
  @media (${theme.media.bigScreen}) {
    overflow-y: auto;
    max-height: calc(100vh);
    position: sticky;
    top: 0;
    transition: top 0.2s;
    max-width: 14rem;
  }
  > * {
    margin-bottom: 1rem;
  }
`;

const StyledUl = styled.ul`
  li {
    margin-top: 0.6rem;
  }
`;

const StyledUndertittel = styled(Systemtittel)`
  opacity: 0.8;
  margin-bottom: ${theme.layoutPadding};
`;

interface Props {
  className?: string;
  wordCountRef: RefObject<HTMLElement>;
}

function TilpassInnhold(props: Props) {
  const visForContext = useVisForContext();
  const titleId = useUniqueId("tilpassInnhold");
  const { innhold, visIngenValgPasser } = useFaktasideContext();
  const valgt = visForContext.value.checked;
  const ingenPasserMeg = visForContext.value.ingenPasserMeg;
  const tilgjengeligeValg = getAlleTilpassInnholdValg(innhold);
  const wordCount = useWordCount(props.wordCountRef);

  if (tilgjengeligeValg.length === 0) {
    return null;
  }

  return (
    <StyledNav className={props.className} aria-labelledby={titleId}>
      <StyledUndertittel id={titleId}>Tilpass innhold</StyledUndertittel>
      <Normaltekst>Velg det som passer din situasjon best:</Normaltekst>
      <StyledUl>
        {tilgjengeligeValg.map((valg) => (
          <li key={valg}>
            <Checkbox
              label={getFiltreringsvalgLabel(valg)}
              onChange={() => visForContext.dispatch({ type: "toggle", key: valg })}
              checked={valgt.includes(valg)}
            />
          </li>
        ))}
        {visIngenValgPasser && (
          <li>
            <Checkbox
              label={"Ingen valg passer"}
              onChange={() => visForContext.dispatch({ type: "toggleIngenPasser" })}
              checked={ingenPasserMeg}
            />
          </li>
        )}
      </StyledUl>
      <UnmountClosed isOpened={valgt.length > 0 || ingenPasserMeg}>
        Vi viser nå {wordCount.current} av {wordCount.total} ord på denne siden
      </UnmountClosed>
    </StyledNav>
  );
}

export default withErrorBoundary(TilpassInnhold, "TilpassInnhold");
