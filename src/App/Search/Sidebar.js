import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import faker from 'faker';
import { Button, Checkbox, Form, Dropdown } from 'semantic-ui-react';
import { tagToColor, docTypeToColor } from 'App/Theme';

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index]
}));

const filters = [
  {
    name: 'COVID-19 Only',
    field: 'is_covid19',
    colormap: null
  },
  {
    name: 'Peer Reviewed',
    field: 'is_preprint',
    colormap: null
  },
  {
    name: 'Document Type',
    field: 'document_type',
    colormap: docTypeToColor
  },
  {
    name: 'Tag',
    field: 'tags',
    colormap: tagToColor
  },
  {
    name: 'Year Published',
    field: 'year',
    colormap: null
  },
  {
    name: 'Data Source',
    field: 'source_display',
    colormap: null
  }
];

const PaddedCheckbox = styled(Checkbox)`
  && {
    display: block;
    padding: 2px;
    font-size: 0.9em;
    label {
      color: #303030;
    }
  }

  &&.red > label {
    color: #db2828 !important;
  }
  &&.orange > label {
    color: #f2711c !important;
  }
  &&.yellow > label {
    color: #fbbd08 !important;
  }
  &&.olive > label {
    color: #b5cc18 !important;
  }
  &&.green > label {
    color: #21ba45 !important;
  }
  &&.teal > label {
    color: #00b5ad !important;
  }
  &&.blue > label {
    color: #2185d0 !important;
  }
  &&.violet > label {
    color: #6435c9 !important;
  }
  &&.purple > label {
    color: #a333c8 !important;
  }
  &&.pink > label {
    color: #e03997 !important;
  }
  &&.brown > label {
    color: #a5673f !important;
  }
  &&.gray > label {
    color: #767676 !important;
  }
  &&.black > label {
    color: #1b1c1d !important;
  }
`;

function filterOutUndesiredCheckboxes(field, value) {
  if (value.length <= 0) {
    return false;
  } else if (field === 'is_covid19' && value === 'false') {
    return false;
  } else if (field === 'is_preprint' && value === 'true') {
    return false;
  } else {
    return true;
  }
}

function formatFacetLabel(field, value) {
  if (field === 'is_preprint' && value === 'false') {
    return 'true';
  } else {
    return value;
  }
}

function Checkboxes({ name, field, values, colormap, onSearch }) {
  if (!values || values.length === 0) return null;
  const onChange = (event, { value, checked }) => {
    // The new selected checkboxes are the ones that were previously selected
    // and the current value of the checkbox that triggered the event
    const selected = values
      .filter(({ value: oValue, checked: oChecked }) =>
        oValue === value ? checked : oChecked
      )
      .map(({ value: oValue }) => oValue);
    onSearch({ [field]: selected });
  };

  return (
    <Form.Field>
      <label>{name}</label>
      {values
        .filter(({ value }) => filterOutUndesiredCheckboxes(field, value))
        .map(({ value, count, checked }, i) => (
          <PaddedCheckbox
            className={(colormap && colormap[value]) || ''}
            key={i}
            name={name}
            value={value}
            onChange={onChange}
            label={`${formatFacetLabel(field, value)} (${count})`}
            checked={checked}
          />
        ))}
    </Form.Field>
  );
}

function Sidebar({ onSearch, ...filterValues }) {
  const noneChecked =
    Object.values(filterValues)
      .flatMap(values => values.map(({ checked }) => checked))
      .find(c => c) !== true;
  return (
    <div id="sidebar" className="ui form">
      <div
        style={{
          backgroundColor: '#e6eff5',
          padding: '10px'
        }}
      >
        <Button
          disabled={noneChecked}
          onClick={() =>
            onSearch(
              filters.reduce((obj, { field }) => ({ ...obj, [field]: [] }), {})
            )
          }
        >
          Clear all
        </Button>
        {filters.map(({ name, field, colormap }) => (
          <Checkboxes
            key={field}
            name={name}
            field={field}
            values={filterValues[field]}
            colormap={colormap}
            onSearch={onSearch}
          />
        ))}
        <Dropdown
          placeholder="Keywords"
          fluid
          multiple
          search
          selection
          options={stateOptions}
        />
      </div>
    </div>
  );
}

export default Sidebar;
