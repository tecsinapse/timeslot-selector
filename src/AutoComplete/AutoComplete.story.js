import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { useManualQuery } from 'graphql-hooks';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import AutoComplete from './AutoComplete';

const CONTINENTS_QUERY = `query continents {
	continents {
		code
	  name
	}
  }`;

const options = fetch => async inputValue => {
  const {
    data: { continents },
  } = await fetch();
  return continents
    .map(continent => ({
      id: continent.code,
      label: continent.name,
    }))
    .filter(continent =>
      continent.label.toLowerCase().startsWith(inputValue.toLowerCase())
    );
};

const AutoCompleteExample = () => {
  const [values, setValues] = useState([]);
  const [fetch] = useManualQuery(CONTINENTS_QUERY);

  return (
    <div style={{ width: '300px' }}>
      <AutoComplete
        options={options(fetch)}
        values={values}
        onDeleteItem={value =>
          setValues(oldValues => oldValues.filter(v => v.id !== value.id))
        }
        onSelectItem={suggestion =>
          setValues(oldValues => [...oldValues, suggestion])
        }
        inputProps={{
          label: 'Search for continents',
        }}
      />
    </div>
  );
};

storiesOf(`${GROUPS.FORMS}|Autocomplete`, module)
.addDecorator(muiTheme(createMuiTheme({spacing: 1})))
.add('Autocomplete', () => (
  <AutoCompleteExample />
));
