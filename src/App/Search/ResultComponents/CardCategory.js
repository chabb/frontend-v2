import { Label, Popup } from 'semantic-ui-react';
import React from 'react';

const tagToColor = {
  Diagnosis: 'orange',
  Mechanism: 'yellow',
  Treatment: 'teal',
  Case_Report: 'purple',
  Prevention: 'violet',
  Epidemic_Forecasting: 'brown',
  Transmission: 'black'
};

function CardCategory({ tags, onFilterCategory }) {
  tags = tags || [];
  return tags.length > 0 ? (
    <div className={'category'}>
      <Popup
        position="top center"
        content="This is a machine-learned categorization of the paper."
        trigger={
          <Label as={'h5'} horizontal>
            Categories
          </Label>
        }
      />
      {tags.map((tag, i) => (
        <span
          key={i}
          className={'ui basic small label ' + tagToColor[tag]}
          onClick={e => {
            onFilterCategory(tag);
            e.preventDefault();
          }}
          style={{ cursor: 'pointer' }}
        >
          {tag}
        </span>
      ))}
    </div>
  ) : (
    ''
  );
}

export { tagToColor, CardCategory };
