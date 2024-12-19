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

        <div class="w-full px-4 py-3 my-3 text-gray-600 rounded bg-white/30">
          <div class="py-3">
            <p>Echo 目前还在测试，留下邮箱，将在开放使用时通知您！</p>
          </div>
          <div className="relative">
            <input id="id-b03"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="id-b03"
              placeholder="邮箱"
              required
              class="relative text-base w-full h-10 px-4 placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-800 autofill:bg-white focus:outline-none invalid:focus:border-slate-300 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            <label for="id-b03" class="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:text-xs  peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
              邮箱
            </label>
          </div>
          <div class="flex gap-2 mt-4 justify-end">
            {data && <div class="w-full px-4 py-2 text-base border rounded border-emerald-100 bg-emerald-50 text-emerald-500" role="alert">
              <span>{data}</span>
            </div>}

            <button class="inline-flex gap-2 px-4 text-sm font-medium tracking-wide transition duration-300 text-gray-800">
              <span>提交</span>
            </button>
          </div>
        </div>
      </form>
    </div>

  );
}