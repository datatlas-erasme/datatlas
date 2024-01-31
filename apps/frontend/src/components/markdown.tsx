import React from 'react';

export const markdownComponents = {
  a(props) {
    // https://github.com/remarkjs/react-markdown/issues/12
    try {
      new URL(props.href ?? '');
      // If we don't get an error, then it's an absolute URL.
      props.target = '_blank';
      props.rel = 'noopener noreferrer';
      // eslint-disable-next-line no-empty
    } catch (e) {}

    return <a {...props}>{props.children}</a>;
  },
};
