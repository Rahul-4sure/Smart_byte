import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ErrorPage from "./pages/ErrorPage"

function App() {

  return (
  <div>
    <Routes>
      <Route path="/" element={<Home/>}/>

      <Route path="/login" element={<Login/>} />

      <Route path="/register" element={<Register/>} />

      <Route path="/dashboard" element={<Dashboard/>} />

      <Route path="*" element={<ErrorPage/>} />

    </Routes>
  </div>
  )
}

export default App
