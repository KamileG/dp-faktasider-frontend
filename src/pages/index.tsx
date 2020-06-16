import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Header from '../templates/felles/Header';
import useFaktasiderSumary from '../utils/useFaktasiderSumary';
import localizeSanityContent from '../i18n/localizeSanityContent';
import { useLocale } from '../i18n/LocaleContext';
import { useTranslation } from 'react-i18next';

const StyledElement = styled.div`
  background-color: white;
  padding: 1.2rem 1.2rem 2rem;
  border-radius: 0.5rem;
`;

const Style = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${StyledElement} {
    flex-basis: 25rem;
    margin: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const KunTilgjengeligStyle = styled.p`
  text-align: center;
  opacity: 0.7;
  margin: 1rem 0 !important;
`;

const IndexPage = () => {
  const oppsett = useStaticQuery(
    graphql`
      query Oppsett {
        oppsett: sanityOppsett {
          title: _rawTitle
        }
      }
    `
  );
  const sider = useFaktasiderSumary();
  const lang = useLocale();
  const { t } = useTranslation('global');

  return (
    <>
      <Header heading={localizeSanityContent(oppsett.oppsett.title, lang)} ingress="" />
      <Style>
        {sider.map((side) => (
          <StyledElement>
            <StyledLink to={side.path}>{side.tittel}</StyledLink>
            {!side.tilgjengeligPåValgtSpråk && (
              <KunTilgjengeligStyle>
                ({t('kunTilgjengeligPå')} {t(side.språk)})
              </KunTilgjengeligStyle>
            )}
            <p>{side.ingress}</p>
          </StyledElement>
        ))}
      </Style>
    </>
  );
};

export default IndexPage;
