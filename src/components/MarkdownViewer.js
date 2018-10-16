import React from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownViewer.css';


const MarkdownViewer = (props) => {
  const { source, ...rest } = props;
  return <ReactMarkdown source={source} className="markdown-viewer" {...rest} />;
};

export default MarkdownViewer;
