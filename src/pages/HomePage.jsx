import { useState } from 'react'
import ApiComponent from '../services/api.jsx'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider, Link } from 'react-router-dom'
import router from "../router/index.jsx"
import Header from '../components/sections/Header.jsx'
import Footer from '../components/sections/Footer.jsx'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Squalala</h1>
      <h1>RAWG ! Graou</h1>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      {/* <ApiComponent /> */}
      <p className="read-the-docs">
        Hello wooorld... this is meee...  life should beee... fun for everyone !
      </p>

    </>
  )
}
