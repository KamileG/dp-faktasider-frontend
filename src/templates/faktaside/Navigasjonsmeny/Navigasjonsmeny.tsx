import * as React from "react";
import styled from "styled-components/macro";
import withErrorBoundary from "../../../components/withErrorBoundary";
import SideListe from "./SideListe";
import MobilmenyWrapper from "./MobilmenyWrapper";
import { theme } from "../../../styles/theme";
import useProjectData from "../../../hooks/graphQl/useProjectData";
import { Systemtittel } from "nav-frontend-typografi";
import useUniqueId from "../../../utils/useUniqueId";

const DesktopNav = styled.nav`
  @media (${theme.media.smallScreen}) {
    display: none;
  }
  border: ${theme.border.banner};
  border-left: none;
  background-color: white;
  @supports (position: sticky) {
    position: sticky;
    max-height: calc(100vh);
    top: 0;
    overflow-y: auto;
    transition: top 0.2s, max-height 0.2s;
  }
  max-width: 16rem;
`;

const MobileNav = styled.nav`
  @media not all and (${theme.media.smallScreen}) {
    display: none;
  }
`;

const HeaderStyle = styled(Systemtittel)`
  padding: ${theme.layoutPadding};
  opacity: 0.8;
  pointer-events: none;
`;

function Header(props: { id: string; title: string }) {
  return (
    <HeaderStyle id={props.id}>
      <span className="sr-only">Sideoversikt</span>
      {props.title}
    </HeaderStyle>
  );
}

interface Props {
  className?: string;
}

function Navigasjonsmeny(props: Props) {
  const mobileTitleId = useUniqueId("mobile-menu");
  const desktopTitleId = useUniqueId("desktop-menu");
  const projectData = useProjectData();

  return (
    <>
      <DesktopNav className={props.className} aria-labelledby={desktopTitleId}>
        <Header title={projectData.title} id={desktopTitleId} />
        <SideListe />
      </DesktopNav>
      <MobileNav className={props.className} aria-labelledby={mobileTitleId}>
        <MobilmenyWrapper>
          <Header title={projectData.title} id={mobileTitleId} />
          <SideListe />
        </MobilmenyWrapper>
      </MobileNav>
    </>
  );
}

export default withErrorBoundary(Navigasjonsmeny, "Navigasjonsmeny");
