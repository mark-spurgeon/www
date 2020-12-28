import React from 'react'
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('../../apps/geneva-covid/map.js'))

export default OtherComponent;