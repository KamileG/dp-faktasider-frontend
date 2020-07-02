import * as React from 'react';
import BlockContent from '../BlockContent';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import { useGroupMarkupAriaProps } from './useGroupMarkupAriaProps';
import Anchor from '../../Anchor';

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
  position: relative;
`;

const StyledElement = styled(Element)`
  text-align: center;
  margin: 3rem 0 0.7rem;
`;

function H4GroupMarkup(props: Group) {
  const { regionProps, headerProps, id } = useGroupMarkupAriaProps(props);

  return (
    <StyledSection {...regionProps}>
      <Anchor id={id} marginTop="4rem" focusOnParent={true} />
      <StyledElement tag="h4" {...headerProps}>
        {props.title}
      </StyledElement>
      <BlockContent blocks={props.children} />
    </StyledSection>
  );
}

export default H4GroupMarkup;
