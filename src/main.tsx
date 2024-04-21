// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import { store } from './store/store.ts'
import { getTodo } from './store/todo/todo-thunks.ts'

import './index.css'

store.dispatch(getTodo())

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)
