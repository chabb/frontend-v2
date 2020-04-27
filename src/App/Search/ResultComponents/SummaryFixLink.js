import React from 'react';

export default function SummaryFixLink({ link, doi, abstract, title }) {
  // If url with params is too long, delete the abstract
  let query = new URLSearchParams();
  const title_length = title ? title.length : 0;
  const abstract_length = abstract ? abstract.length : 0;

  if (title_length + abstract_length < 2048) {
    if (title) {
      query.set('entry.1395202514', title.replace(/<[^>]+>/g, ''));
      console.log(query.toString());
    }
    if (abstract) {
      query.set('entry.112702407', abstract.replace(/<[^>]+>/g, ''));
      console.log('WITH ABSTRACT', query.toString());
    }
  } else {
    if (title && title_length < 2048) {
      query.set('entry.1395202514', title.replace(/<[^>]+>/g, ''));
      console.log('ONLY TITLE', query.toString());
    }
  }
  if (link) {
    query.set('entry.101149199', link);
  }
  if (doi) {
    query.set('entry.1258141481', doi);
  }
  let gform_url =
    'https://docs.google.com/forms/d/e/1FAIpQLSf4z7LCBizCs6pUgO3UyfxJMCAVC-bRh3cvW7uNghDu4UeBig/viewform?usp=pp_url&';
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
