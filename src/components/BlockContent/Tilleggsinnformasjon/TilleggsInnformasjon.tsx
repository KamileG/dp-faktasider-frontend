import * as React from 'react';
import { useEffect, useReducer, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import BlockContent from '../BlockContent';
import { SanityBlock } from '../../../utils/richTextUtils/richTextTypes';
import parseRichText from '../../../utils/richTextUtils/parser/parseRichText';
import withErrorBoundary from '../../withErrorBoundary';
import { Undertekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import useUniqueId from '../../../utils/useUniqueId';
import { theme } from '../../../styles/theme';
import VisMerPanel from './VisMerPanel';
import { loggVisTilleggsinfo } from '../../../utils/logging';
import { usePrevious } from 'react-use';

interface Props {
  node: {
    innhold: SanityBlock[];
    title: string;
  };
}

const asideBorder = `solid .1rem ${theme.colors.navBlaLighten80}`;

const StyledAside = styled.aside<{ isOpen: boolean }>`
  border-top: ${asideBorder};
  border-bottom: ${asideBorder};
  padding: 1.5rem 0.5rem;
  margin: 1.5rem 0;
  transition: 0.3s;
  ${(props) =>
    props.isOpen &&
    css`
      background-color: #f0f0f0;
    `}
`;

const Label = styled(Undertekst)`
  opacity: 0.75;
  font-size: 0.7rem;
  margin: 0 !important;
  text-transform: uppercase;
`;

const StyledHeading = styled.h1.attrs({ className: 'typo-element' })`
  margin-top: 0;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  ${StyledHeading} {
    order: 2;
  }
`;

function Tilleggsinnformasjon(props: Props) {
  const parsedText = parseRichText(props.node.innhold);
  const [open, toggle] = useReducer((state) => !state, false);
  const id = useUniqueId('tilleggsinfo-' + props.node.title);
  const { t } = useTranslation('global');
  const ref = useRef<HTMLHeadingElement>(null);

  const prevOpen = usePrevious(open);
  useEffect(() => {
    !prevOpen && open && loggVisTilleggsinfo(props.node.title);
  }, [open, prevOpen, props.node.title]);

  useEffect(() => {
    !prevOpen && open && ref.current?.focus(); // For accessibility/skjermleser og for at panelet skal åpne seg nedover istedenfor å forsvinne opp og ut av synsfeltet.
  });

  return (
    <StyledAside aria-labelledby={id} isOpen={open}>
      <StyledHeader>
        <StyledHeading id={id} tabIndex={-1} ref={ref}>
          {props.node.title}
        </StyledHeading>
        <Label>{t('tilleggsinformasjon')}</Label>
      </StyledHeader>
      <VisMerPanel toggle={toggle} open={open}>
        <BlockContent blocks={parsedText} />
      </VisMerPanel>
    </StyledAside>
  );
}

export default withErrorBoundary(Tilleggsinnformasjon, 'Tilleggsinnformasjon');
