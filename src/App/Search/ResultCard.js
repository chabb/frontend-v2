import React from 'react';
import styled from 'styled-components';
import { Card, Icon, Label, Popup, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import Link from 'App/shared/components/Link';
import ReadMore from './ReadMore';
import AuthorsJournalDate from './ResultComponents/AuthorsJournalDate';
import { authorFormatter } from '../shared/utils/formatter';
import {
  KeywordsSection,
  NLPKeywordsSection
} from './ResultComponents/Keywords';
import { HumanSummarySection } from './ResultComponents/HumanSummary';

const StyledCard = styled(Card)`
  && {
    box-shadow: none;
    margin-bottom: 2em;

    a {
      color: #005a8e;
    }

    a:hover {
      color: #1a7db6;
    }
  }

  &.card {
    width: 100%;
    margin: 0.5em;
    padding: 1em 2em;
  }

  .header {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .title {
    font-weight: bold;
  }

  .subtitle {
    font-weight: normal;
  }

  &.card .meta {
    font-size: 0.9em;
    padding: 0 0.5em;
    color: rgba(48, 48, 48, 0.5);

    a.doi {
      float: right;
    }
  }

  .meta:after {
    content: '';
    display: table;
    clear: both;
  }

  && .content {
    //padding: 0.3em 0.5em;
    padding: 0.3em 0.1em;
    border: 0;
    width: 90%;
  }

  .larger {
    font-size: 1.25rem !important;
  }

  a.result-title:hover,
  a.result-title:focus {
    color: #205bbc !important;
  }

  .human-summary-submission a {
    color: #de0008;
    text-decoration: underline;
  }

  .has-underline {
    text-decoration: underline;
  }

  .margin20 {
    margin: 20px;
  }
`;

const ExplanationIcon = styled(Icon)`
  &&.icon {
    margin: 0 0 0 0.5em;
  }
`;

const highlightRegex = /<hi>(.*?)<\/hi>/g;
const formatText = text => {
  if (!text) return null;
  return (
    text
      .replace(/<sep \/>/g, '…')
      .split(highlightRegex)
      // The highlighted sections will be every other element starting at 1, wrap these in bold while keep others as strings
      .map((r, i) => (i % 2 === 0 ? r : <b key={i}>{r}</b>))
  );
};

// Link which has a dummy target which is ignored, only triggers the onClick callback
const FunctionLink = ({ onClick, ...props }) => (
  <a
    href="#root"
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
  >
    {props.children}
  </a>
);

function Explanation({ text }) {
  return (
    <Popup
      content={text}
      trigger={
        <span>
          <ExplanationIcon name="question circle" />
        </span>
      }
    />
  );
}

function JournalAndDate({ journal, timestamp }) {
  const format = journal ? ' (YYYY-MM-DD)' : 'YYYY-MM-DD';
  return (
    <>
      {journal && (
        <>
          <b>Journal:</b> {journal}
        </>
      )}
      {timestamp > 0 ? (
        <Moment format={format} unix utc>
          {timestamp * 1000}
        </Moment>
      ) : null}
    </>
  );
}

function DoiLink({ doi }) {
  if (!doi) return null;
  return (
    <Link className="ui doi" to={doi}>
      {doi.replace('https://doi.org/', 'doi:')}
    </Link>
  );
}

function SourceAndCitations({ source, citations_count_total }) {
  const showCitations = citations_count_total > 0;
  if (!source && !showCitations) return null;
  return (
    <div>
      {source && (
        <>
          <b>Source: </b>
          {source}
        </>
      )}
      {source && showCitations && <>, </>}
      {showCitations && (
        <>
          <b>Citations: </b>
          {citations_count_total}
        </>
      )}
    </div>
  );
}

function authorsList(authors) {
  if (!authors) return '';
  return authors.map(authorFormatter).join(', ');
}

function ResultCard({
  fields: {
    id,
    title,
    timestamp,
    journal,
    doi,
    abstract,
    abstract_t5,
    body_text,
    authors,
    source_display,
    summary,
    keywords,
    keywords_ml,
    citations_count_total,
    link
  },
  onSearchSimilar,
  isFieldSetAll
}) {
  const keywords_dummy = ['key1', 'key2', 'key3'];
  const keywords_ml_dummy = ['mlkey1', 'mlkey2', 'mlkey3'];
  const summary_dummy = 'This was a really great paper and you should read it.';
  const content = formatText(abstract);
  const body = formatText(body_text);
  const highlightedTitle = title.replace(highlightRegex, '$1');
  return (
    <StyledCard className="red card">
      <Card.Header>
        <Link className="title larger" to={`/article/${id}`}>
          {highlightedTitle}
        </Link>
        {AuthorsJournalDate(
          authorsList(authors),
          journal,
          timestamp,
          true,
          true,
          true,
          100
        )}
      </Card.Header>
      {/*<Card.Meta>*/}
      {/*  <JournalAndDate {...{ journal, timestamp }} />*/}
      {/*  <DoiLink doi={doi} />*/}
      {/*  <SourceAndCitations {...{ source, citations_count_total }} />*/}
      {/*</Card.Meta>*/}
      {(content || onSearchSimilar) && (
        <Card.Content>
          {content && (
            <div>
              <ReadMore long={content.join(' ')} />
            </div>
          )}
          {keywords_dummy &&
            KeywordsSection(keywords_dummy.concat(keywords_ml_dummy))}
          {HumanSummarySection(summary_dummy, {
            link: link,
            abstract: abstract,
            doi: doi
          })}
          {onSearchSimilar && (
            <FunctionLink onClick={onSearchSimilar}>
              Search within related articles
            </FunctionLink>
          )}
        </Card.Content>
      )}
    </StyledCard>
  );
}

export default ResultCard;
