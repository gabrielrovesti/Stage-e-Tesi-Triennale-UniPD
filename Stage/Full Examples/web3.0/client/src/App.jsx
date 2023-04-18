import './App.css'
import React from 'react'
import { Navbar, Welcome, Footer, Services, Transactions } from './components'

const App = () => {

  return (
    <div className="min-h-screen">
      <div clasName="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App;
