import React from 'react';
import Helmet from 'react-helmet'

export default ({
  title
}) => (
  <Helmet>
    <meta 
      name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <meta charSet="utf-8" />
    <link href="path/to/node_modules/normalize.css/normalize.css" rel="stylesheet" />
    {
      title && 
      <title>{title}</title>
    }
  </Helmet>
)