import {useState } from 'react'
import house from './assets/house.png'
import create from './assets/create.png'
import trash from './assets/trashcan.png'
import report from './assets/report.png'
import './App.css'


// Setting the .NET URL
const API_URL = "http://localhost:5233"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={house} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Home Wallet</h1>
          <p>
            Create and dele users, transactions and get a complete report!
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Create and Delete</h2>
          <p>Users and transactions</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={create} alt="" />
                Create User
              </a>
            </li>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={trash} alt="" />
                Delete User
              </a>
            </li>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={create} alt="" />
                Create Transaction
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={trash} alt="" />
                Delete Transaction
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Financial Report</h2>
          <p>Get your Home Financial Report</p>
          <ul>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={report} alt="" />
                Get your report
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
