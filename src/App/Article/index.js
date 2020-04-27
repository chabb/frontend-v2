import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { navigate } from '@reach/router';
import { uniqBy } from 'lodash';
import { Container, Header, Tab, List, Button } from 'semantic-ui-react';
import { Error, Loading } from 'App/shared/components/Messages';
import NavMenu from 'App/shared/components/NavMenu';
import { Get, Post } from 'App/shared/Fetcher';
import { ResultCard } from 'App/Search/ResultCard';
import Link from 'App/shared/components/Link';
import { authorFormatter } from 'App/shared/utils/formatter';
import Pagination from 'App/shared/components/Pagination';
import Footer from 'App/shared/components/Footer';
import { Box } from 'rebass';

const ContainerContent = styled(Container)`
  &&& {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

function Authors({ authors }) {
  if (!authors) return null;
  return (
    <Header.Subheader>
      {authors.map(authorFormatter).join(', ')}
    </Header.Subheader>
  );
}

function Meta({ journal, timestamp, source, license, doi }) {
  const format = journal ? ' (YYYY-MM-DD)' : 'YYYY-MM-DD';
  const date = timestamp ? (
    <Moment format={format} unix utc>
      {timestamp * 1000}
    </Moment>
  ) : null;

  return (
    <List>
      {doi && (
        <List.Item>
          <List.Header>Doi</List.Header>
          <Link to={'https://doi.org/' + doi}>{doi}</Link>
        </List.Item>
      )}
      {journal ? (
        <List.Item>
          <List.Header>Journal</List.Header>
          {journal} {date}
        </List.Item>
      ) : (
        <List.Item>
          <List.Header>Date</List.Header>
          {date}
        </List.Item>
      )}
      {source && (
        <List.Item>
          <List.Header>Source</List.Header>
          {source}
        </List.Item>
      )}
      {license && (
        <List.Item>
          <List.Header>License</List.Header>
          {license}
        </List.Item>
      )}
    </List>
  );
}

function Content({
  title,
  abstract,
  authors,
  doi,
  journal,
  timestamp,
  source_display,
  license,
  link
}) {
  return (
    <ContainerContent>
      <Header as="h1">
        <Link to={link}>{title}</Link>
      </Header>
      <Authors authors={authors} />
      <Meta {...{ journal, timestamp, source_display, license, doi }} />
      {abstract && (
        <>
          <Header as="h3">Abstract</Header>
          <p>{abstract}</p>
        </>
      )}
    </ContainerContent>
  );
}

function Related({ id, specter }) {
  const query = new URLSearchParams();
  query.set('id', id);
  query.set('summary', 'short');
  query.set('hits', 5);
  if (specter) query.set('use-specter', true);
  const { loading, response, error } = Get(
    '/search/?' + query.toString()
  ).state();

  if (loading) return <Loading message="Searching..." />;
  if (error)
    return <Error message={error.message || 'Unknown search error...'} />;

  if (!('children' in response.root)) return null;
  return (
    <Tab.Pane>
      <React.Fragment>
        {response.root.children.map((article, i) => (
          <ResultCard key={i} {...article} />
        ))}
        <Link to={`/search/?query=related_to:${id}&use-specter=${specter}`}>
          Show more
        </Link>
      </React.Fragment>
    </Tab.Pane>
  );
}

function CitedBy({ citedBy, total, offset, onOffsetChange }) {
  const { loading, response, error } = Post('/dois/', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(citedBy.map(c => c.doi))
  }).state();

  if (loading) return <Loading message="Loading..." />;
  if (error)
    return (
      <Error message={error.message || `Failed to load article citations`} />
    );

  let citations_id = citedBy
    .map(c => {
      return { doi: c, id: response[c.doi], direction: c.direction };
    })
    .filter(c => c.id);

  return (
    <Container>
      {citations_id.slice(offset, offset + 10).map(c => (
        <Citation key={c.id} id={c.id} direction={c.direction} />
      ))}
      <Pagination {...{ total, offset, onOffsetChange }} />
    </Container>
  );
}

function Citation({ id, direction }) {
  const { loading, response, error } = Get(
    `/document/v1/covid-19/doc/docid/${id}?fieldSet=doc:title,abstract,doi,journal,source_display,timestamp,license`
  ).state();

  if (loading) return <Loading message="Loading..." />;
  if (error)
    return <Error message={error.message || `Failed to load article #${id}`} />;

  return <ResultCard {...response} />;
}

function Article({ id }) {
  const url = new URL(window.location);
  const { loading, response, error } = Get(
    `/document/v1/covid-19/doc/docid/${id}`
  ).state();

  if (loading) return <Loading message="Loading..." />;
  if (error)
    return <Error message={error.message || `Failed to load article #${id}`} />;

  const citations_inbound = (response.fields.references || [])
    .filter(c => c.doi)
    .map(c => {
      return {
        doi: c.doi.replace(/^[\s"'[]+|[\s\]'"]+$/g, ''),
        direction: 'in'
      };
    });
  const citations_outbound = (response.fields.cited_by || []).map(c => {
    return { doi: c.replace(/^[\s"'[]+|[\s\]'"]+$/, ''), direction: 'out' };
  });
  const citations_doi = uniqBy(
    [...citations_inbound, ...citations_outbound],
    c => c.doi
  );

  let panes = [];
  if (response.fields.abstract) {
    panes.push({
      menuItem: 'Similar articles by Document Embedding',
      render: () => <Related id={response.fields.id} specter={false} />
    });
  }
  panes.push({
    menuItem: {
      key: 'citations',
      content: `${citations_doi.length} citing/referencing articles`,
      disabled: citations_doi.length === 0
    },
    render: () => (
      <CitedBy
        citedBy={citations_doi}
        offset={parseInt(url.searchParams.get('offset')) || 0}
        total={citations_doi.length}
        onOffsetChange={offset => {
          url.searchParams.set('offset', offset);
          navigate(url);
        }}
      />
    )
  });

  return (
    <React.Fragment>
      <Box width={1}>
        <Box width={1}>
          <NavMenu logo="show" />
        </Box>

        <ContainerContent>
          <Button size="small" onClick={() => navigate(-1)}>
            {' '}
            Go Back{' '}
          </Button>
          <Content {...response.fields} />
          <Tab
            panes={panes}
            defaultActiveIndex={url.searchParams.get('tab') || 0}
            style={{
              width: '100%',
              overflowX: 'scroll'
            }}
            // onTabChange={(e, tabInfo) => {
            //   // Reset all query params when changing tab
            //   [...url.searchParams.keys()].forEach(k =>
            //     url.searchParams.delete(k)
            //   );
            //   url.searchParams.set('tab', tabInfo.activeIndex);
            //   navigate(url);
            // }}
          />
        </ContainerContent>
        <Footer page={'article'} />
      </Box>
    </React.Fragment>
  );
}

export default Article;
