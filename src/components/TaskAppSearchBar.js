import React from 'react';
import { TextField, withStyles, Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import LoadingButton from './Button/LoadingButton';
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
    });
  }

  fetchTaskApps = () => {
    const { isCreatorMode, uid } = this.props;
    const { keyword } = this.state;
    if (isCreatorMode) {
      return getTaskApps(keyword, uid);
    }
    return getTaskApps(keyword);
  }

  handleSearchClick = () => {
    this.setState({
      isLoading: true,
    });
    this.fetchTaskApps()
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

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
          <Grid item>
            <LoadingButton
              loading={isLoading}
              buttonName={<FormattedMessage id="searchButton" />}
              className="search"
              onClick={this.handleSearchClick}
              color="primary"
              variant="raised"
            />


          </Grid>

        </Grid>

      </div>);
  }
}
export default withStyles(styles)(TaskAppSearchBar);
