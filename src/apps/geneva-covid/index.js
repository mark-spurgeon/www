import React from 'react'
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./map'))

export default OtherComponent;