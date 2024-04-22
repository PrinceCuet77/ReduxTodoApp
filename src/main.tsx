import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import { store } from './store/store.ts'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
