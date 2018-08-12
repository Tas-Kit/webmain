import React from 'react';
import { TextField } from '@material-ui/core';
import LoadingButton from './Button/LoadingButton';
import { getTaskApps } from '../utils/api';

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

  handleSearchClick = () => {
    this.setState({
      isLoading: true,
    });
    getTaskApps(this.state.keyword)
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const { keyword, isLoading } = this.state;
    return (
      <div>
        <TextField
          id="keyword"
          value={keyword}
          onChange={this.handleKeywordChange}
          disabled={isLoading}
        />
        <LoadingButton
          loading={isLoading}
          buttonName="Search"
          className="search"
          onClick={this.handleSearchClick}
          color="primary"
          variant="flat"
        />
      </div>);
  }
}
export default TaskAppSearchBar;
