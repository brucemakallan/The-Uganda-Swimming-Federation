/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles({
  root: {
    width: '340px',
  },
});

const SearchInput = ({ placeholder = 'Search', handleSearch }) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState('');

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <FormControl className={classes.root}>
      <InputLabel htmlFor="search">{placeholder}</InputLabel>
      <FilledInput
        id="search-field"
        value={searchValue}
        onChange={handleChange}
        fullWidth
        endAdornment={(
          <InputAdornment position="end">
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )}
        label="Password"
      />
    </FormControl>
  );
};

export default SearchInput;
