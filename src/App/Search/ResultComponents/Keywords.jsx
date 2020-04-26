import React from 'react';
import { Label, Popup } from 'semantic-ui-react';

export function KeywordsSection(keywords) {
  if (keywords.length) {
    return (
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
        <span className="font-weight-bold">{keywords.join(', ')}</span>
        {/*<div*/}
        {/*  className="my-1 ml-1 mr-3 msweb-is-darkcyan-txt"*/}
        {/*  dangerouslySetInnerHTML={{*/}
        {/*    __html: summary*/}
        {/*  }}*/}
        {/*  style={{display: "inline-block"}}*/}
        {/*/>*/}
      </div>
      // <div>
      //   <div className="my-1 ml-1 mr-3 font-weight-bold">
      //     {' '}
      //     User-submitted keywords:{' '}
      //   </div>
      //   <div
      //     className="my-1 ml-1 mr-3 font-weight-bold msweb-is-dimgray-txt"
      //     dangerouslySetInnerHTML={{
      //       __html: keywords
      //     }}
      //   />
      // </div>
    );
  }
  return null;
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
