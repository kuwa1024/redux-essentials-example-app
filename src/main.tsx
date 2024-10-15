import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import { worker } from './api/server'

import { Provider } from 'react-redux'
import { store } from './app/store'
import { apiSliceWithUsers } from './features/users/usersSlice'
import './index.css'
import './primitiveui.css'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(apiSliceWithUsers.endpoints.getUsers.initiate())

  const root = createRoot(document.getElementById('root')!)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
}

start()
