import React from 'react';
import { Label, Popup } from 'semantic-ui-react';

export function KeywordsSection({ keywords }) {
  console.log(keywords);
  return keywords && keywords.length ? (
    <div>
      <Popup
        position="top center"
        content="Keywords submitted by users and/or extracted with our custom NLP models."
        trigger={
          <Label as="h5" horizontal>
            Keywords:
          </Label>
        }
      />
      <div className="msweb-is-dimgray-txt font-weight-bold">
        {keywords.slice(0, 10).join(', ')}
      </div>
    </div>
  ) : (
    ''
  );
}

export function NLPKeywordsSection(keywordsML) {
  if (keywordsML.length) {
    return (
      <div>
        <div className="my-1 ml-1 mr-3 font-weight-bold">
          {' '}
          NLP-generated keywords:{' '}
        </div>
        <div
          className="my-1 ml-1 mr-3 font-weight-bold msweb-is-dimgray-txt"
          dangerouslySetInnerHTML={{
            __html: keywordsML
          }}
        />
      </div>
    );
  }
  return null;
}

export default { KeywordsSection, NLPKeywordsSection };
