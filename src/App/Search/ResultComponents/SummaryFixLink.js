import React from 'react';

export default function SummaryFixLink({ link, doi, abstract }) {
  // If url with params is too long, delete the abstract
  if (abstract && abstract.length > 2048) {
    abstract = '[#Abstract too long, redacted#]';
  }
  let gform_url =
    'https://docs.google.com/forms/d/e/1FAIpQLSf4z7LCBizCs6pUgO3UyfxJMCAVC-bRh3cvW7uNghDu4UeBig/viewform?usp=pp_url';
  let query = new URLSearchParams();
  query.set('entry.101149199', link);
  query.set('entry.1258141481', doi);
  query.set('entry.112702407', abstract);
  let url = gform_url + query.toString();

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={'float-right'}
      href={url}
    >
      Submit/fix metadata
    </a>
  );
}
