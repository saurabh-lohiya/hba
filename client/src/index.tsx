import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.min.css'
import App from './App'
import { Provider } from 'react-redux'
import hotelReducer from './redux/hotel'

const store = configureStore({
  reducer: hotelReducer
})

ReactDOM.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
)
