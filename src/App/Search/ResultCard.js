import React from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import Link from 'App/shared/components/Link';
import ReadMore from './ReadMore';
import AuthorsJournalDate from './ResultComponents/AuthorsJournalDate';
import { authorFormatter } from '../shared/utils/formatter';
import { KeywordsSection } from './ResultComponents/Keywords';
import { HumanSummarySection } from './ResultComponents/HumanSummary';
import SummaryFixLink from './ResultComponents/SummaryFixLink';
import { CardCategory } from './ResultComponents/CardCategory';
import { docTypeToColor } from '../Theme';

const StyledCard = styled(Card)`
  && {
    margin-top: 1.5em !important;
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

    .ribbon {
      position: absolute;
      left: -16px;
      top: -15px;
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

  &.ui.card.purple {
    box-shadow: 0 0 0 1px #d4d4d5, -3px 0 0 0 #6c00ba, 0 1px 3px 0 #d4d4d5;
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
    href="."
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
  >
    {props.children}
  </a>
);

// function SourceAndCitations({ source, citations_count_total }) {
//   const showCitations = citations_count_total > 0;
//   if (!source && !showCitations) return null;
//   return (
//     <div>
//       {source && (
//         <>
//           <b>Source: </b>
//           {source}
//         </>
//       )}
//       {source && showCitations && <>, </>}
//       {showCitations && (
//         <>
//           <b>Citations: </b>
//           {citations_count_total}
//         </>
//       )}
//     </div>
//   );
// }

function authorsList(authors) {
  if (!authors) return '';
  return authors.map(authorFormatter).join(', ');
}

function LoadingFakeCard() {
  return (
    <StyledCard>
      <div className={'ui fluid placeholder'}>
        <Card.Content className={'paragraph'} style={{ padding: 0 }}>
          <div className={'line'} style={{ marginBottom: '0.5em' }}>
            &nbsp;
          </div>
          <div className={'line'} style={{ marginBottom: '0.5em' }}>
            &nbsp;
          </div>
          <div className={'line'} style={{ marginBottom: '0.5em' }}>
            &nbsp;
          </div>
          <div className={'line'} style={{ marginBottom: '0.5em' }}>
            &nbsp;
          </div>
          <div className={'line'} style={{ marginBottom: '0.5em' }}>
            &nbsp;
          </div>
          <div className={'line'} style={{ marginBottom: '0.5em' }}>
            &nbsp;
          </div>
        </Card.Content>
      </div>
    </StyledCard>
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
    authors,
    source_display,
    summary_human,
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
  const content = formatText(abstract);
  // const body = formatText(body_text);
  title = title || doi || link || id;
  const highlightedTitle = title.replace(highlightRegex, '$1');
  keywords = keywords ? keywords : [];
  keywords_ml = keywords_ml ? keywords_ml : [];
  const combined_keywords = keywords.concat(keywords_ml);

  return (
    <StyledCard className={docTypeToColor[document_type]}>
      <Card.Header>
        {source_display === 'COVIDScholar Submission' ? (
          <span className="ui grey ribbon label">
            COVIDScholar User Submission
          </span>
        ) : (
          ''
        )}

        <Link className="title larger-txt" to={`/article/${id}`}>
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

      <Card.Content>
        {content && (
          <div>
            <ReadMore long={content.join(' ')} />
          </div>
        )}
        <KeywordsSection keywords={combined_keywords.slice(0, 10)} />
        <HumanSummarySection summary_human={summary_human} />
        <CardCategory tags={tags} onFilterCategory={onFilterCategory} />

        {onSearchSimilar && (
          <FunctionLink onClick={onSearchSimilar}>
            Search within related articles
          </FunctionLink>
        )}
        <SummaryFixLink
          link={link}
          doi={doi}
          abstract={abstract}
          title={title}
        />
      </Card.Content>
    </StyledCard>
  );
}

export { ResultCard, LoadingFakeCard };
