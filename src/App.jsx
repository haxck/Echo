import { useState } from 'react'
import './App.css'
import Wishlist from './components/wishlist'

function App() {
  return (

    <section className='bg-[#a67d3d] bg-repeat bg-blend-multiply bg-opacity-50 from-amber-500 via-orange-700 to-transparent'>
      <div class="max-w-screen-sm m-auto ">
        <div className="px-6">
          <div className="flex min-h-svh flex-col justify-center">
            <h1>Echo</h1>
            <p>以书信的方式，投递文字的温度</p>
            <Wishlist />
          </div>
        </div>
      </div>
    </section>

  )
}

export default App
