import React, { useState } from 'react';
import { copyToClipboard } from '../utils/api';
import ImagePreview from './ImagePreview';

const ShareOptions = ({ onOptionsChange }) => {
  const [options, setOptions] = useState({
    slowRead: false,
    burnAfterRead: false,
    signature: false,
    signatureName: ''
  });

  const handleOptionChange = (option, value) => {
    const newOptions = { ...options, [option]: value };
    setOptions(newOptions);
    onOptionsChange?.(newOptions);
  };

  return (
    <div className="space-y-6">
      {/* 声声慢选项 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">声声慢</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={options.slowRead}
              onChange={(e) => handleOptionChange('slowRead', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <p className="text-sm text-gray-500">链接生成后，信件需要过一段时间才能打开</p>
      </div>

      {/* 阅后即焚选项 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">阅后即焚</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={options.burnAfterRead}
              onChange={(e) => handleOptionChange('burnAfterRead', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <p className="text-sm text-gray-500">开启后，收信人阅读完信件内容将自动销毁</p>
      </div>

      {/* 署名选项 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">署名</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={options.signature}
              onChange={(e) => {
                const checked = e.target.checked;
                setOptions(prev => ({
                  ...prev,
                  signature: checked,
                  signatureName: checked ? prev.signatureName : ''
                }));
                onOptionsChange?.({
                  ...options,
                  signature: checked,
                  signatureName: checked ? options.signatureName : ''
                });
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <p className="text-sm text-gray-500">开启后，可以在信件末尾署上你的名字</p>
        {options.signature && (
          <input
            type="text"
            placeholder="请输入你的名字"
            className="w-full p-2 my-2 border rounded-lg"
            value={options.signatureName}
            onChange={(e) => handleOptionChange('signatureName', e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

const LinkDisplay = ({ link, content }) => (
  <div>

    <div className="flex flex-col items-center">
      <div className="text-lg font-medium text-gray-700">您的信件已生成，请保存以下链接：</div>
      {/* {content && <ImagePreview content={content} />} */}
    </div>
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-3 w-full max-w-md">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-blue-600 hover:text-blue-800 underline truncate"
        >
          {link}
        </a>
        <button
          onClick={() => copyToClipboard(link)}
          className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>

        </button>
      </div>
    </div>
  </div>
);

const ModalContent = ({ content }) => {
  // 如果内容是 React 元素，直接返回
  if (React.isValidElement(content)) {
    return content;
  }

  // 如果内容是字符串，判断是否是链接
  if (typeof content === 'string') {
    if (content.startsWith('http://') || content.startsWith('https://')) {
      return <LinkDisplay link={content} />;
    }
    return <div className="p-4">{content}</div>;
  }

  // 如果内容是对象，根据类型渲染不同内容
  if (typeof content === 'object' && content !== null) {
    switch (content.type) {
      case 'share':
        return <ShareOptions onOptionsChange={content.onOptionsChange} />;
      case 'link':
        return <LinkDisplay link={content.data} content={content.content} />;
      case 'details':
        return <div className="p-4">{content.data}</div>;
      default:
        return <div className="p-4">{content.data}</div>;
    }
  }

  return null;
};

export default ModalContent;