import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertEditorStateToMarkdown, convertMarkdwonToEditorState } from '../utils/functions';
import './MarkdownEdtior.css';


class CustomEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }
  uplodaImage = (file) => { }

  handleEditorStateChange = (editorState) => {
    const { onChange } = this.props;
    const e = {};
    e.target = {};
    e.target.value = convertEditorStateToMarkdown(editorState);
    onChange(e);
    this.setState({ editorState });
  }

  componentDidMount = () => {
    this.setState({ editorState: convertMarkdwonToEditorState(this.props.value) });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.handleEditorStateChange}
          editorState={editorState}
          toolbar={{
            options: ['inline', 'blockType', 'list', 'history', 'image'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: this.uplodaImage },
          }}
        />
      </div>

    );
  }
}

export default CustomEditor;
