import Layout from 'modules/ui/components/Layout'
import React from 'react'
import { Provider } from 'react-redux';

import configureStore from 'store/configureStore';


const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  )
}
