import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import faker from 'faker';
import { Button, Checkbox, Form, Dropdown } from 'semantic-ui-react';

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index]
}));

const filters = [
  {
    name: 'COVID-19 Only',
    field: 'is_covid19'
  },
  {
    name: 'Peer Reviewed',
    field: 'is_preprint'
  },
  {
    name: 'Year Published',
    field: 'year'
  },
  { name: 'Data Source', field: 'source_display' },
  {
    name: 'Document Type',
    field: 'document_type'
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
`;

function filterOutUndesiredCheckboxes(field, value) {
  if (value.length <= 0) {
    return false;
  } else if (field === 'is_covid19' && value === false) {
    return false;
  } else if (field === 'is_preprint' && value === false) {
    return false;
  } else {
    return true;
  }
}

function Checkboxes({ name, field, values, onSearch }) {
  console.log(values);
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
            key={i}
            name={name}
            value={value}
            onChange={onChange}
            label={`${value} (${count})`}
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
    <div
      id="sidebar"
      className="ui form"
      style={{
        backgroundColor: '#e6eff5',
        paddingLeft: '10px',
        paddingRight: '10px'
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
      {filters.map(({ name, field }) => (
        <Checkboxes
          key={field}
          name={name}
          field={field}
          values={filterValues[field]}
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
  );
}

export default Sidebar;
