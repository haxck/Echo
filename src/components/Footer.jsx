import React from 'react';
import QRCodeComponent from './QRCode';

export default function Footer() {
  return (
    <footer className='huiwen bg-repeat bg-blend-multiply '>
      <div className="max-w-xl m-auto w-full">
        <div className="">
          {/* <QRCodeComponent url='https://echo.haxck.com' size={64} /> */}
          <div className='p-2 text-right'>
            <h1 className='text-3xl'>Echo</h1>
              <p className='text-sm text-slate-500'>以书信的方式，投递文字的温度</p>
            <p></p>
          </div>
        </div>
      </div>
    </footer>
  );
}