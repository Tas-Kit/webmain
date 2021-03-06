import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { debounce } from 'lodash';
import { convertEditorStateToMarkdown, convertMarkdwonToEditorState, getCurrentEnv } from '../utils/functions';
import { uploadImage } from '../utils/api';
import { IMAGE_CDN_URL } from '../constants/apiUrls';
import './MarkdownEdtior.css';

const imageCDNUrl = IMAGE_CDN_URL;


class CustomEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  componentDidMount = () => {
    this.setState({ editorState: convertMarkdwonToEditorState(this.props.value) });
  }
  uploadImageCallback = file => uploadImage(file).then((data) => {
    const env = getCurrentEnv();
    const link = `${imageCDNUrl}/${env}/task/description/jpg/${data.iid}.jpg`;
    return { data: { link } };
  })

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
            options: ['image', 'inline', 'blockType', 'list', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadEnabled: true,
              uploadCallback: this.uploadImageCallback,
              previewImage: true,
              alignmentEnabled: false,
              accept: 'image/jpeg,image/jpg',
              defaultSize: {
                height: 'auto',
                width: '100%',
              },
            },
          }}
        />
      </div>

    );
  }
}

export default CustomEditor;
