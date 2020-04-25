import React from 'react';
import styled from 'styled-components';
import { Card, Icon, Label, Popup } from 'semantic-ui-react';
import Moment from 'react-moment';
import Link from 'App/shared/components/Link';
// import { nameFormatter } from 'App/shared/utils/formatter';
import ReadMore from './ReadMore';
import AuthorsJournalDate from './ResultComponents/AuthorsJournalDate';
import { authorFormatter } from '../shared/utils/formatter';

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
    width: 100%;
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

  a.float-right {
    float: right;
    margin-right: 0.25em;
    color: #de0008;
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

const tagToColor = {
  Diagnosis: 'red',
  Mechanism: 'yellow',
  Treatment: 'green',
  Case_Report: 'blue',
  Prevention: 'violet',
  Epidemic_Forecasting: 'brown',
  Transmission: 'black'
};

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

function cardCategory({ tags }) {
  tags = tags || [];
  return (
    <div style={{ margin: '0.5em' }}>
      {tags.map((tag, i) => (
        <span key={i} className={'ui tag small label ' + tagToColor[tag]}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function getSummaryFixLink({ link, doi, abstract }) {
  // If url with params is too long, delete the abstract
  if (abstract && abstract.length > 2048) {
    abstract = '[#Abstract too long, redacted#]';
  }
  let gform_url =
    'https://docs.google.com/forms/d/e/1FAIpQLSf4z7LCBizCs6pUgO3UyfxJMCAVC-bRh3cvW7uNghDu4UeBig/viewform?usp=pp_url';
  return (
    gform_url +
    '&entry.101149199=' +
    link +
    '&entry.1258141481=' +
    doi +
    '&entry.112702407=' +
    abstract
  );
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
    tags,
    source,
    citations_count_total
  },
  onSearchSimilar,
  isFieldSetAll
}) {
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
              <Popup
                position="top center"
                content="This is a dynamic summary of the abstract of the paper, showing the matched query terms and surrounding context."
                trigger={<Label horizontal>Abstract</Label>}
              />
              <ReadMore long={content.join(' ')} />
            </div>
          )}
          {body && (
            <div>
              <Popup
                position="top center"
                content="This is a dynamic summary of the body of the paper, showing the matched query terms and surrounding context."
                trigger={<Label horizontal>Full Text</Label>}
              />
              {body}
            </div>
          )}
          {abstract_t5 && (
            <div>
              <Label horizontal>
                Machine Generated Summary
                <Explanation text="This is a short summary of the abstract, generated using a Natural Language Processing Model (T5)." />
              </Label>
              {formatText(abstract_t5)}
            </div>
          )}
          {cardCategory({ tags })}

          {onSearchSimilar && (
            <FunctionLink onClick={onSearchSimilar}>
              Search within related articles
            </FunctionLink>
          )}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={'float-right'}
            href={getSummaryFixLink({ link: null, doi, abstract })}
          >
            Submit/fix metadata
          </a>
        </Card.Content>
      )}
    </StyledCard>
  );
}

export default ResultCard;
