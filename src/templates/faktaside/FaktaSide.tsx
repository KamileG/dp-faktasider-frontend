import * as React from "react";
import { useRef } from "react";
import { PageProps } from "gatsby";
import BlockContent from "../../components/BlockContent/BlockContent";
import FaktaSideLayout from "./FaktaSideLayout";
import GraphQLErrorList from "../../components/GraphqlErrorList";
import SEO from "../../components/SEO";
import IkkeOversatt from "./IkkeOversatt";
import RelatertInformasjon from "./RelatertInformasjon";
import { FaktasideProvider } from "./FaktaSideContext";
import { FaktasideContext } from "../../../gatsby-utils/createFaktasider";
import withErrorBoundary from "../../components/withErrorBoundary";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import InnholdetErTilpasset from "./InnholdsMeny/InnholdetErTilpasset";
import useLoggUtdatertHashlenke from "./useLoggUtdatertHashlenke";
import useBreadcrumbs from "./useBreadcrumbs";
import Notifikasjoner from "./Notifikasjoner";

export interface FaktaSideProps extends PageProps<{}, FaktasideContext> {
  errors: any;
}

function FaktaSide(props: FaktaSideProps) {
  const page = props.pageContext;
  const lang = page.lang;
  const erPublisert = page.visSprakversjon?.[lang];
  const tittel = page.title || "";
  const wordCountRef = useRef<HTMLDivElement>(null);
  const path = props.location.pathname;
  useBreadcrumbs(tittel);

  useMount(() => loggSidevisning(tittel));
  useLoggUtdatertHashlenke();

  if (!erPublisert) {
    return <IkkeOversatt {...props} />;
  }

  const beskrivelse = page.beskrivelse || "";

  const parsedInnhold = page.innhold;
  return (
    <FaktasideProvider {...page}>
      <SEO title={tittel} description={beskrivelse} lang={lang} path={path} />
      <FaktaSideLayout
        wordCountRef={wordCountRef}
        header={tittel}
        beskrivelse={beskrivelse}
        publiseringsTidspunkt={page.publiseringsTidspunkt}
        kortFortalt={props.pageContext.kortFortalt}
      >
        <GraphQLErrorList errors={props.errors} />
        <InnholdetErTilpasset />
        <Notifikasjoner notifikasjoner={props.pageContext.notifikasjoner} />
        <div ref={wordCountRef}>
          <BlockContent blocks={parsedInnhold} />
          <RelatertInformasjon blocks={page.relatertInformasjon} />
        </div>
      </FaktaSideLayout>
    </FaktasideProvider>
  );
}

export default withErrorBoundary(FaktaSide, "FaktaSide");
