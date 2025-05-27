export const createPost = async (postData) => {
  try {
    // 确保 content 是字符串
    const sanitizedData = {
      content: String(postData.content),
      options: {
        ...postData.options,
        slowRead: Boolean(postData.options.slowRead),
        burnAfterRead: Boolean(postData.options.burnAfterRead),
        signature: Boolean(postData.options.signature),
        signatureName: postData.options.signatureName || ''
      }
    };

    const response = await fetch('/api/post', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(sanitizedData),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('链接已复制到剪贴板！');
  } catch (err) {
    console.error('Copy failed:', err);
    throw err;
  }
};