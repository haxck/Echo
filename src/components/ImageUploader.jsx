import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const ImageUploader = forwardRef(({ onUploadSuccess }, ref) => {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  useImperativeHandle(ref, () => ({
    click: () => {
      inputRef.current?.click();
    }
  }));

  const handleUpload = async (file) => {
    try {
      setIsUploading(true);
      
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append('image', file);

      // 发送上传请求
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // 调用成功回调，传递图片 URL
      onUploadSuccess(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('图片上传失败，请重试');
    } finally {
      setIsUploading(false);
      // 清空 input 值，允许重复上传相同文件
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleUpload(file);
          }
        }}
      />
      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-center">上传中...</div>
          </div>
        </div>
      )}
    </>
  );
});

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;