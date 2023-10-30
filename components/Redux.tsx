import React from 'react'
import {Provider} from 'react-redux'

import store from '@lib/store'

const Redux = ({children}) => {
  return <Provider store={store}>{children}</Provider>
}

export default Redux
