import React, { useRef, useState } from 'react';
import Editor from '../components/editor';
import CommonModal from '../components/CommonModal';
import { useModal } from '../hooks/useModal';
import { createPost } from '../utils/api';

const Post = () => {
  const quillRef = useRef();
  const { activeModal, modalContent, modalTitle, openModal, closeModal } = useModal();
  const [shareOptions, setShareOptions] = useState(null);

  const handleShare = async () => {
    const content = quillRef.current.getSemanticHTML();
    if (quillRef.current.getLength() < 10) {
      openModal('details', '提示', '看到你开始动笔，真的很开心！不过这封信好像有点"轻"呢，花点心思再琢磨一下吧');
    } else {
      try {
        const postData = {
          content,
          options: shareOptions || {
            slowRead: false,
            burnAfterRead: false,
            signature: false,
            signatureName: '无名侠客'
          }
        };
        console.log('Sending postData:', postData);
        const data = await createPost(postData);
        const link = `http://${window.location.host}/#/s/${data.message}`;
        openModal('link', '链接', { type: 'link', data: link, content: {...postData,link} });
      } catch (error) {
        openModal('details', '提示', '链接生成失败，请稍后再试');
      }
    }
  };

  const handleOptionsChange = (options) => {
    console.log('Options received in Post:', options);
    setShareOptions(options);
  };

  return (
    <div className="container max-w-4xl m-auto bg-gray-100/50 rounded-lg">
      <div className="sticky top-0 z-10 bg-[#e3d9ca] border rounded-lg rounded-b-none border-[#ccc] border-b-0">
        <div className="p-1 flex row gap-2 justify-end">
          <button
            type="button"
            onClick={() => openModal('share', '分享', { type: 'share', onOptionsChange: handleOptionsChange })}
            className="bg-stone-400 hover:bg-stone-500 border-none transition-colors text-white px-4 py-2 rounded text-sm m-1"
          >
            Share
          </button>
        </div>
      </div>
      <Editor ref={quillRef} />

      <CommonModal
        isOpen={!!activeModal}
        title={modalTitle}
        content={modalContent}
        onClose={closeModal}
        buttons={activeModal === 'share' ? [
          {
            label: '生成',
            className: 'bg-blue-500 text-white',
            onClick: handleShare,
          },
        ] : undefined}
      />
    </div>
  );
};

export default Post;