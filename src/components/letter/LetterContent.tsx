import React, { useEffect, useRef } from 'react';
import { PostResponse } from '../../types';
import { utils } from '../../services/api';

interface LetterContentProps {
  data: PostResponse;
}

export const LetterContent: React.FC<LetterContentProps> = ({ data }) => {
  const contentRef = useRef<HTMLDivElement>(null);


  return (
    <div className='shadow-lg p-4 rounded-3xl rounded-b-none rounded-br-2xl'>
      <div className="letter-header text-center">
        {data.burnAfterRead && (
          <div className="mb-4 text-red-500 font-semibold">
            🔥 这是一封阅后即焚的信件，阅读后将无法再次打开
          </div>
        )}
      </div>
      <div className="letter-content mt-4">
        <div 
          ref={contentRef}
          className=" leading-8 whitespace-pre-wrap break-words tracking-wide"

          dangerouslySetInnerHTML={{ 
            __html: data.content
          }}
        />
      </div>
      <div className="letter-footer mt-8 flex flex-col items-end">
        {data.signature && data.signatureName && (
          <div className="text-right text-gray-600">
            <p className="font-semibold">{data.signatureName}</p>
            <p className="text-sm">{utils.formatDateTime(data.ctime)}</p>
          </div>
        )}
      </div>
    </div>
  );
};