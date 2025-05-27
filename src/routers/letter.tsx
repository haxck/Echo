import React, { useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LetterContent } from '../components/letter/LetterContent';
import { LetterStatus } from '../components/letter/LetterStatus';
import { postApi, utils } from '../services/api';
import { PostResponse, ErrorResponse } from '../types';
import '../App.css';
import Footer from '../components/Footer';
import { domToJpeg } from 'modern-screenshot';


export async function clientLoader({ params }: { params: { letterId: string } }) {
  return await postApi.get(params.letterId);
}

export default function Letter() {
  const data = useLoaderData() as PostResponse | ErrorResponse;
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  // 保存图片功能
  const handleSaveImage = async () => {
    if (!letterRef.current) return;

    try {
      const letterElement = letterRef.current;
      letterElement.classList.remove('shadow-xl');
      
      const dataUrl = await domToJpeg(letterElement, {
        quality: 0.95,
        style: {
          padding: '6',
          margin: '6'
        },
        width: letterElement.offsetWidth,
        height: letterElement.offsetHeight,
        scale: 2
      });


      const link = document.createElement('a');
      link.download = `letter-${new Date().getTime()}.jpeg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('保存图片失败，请重试');
    }
  };

  useEffect(() => {
    if ('error' in data && data.error === 'slow_read' && data.expireDate) {
      const updateRemainingTime = () => {
        const now = new Date();
        const expireDate = new Date(data.expireDate!);
        const diff = expireDate.getTime() - now.getTime();

        if (diff <= 0) {
          window.location.reload();
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setRemainingTime(
          hours > 0 ?
            `${hours}小时${minutes}分钟` :
            minutes > 0 ?
              `${minutes}分钟${seconds}秒` :
              `${seconds}秒`
        );
      };

      updateRemainingTime();
      // 每秒更新一次
      const timer = setInterval(updateRemainingTime, 1000);
      return () => clearInterval(timer);
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen items-center bg-[#f4f1ec]">
      {'error' in data ? (
        <LetterStatus data={data} remainingTime={remainingTime || undefined} />
      ) : (
        <>
          <div className="max-md:hidden bottom-2 right-2 fixed">
            <button
              onClick={handleSaveImage}
              className="px-4 py-2 bg-stone-400 hover:bg-stone-500 text-white rounded transition-colors"
            >
              保存图片
            </button>
          </div>
          <div className="w-full max-w-lg p-6 bg-[#f4f1ec]" ref={letterRef}>
            <div className="relative bg-orange-100/50 shadow-xl rounded-t-lg">
              <div className="max-h-3 seal w-full rounded-t-lg"></div>
              <LetterContent data={data} />
            </div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}