import './App.css'
import Post from './routers/post'

function App() {
  return (
    <div className='min-h-svh bg-[#a67d3d] bg-opacity-50 p-6 from-amber-500 via-orange-700 to-transparent'>
      <section className='huiwen bg-repeat bg-blend-multiply '>
        <div className="max-w-4xl m-auto ">
          <div className="py-6">
            <div>
              <h1>Echo</h1>
              <p>以书信的方式，投递文字的温度</p>
            </div>
          </div>
        </div>
      </section>
      <Post />
    </div>
  )
}

export default App
