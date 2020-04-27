import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { navigate } from '@reach/router';
import { uniq } from 'lodash';
import { Container, Header, Tab, List } from 'semantic-ui-react';
import { Error, Loading } from 'App/shared/components/Messages';
import NavMenu from 'App/shared/components/NavMenu';
import { Get } from 'App/shared/Fetcher';
import ResultCard from 'App/Search/ResultCard';
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
  abstract_t5,
  authors,
  doi,
  journal,
  timestamp,
  source,
  license,
  link
}) {
  return (
    <ContainerContent>
      <Header as="h1">
        <Link to={link}>{title}</Link>
      </Header>
      <Authors authors={authors} />
      {abstract && (
        <>
          <Header as="h3">Abstract</Header>
          <p>{abstract}</p>
          {abstract_t5 && (
            <>
              <Header as="h3">Machine Generated Summary</Header>
              <p>{abstract_t5}</p>
            </>
          )}
        </>
      )}
      <Meta {...{ journal, timestamp, source, license, doi }} />
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
  return (
    <Container>
      {citedBy.slice(offset, offset + 10).map(id => (
        <Citation key={id} id={id} />
      ))}
      <Pagination {...{ total, offset, onOffsetChange }} />
    </Container>
  );
}

function Citation({ id }) {
  const { loading, response, error } = Get(
    `/document/v1/covid-19/doc/docid/${id}?fieldSet=doc:title,abstract,doi,abstract_t5,journal,source,timestamp,license`
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

  const citations = uniq([
    ...(response.fields.cited_by || []),
    ...(response.fields.citations_inbound || [])
      .map(c => c.source_id)
      .filter(c => !isNaN(c))
  ]);

  const panes = [
    {
      menuItem: 'Similar articles by Sent-SciBERT',
      render: () => <Related id={response.fields.id} specter={false} />
    },
    {
      menuItem: 'Similar articles by SPECTER',
      render: () => <Related id={response.fields.id} specter={true} />
    },
    {
      menuItem: {
        key: 'citations',
        content: `${citations.length} citing articles`,
        disabled: citations.length === 0
      },
      render: () => (
        <CitedBy
          citedBy={citations}
          offset={parseInt(url.searchParams.get('offset')) || 0}
          total={citations.length}
          onOffsetChange={offset => {
            url.searchParams.set('offset', offset);
            navigate(url);
          }}
        />
      )
    }
  ];

  return (
    <React.Fragment>
      <Box width={1}>
        <Box width={1}>
          <NavMenu logo="show" />
        </Box>
        <ContainerContent>
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
