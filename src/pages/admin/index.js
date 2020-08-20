import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import Head from '.../../components/head'
import Footer from '.../../components/footer'

import { Heading } from '.../../components/admin/ui'


export default () => (
  <main style={{ padding: '0.5rem' }}>
    <Helmet>
      <Head />
      <title>Admin / Marko [Mark Spurgeon]</title>
      <meta name="robots" content="noindex"></meta>
    </Helmet>

    <Heading>
      <span style={{color: '#5679de'}}>Admin /</span> ...
    </Heading>

    <Heading>
      <Link to="/admin/links" style={{color: '#b2b9f0'}}>../links</Link>
    </Heading>

    <Footer />
  </main>
)