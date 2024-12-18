import { useState, formData } from 'react'
import '../App.css'

function Root() {


  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`提交的邮箱地址：${email}`); // 这里只是简单地弹窗显示，你可以替换成其他处理逻辑
    // 通常这里会发送请求到后端服务器
    console.log("提交的邮箱地址:", email)
    setEmail('');
  };

  return (
    <>
      <div>
        <h1 className='text-pink-200 font-bold'>Echo</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">邮箱：</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="请输入邮箱地址"
          />
          <button type="submit">提交</button>
        </form>
      </div>
    </>
  )
}

export default Root
