import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot, useRecoilValue } from 'recoil'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
