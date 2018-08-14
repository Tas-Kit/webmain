import React from 'react';
import { TextField } from '@material-ui/core';
import { debounce } from 'lodash';
import { FormattedMessage } from 'react-intl';
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
    const { keyword, isLoading } = this.state;
    return (
      <FormattedMessage id="searchText">
        {
          msg => (<TextField
            id="keyword"
            value={keyword}
            fullWidth
            placeholder={msg}
            onChange={this.handleKeywordChange}
            disabled={isLoading}
          />)
        }
      </FormattedMessage>
    );
  }
}
export default TaskAppSearchBar;
