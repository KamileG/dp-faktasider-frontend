import React from 'react';

import SEO from '../components/seo';

export const query = graphql`
  query Titles {
    titles: allSanityFaktaSide {
      edges {
        node {
          title {
            nb
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  var titles = props.data.titles.edges.map((edge) => edge.node.title.nb);
  return (
    <div>
      <SEO title="Home" />
      {titles.map((title) => (
        <h2 key={title}>{title}</h2>
      ))}
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
    </div>
  );
};

export default IndexPage;
