import { useState } from 'react'
export default function Wishlist() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState('');

  const addItem = async (email) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setData(data.message);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      addItem(email);
      setEmail('');
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>

        <div class="w-full px-4 py-3 my-8 text-gray-600 rounded bg-white/30">
          <div class="py-3">
            <p>Echo 目前还在测试，留下邮箱，将在开放使用时通知您！</p>
          </div>
          <div className="flex gap-2 py-3">
            <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="邮箱"
              required
              class="inline-flex flex-1 text-base px-4 transition-all border rounded outline-none focus-visible:outline-none border-slate-200 text-slate-800  focus:outline-none invalid:focus:border-slate-300 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            <button class="inline-flex px-4 text-sm font-medium transition duration-300 text-gray-800">
              <span>提交</span>
            </button>
          </div>
        </div>
      </form>
      <div class="mt-4">
            {data && <div class="px-4 py-2 w-full text-base border rounded border-emerald-100 bg-emerald-50 text-emerald-500" role="alert">
              <span>{data}</span>
            </div>}
          </div>
    </div>

  );
}