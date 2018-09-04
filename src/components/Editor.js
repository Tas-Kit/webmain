import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { debounce } from 'lodash';
import { convertEditorStateToMarkdown, convertMarkdwonToEditorState } from '../utils/functions';
import './MarkdownEdtior.css';


class CustomEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  componentDidMount = () => {
    this.setState({ editorState: convertMarkdwonToEditorState(this.props.value) });
  }
  // image: uploadCallback: This is image upload callBack. It should return a promise that resolves to give image src. Default value is true.
  //   Both above options of uploadEnabled and uploadCallback should be present for upload to be enabled.
  // Promise should resolve to return an object {
  //   data: {
  //     link: <THE_URL>}}.
  uplodaImage = () => Promise.resolve({ link: '' })

  debouncedConvertEditorStateToMarkdown = debounce(
    (editorState) => {
      const { onChange } = this.props;
      const e = {};
      e.target = {};
      e.target.value = convertEditorStateToMarkdown(editorState);
      onChange(e);
    }
    , 200,
  )

  handleEditorStateChange = (editorState) => {
    this.debouncedConvertEditorStateToMarkdown(editorState);
    this.setState({ editorState });
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
            image: {
              uploadCallback: this.uplodaImag,
              inputAccept: 'image/jpg',
            },
          }}
        />
      </div>

    );
  }
}

export default CustomEditor;
