// src/components/MarkdownRenderer.js

import React from 'react';
import { Remarkable } from 'remarkable';

// Initialize Remarkable instance
const md = new Remarkable();

const MarkdownRenderer = ({ markdownText }) => {
  // Convert Markdown to HTML
  const getMarkdownText = () => {
    return { __html: md.render(markdownText) };
  };

  return (
    <div 
      className="markdown-content" 
      dangerouslySetInnerHTML={getMarkdownText()} 
    />
  );
};

export default MarkdownRenderer;
