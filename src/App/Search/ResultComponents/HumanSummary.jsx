import React from 'react';
import { KeywordsSection, NLPKeywordsSection } from './Keywords';
import { Header, Popup, Label } from 'semantic-ui-react';

export function HumanSummarySection(summary, fields) {
  if (summary.length) {
    return (
      <div>
        <Popup
          position="top center"
          content="Thus summary was submitted to COVIDScholar by a human expert."
          trigger={
            <Label as="h5" horizontal>
              User-submitted summary:
            </Label>
          }
        />
        <span className="msweb-is-darkcyan-txt">{summary}</span>
        {/*<div*/}
        {/*  className="my-1 ml-1 mr-3 msweb-is-darkcyan-txt"*/}
        {/*  dangerouslySetInnerHTML={{*/}
        {/*    __html: summary*/}
        {/*  }}*/}
        {/*  style={{display: "inline-block"}}*/}
        {/*/>*/}
      </div>
    );
  } else {
    let params = {
      link: encodeURIComponent(fields.link),
      doi: encodeURIComponent(fields.doi),
      abstract: encodeURIComponent(fields.abstract)
    };

    // If url with params is too long, delete the abstract
    if (params.abstract && params.abstract.length > 2048) {
      params.abstract = '';
    }
    let gform_url =
      'https://docs.google.com/forms/d/e/1FAIpQLSf4z7LCBizCs6pUgO3UyfxJMCAVC-bRh3cvW7uNghDu4UeBig/viewform?usp=pp_url';
    let true_url =
      gform_url +
      '&entry.101149199=' +
      params.link +
      '&entry.1258141481=' +
      params.doi +
      '&entry.112702407=' +
      params.abstract;
    return (
      <div>
        <div className="my-1 ml-1 mr-3 human-summary-submission">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={true_url}
            className="float-right"
          >
            Submit/fix metadata
          </a>
        </div>
      </div>
    );
  }
}

export default { HumanSummarySection };
