import { useCallback, useEffect, useState } from 'react';
import { pxFromTop } from '../../../utils/domUtils';
import { idFromString } from '../../../utils/routingUtils';
import styled, { css } from 'styled-components';
import { LenkeUtenUnderstrek } from '../../../utils/common-styled-components';
import useSmoothscrollOnClick from '../../../hooks/useSmoothscrollOnClick';
import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
  menuItems: string[];
}

const StyledOl = styled.ol`
  max-height: 80vh;
  overflow-y: auto;
  li {
    margin: 1rem 0;
  }
`;

const StyledLenke = styled(LenkeUtenUnderstrek)<{ erValgt: boolean }>`
  ${(props) =>
    props.erValgt &&
    css`
      color: black !important;
    `};
`;

function useCurrentlyViewedMenuItem(items: string[]): string | undefined {
  const [current, setCurrent] = useState<string | undefined>();

  const updateCurrentlyViewedMenuItem = useCallback(() => {
    const current = items
      .map((it) => ({ item: it, fromTop: pxFromTop(idFromString(it)) }))
      .filter((it) => it.fromTop < window.innerHeight / 3)
      .pop()?.item;
    setCurrent(current);
  }, [items]);

  useEffect(() => {
    window.addEventListener('scroll', updateCurrentlyViewedMenuItem, { passive: true });
    return () => window.removeEventListener('scroll', updateCurrentlyViewedMenuItem);
  }, [updateCurrentlyViewedMenuItem]);

  return current;
}

function MenuItem(props: { item: string; current: boolean }) {
  const { SmoothScroll, activateSmoothScroll } = useSmoothscrollOnClick();

  return (
    <li key={props.item} onClick={activateSmoothScroll}>
      <SmoothScroll />
      <StyledLenke erValgt={props.current} href={`#${idFromString(props.item)}`}>
        {props.item}
      </StyledLenke>
    </li>
  );
}

function InnholdsListe(props: Props) {
  const currentlyViewedItem = useCurrentlyViewedMenuItem(props.menuItems);

  return (
    <>
      <StyledOl>
        <Undertittel>Innhold</Undertittel>
        {props.menuItems.map((item) => (
          <MenuItem key={item} item={item} current={currentlyViewedItem === item} />
        ))}
      </StyledOl>
    </>
  );
}

export default InnholdsListe;