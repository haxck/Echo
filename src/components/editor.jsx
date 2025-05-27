import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import ImageUploader from './ImageUploader';
import "quill/dist/quill.snow.css";
import "./editor.css";

// Register font format
const Font = Quill.import('formats/font');
Font.whitelist = ['yahei','Huiwen','xiaolai']; // Define allowed fonts
Quill.register(Font, true);

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const uploaderRef = useRef(null);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );

      const quill = new Quill(editorContainer, {
        theme: 'snow',
        placeholder: '起初，我想写点东西给你\n后来便有了一切\n',
        formats: ['italic', 'bold', 'header', 'link', 'strike', 'align', 'list', 'font', 'image'],
        modules: {
          toolbar: {
            container: [
              [{ 'font': ['yahei','Huiwen', 'xiaolai'] }],
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'strike'],
              [{ 'align': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
              ['link', 'image'],
            ],
            handlers: {
              image: function() {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = async () => {
                  const file = input.files[0];
                  if (file) {
                    try {
                      const formData = new FormData();
                      formData.append('image', file);

                      const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                      });

                      if (!response.ok) {
                        throw new Error('Upload failed');
                      }

                      const data = await response.json();
                      const range = this.quill.getSelection(true);
                      
                      // 插入图片到编辑器
                      this.quill.insertEmbed(range.index, 'image', '/api'+ data.url);
                      this.quill.setSelection(range.index + 1);
                    } catch (error) {
                      console.error('Error uploading image:', error);
                      alert('图片上传失败，请重试');
                    }
                  }
                };
              },
              font: function(value) {
                const range = this.quill.getSelection();
                if (range) {
                  this.quill.format('font', value);
                }
              }
            }
          }
        },
      });

      const handleImageUploadSuccess = (url) => {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', url);
        quill.setSelection(range.index + 1);
      };

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      // 监听文本变化，处理换行
      quill.on('text-change', function(delta, old, source) {
        if (source === 'user') {
          const ops = delta.ops;
          ops.forEach((op) => {
            if (op.insert && /\n/.test(op.insert)) {
              // 获取当前选区
              const selection = quill.getSelection();
              if (selection) {
                // 重置字体为默认值
                quill.format('font', 'yahei');
                
                // 手动更新工具栏字体选择器的显示
                const fontPickerLabel = document.querySelector('.ql-font .ql-picker-label');
                if (fontPickerLabel) {
                  fontPickerLabel.setAttribute('data-value', 'yahei');
                }
              }
            }
          });
        }
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return (
      <div ref={containerRef}>
        <p>hello</p>
        <ImageUploader
          ref={uploaderRef}
          onUploadSuccess={(url) => {
            if (ref.current) {
              const range = ref.current.getSelection(true);
              if (range) {
                ref.current.insertEmbed(range.index, 'image', url);
                ref.current.setSelection(range.index + 1);
              } else {
                // 如果没有选区，插入到末尾
                const length = ref.current.getLength();
                ref.current.insertEmbed(length - 1, 'image', url);
                ref.current.setSelection(length, length);
              }
            }
          }}
        />
      </div>
    );
  }
);

Editor.displayName = 'Editor';

export default Editor;