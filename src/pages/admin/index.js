import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import {
  MenuItem,
  Navbar,
  Breadcrumbs,
  Breadcrumb,
  Spinner,
  ControlGroup,
  Toast, Toaster,
  Button,
  Callout,
  Alignment,
  Position,
} from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'

import Head from '.../../components/head'
import Footer from '.../../components/footer'

import { Heading } from '.../../components/admin/ui'

const breadcrumbs = [
  { href: '/admin', icon: "application", current: true},
  { href: '/admin/links', text: 'links' },
  { href: '/admin/preview', text: 'preview' }
]

const breadcrumbRenderer = ({ text, ...props }) => {
  return <Breadcrumb {...props}>{text}</Breadcrumb>
}

export default () => {

  return (
    <main>
      <Helmet>
        <Head />
        <title>Admin | Mark Spurgeon</title>
        <meta name="robots" content="noindex"></meta>
      </Helmet>

      <Navbar>
        <Navbar.Group>
          <Breadcrumbs 
            currentBreadcrumbRenderer={breadcrumbRenderer}
            items={breadcrumbs}
            collapseFrom='end'
            minVisibleItems={1}
            style={{maxWidth: '100pt'}}
          />
        </Navbar.Group>
      </Navbar>
      <Footer />
    </main>
  )
}