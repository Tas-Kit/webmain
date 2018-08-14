import React from 'react';
import { TextField, withStyles, Grid } from '@material-ui/core';
import { debounce } from 'lodash';
import { getTaskApps } from '../utils/api';

const styles = {
  root: {
    padding: '1em',
  },
  searchField: {
    width: '240px',
  },
};

class TaskAppSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      isLoading: false,
    };
  }
  handleKeywordChange = (e) => {
    this.setState({
      keyword: e.target.value,
    }, this.fetchTaskApps);
  }

  fetchTaskApps = debounce(() => {
    const { isCreatorMode, uid } = this.props;
    const { keyword } = this.state;
    if (isCreatorMode) {
      return getTaskApps(keyword, uid);
    }
    return getTaskApps(keyword);
  }, 200)

  render() {
    const { classes } = this.props;
    const { keyword, isLoading } = this.state;
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignContent="center" spacing={16}>
          <Grid item>
            <TextField
              id="keyword"
              value={keyword}
              className={classes.searchField}
              onChange={this.handleKeywordChange}
              disabled={isLoading}
            />
          </Grid>
        </Grid>

      </div>);
  }
}
export default withStyles(styles)(TaskAppSearchBar);
