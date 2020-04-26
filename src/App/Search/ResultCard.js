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
    margin-bottom: 1em !important;

    a {
      color: #005a8e;
    }

    a:hover {
      color: #1a7db6;
    }

    a.float-right {
      float: right;
      margin-right: 0.25em;
      color: #de0008;
    }

    a.title:hover,
    a.title:focus {
      color: #205bbc !important;
    }

    .human-summary-submission a {
      color: #de0008;
      text-decoration: underline;
    }

    .content {
      padding: 0.3em 0.1em;
      border: 0;
      width: 100%;
    }

    .content > div {
      margin: 3px 0;
    }

    .category .label:not(:first-child) {
      padding: 0.25em 0.5em 0.25em 0.5em;
    }
  }

  &.ui.card.red {
    box-shadow: 0 0 0 1px #d4d4d5, -3px 0 0 0 #db2828, 0 1px 3px 0 #d4d4d5;
  }

  &.ui.card.blue {
    box-shadow: 0 0 0 1px #d4d4d5, -3px 0 0 0 #2185d0, 0 1px 3px 0 #d4d4d5;
  }

  &.ui.card.green {
    box-shadow: 0 0 0 1px #d4d4d5, -3px 0 0 0 #21ba45, 0 1px 3px 0 #d4d4d5;
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

  .larger {
    font-size: 1.25rem !important;
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
    href="#"
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
  // Diagnosis: '',
  // Mechanism: '',
  // Treatment: '',
  // Case_Report: '',
  // Prevention: '',
  // Epidemic_Forecasting: '',
  // Transmission: ''
};

const docTypeToColor = {
  paper: 'red',
  patent: 'blue',
  clinical_trial: 'green'
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

function cardCategory({ tags }, onFilterCategory) {
  tags = tags || [];
  return (
    <div className={'category'}>
      {tags.length > 0 ? (
        <Popup
          position="top center"
          content="This is a machine-learned categorization of the paper."
          trigger={<Label horizontal>Categories</Label>}
        />
      ) : (
        ''
      )}
      {tags.map((tag, i) => (
        <a
          key={i}
          href={'#'}
          className={'ui basic small label ' + tagToColor[tag]}
          onClick={e => {
            onFilterCategory(tag);
            e.preventDefault();
          }}
        >
          {tag}
        </a>
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
    source_display,
    summary,
    keywords,
    keywords_ml,
    link,
    tags,
    document_type,
    citations_count_total
  },
  onSearchSimilar,
  onFilterCategory,
  isFieldSetAll
}) {
  const keywords_dummy = ['key1', 'key2', 'key3'];
  const keywords_ml_dummy = ['mlkey1', 'mlkey2', 'mlkey3'];
  const summary_dummy = 'This was a really great paper and you should read it.';
  const content = formatText(abstract);
  const body = formatText(body_text);
  const highlightedTitle = title.replace(highlightRegex, '$1');
  return (
    <StyledCard className={docTypeToColor[document_type]}>
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
          {/*{body && (*/}
          {/*  <div>*/}
          {/*    <Popup*/}
          {/*      position="top center"*/}
          {/*      content="This is a dynamic summary of the body of the paper, showing the matched query terms and surrounding context."*/}
          {/*      trigger={<Label horizontal>Full Text</Label>}*/}
          {/*    />*/}
          {/*    {body}*/}
          {/*  </div>*/}
          {/*)}*/}

          {keywords_dummy &&
            KeywordsSection(keywords_dummy.concat(keywords_ml_dummy))}
          {HumanSummarySection(summary_dummy, {
            link: link,
            abstract: abstract,
            doi: doi
          })}

          {cardCategory({ tags }, onFilterCategory)}

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
