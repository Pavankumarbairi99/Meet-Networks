
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './Components/Body'
import Login from "./Components/Login"
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feeds from './Components/Feeds'
import Profile from './Components/Profile'
import Connection from './Components/Connection'
import Requests from './Components/request'

function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feeds />} />
            <Route path="/login" element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/connection' element={<Connection />} />
            <Route path='/request' element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
     
    </>
  )
}

export default App
