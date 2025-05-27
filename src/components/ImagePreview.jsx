import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import domtoimage from 'dom-to-image-more';
import '../App.css';
import QRCodeComponent from './QRCode';
import Footer from './Footer';

/**
 * ImagePreview Component
 * Renders a preview of HTML content as an image with modal functionality
 * @param {Object} props
 * @param {string} props.content - HTML content to be rendered as image
 */
const ImagePreview = ({ content }) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Reference to the content container for image generation
  const contentRef = useRef(null);

  /**
   * Generates a PNG image from the HTML content
   * @returns {Promise<string>} Data URL of the generated image
   */
  const generatePreview = async () => {
    try {
      setIsGenerating(true);

      // 创建一个离屏容器，并确保其可见且尺寸正确
      const container = document.createElement('div');
      container.style.cssText = `
        background-color: #f4f1ec;
        transform-origin: 0 0;
        transform: scale(1);
        display: block;
        width: 380px;
        height: auto;
      `;
      document.body.appendChild(container);


      // 等待足够时间让内容和样式完全渲染
      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        const dataUrl = await domtoimage.toPng(container, {
          quality: 1, width: 480, height: container.offsetHeight,copyDefaultStyles: true
        });


        console.log('Preview image generated successfully', container.style.width);
        return dataUrl;
      } finally {
        // 清理离屏容器
        document.body.removeChild(container);
      }
    } catch (error) {
      console.error('Failed to generate preview:', error);
      return '';
    } finally {
      setIsGenerating(false);
    }
  };

  // Effect to generate preview image when content changes
  useEffect(() => {
    let mounted = true;

    const generateImage = async () => {
      if (contentRef.current && mounted) {
        const url = await generatePreview();
        if (url && mounted) {
          setPreviewUrl(url);
        }
      }
    };

    // 增加延迟时间以确保内容完全加载
    const timer = setTimeout(generateImage, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [content]);

  // 打开预览时重置 imgLoaded
  const handleOpen = () => {
    setImgLoaded(false);
    setIsOpen(true);
  };

  // 关闭预览时重置 imgLoaded
  const handleClose = () => {
    setIsOpen(false);
    setImgLoaded(false);
  };

  /**
   * Modal component for displaying the preview image
   */
  const PreviewModal = () => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]"
        onClick={handleClose}
      >
        <div className="relative max-w-[90vw] max-h-[90vh] overflow-auto">
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded-lg shadow-xl"
            onLoad={() => setImgLoaded(true)}
          />

          {!isGenerating && imgLoaded && (
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {/* Hidden content container for image generation */}
      <div
        ref={contentRef}
        data-preview="true"
        className="p-6 flex flex-col items-center"
        style={{
          visibility: 'hidden',
          position: 'absolute',
        }}
      >
        <div className="my-6 bg-orange-100/50 shadow-xl max-w-2xl w-full rounded-t-lg">
          <div className="max-h-3 seal w-full rounded-t-lg"></div>
          <div className="shadow-lg p-4 rounded-3xl rounded-b-none rounded-br-2xl">
            <div className="letter-content mt-4">
              <div
                className="text whitespace-pre-wrap break-words flex flex-col gap-2 tracking-wide leading-7"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </div>
            <div className="letter-footer mt-8 flex flex-col items-end">
              <div className="text-right text-gray-600">
                <p className="font-semibold">{content.options.signatureName}</p>
                <p className="text-sm">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Preview image container */}
      <div className="mt-4 cursor-pointer max-w-md max-h-96 overflow-hidden" onClick={handleOpen}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full max-w-md  rounded-lg shadow-lg hover:opacity-90 transition-opacity"
            onError={(e) => {
              console.error('Image loading failed');
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full max-w-md h-40 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">
              {isGenerating ? '生成图片预览中' : '图片生成失败'}
            </span>
          </div>
        )}
      </div>



      <PreviewModal />
    </>
  );
};

export default ImagePreview;