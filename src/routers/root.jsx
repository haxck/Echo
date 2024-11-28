import { NavLink } from 'react-router-dom'
import '../App.css'

function Root() {
  return (
    <>
      <div>
        <h1 className='text-pink-200 font-bold'>Echo</h1>
        <NavLink to="/letters/xwz" >给你的一封信</NavLink>
      </div>
    </>
  )
}

export default Root
