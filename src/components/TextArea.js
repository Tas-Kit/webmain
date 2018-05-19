import React from 'react';
import Validator from 'validatorjs';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const TextArea = (props) => {
  const {
    id,
    value,
    validationRule,
    errorMessage,
    onChange,
    width,
    rowsMax,
  } = props;
  let validator;
  const data = { value };
  const rules = { value: validationRule };
  if (validationRule !== '') validator = new Validator(data, rules);

  return (
    <FormControl style={{ width }}>
      <TextField
        multiline
        rowsMax={rowsMax}
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
  width: 400,
  rowsMax: 6,
};

export default TextArea;
