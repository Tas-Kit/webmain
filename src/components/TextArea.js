import React from 'react';
import Validator from 'validatorjs';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';

const TextArea = (props) => {
  const { id, value, validationRule, errorMessage, onChange } = props;
  let validator;
  const data = { value };
  const rules = { value: validationRule };
  if (validationRule !== '') validator = new Validator(data, rules);

  return (
    <FormControl style={{ width: 400 }}>
      <TextField
        multiline
        rowsMax="6"
        id={id}
        value={value}
        onChange={onChange}
      />
      {validationRule !== '' && validator.fails() ?
        <FormHelperText id={`${id}-error`} error>
          {errorMessage}
        </FormHelperText>
        : null
      }
    </FormControl>
  );
};

TextArea.defaultProps = {
  validationRule: '',
};

export default TextArea;
