import { PostData, PostResponse, ErrorResponse } from '../types';

// API 基础配置
const API_BASE_URL = '/api';

// 错误处理函数
const handleResponse = async (response: Response) => {
  let data;
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      throw new Error('Unexpected content type from server');
    }

    if (!response.ok) {
      if (response.status === 403) {
        return { error: data.error, ...data } as ErrorResponse;
      }
      if (response.status === 404) {
        return { error: 'not_found', message: '找不到这封信' } as ErrorResponse;
      }
      throw new Error(data.message || '请求失败');
    }

    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON in response:', error);
      throw new Error('服务器响应格式错误');
    }
    throw error;
  }
};

// 帖子相关 API
export const postApi = {
  // 创建帖子
  create: async (postData: PostData): Promise<{ message: string }> => {
    try {
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

      const response = await fetch(`${API_BASE_URL}/post`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(sanitizedData)
      });

      const result = await handleResponse(response);
      return result;
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  },
  
  // 获取帖子
  get: async (letterId: string): Promise<PostResponse | ErrorResponse> => {
    const response = await fetch(`${API_BASE_URL}/post/${letterId}`);
    return handleResponse(response);
  }
};

// 工具函数
export const utils = {
  // 复制到剪贴板
  copyToClipboard: async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      alert('链接已复制到剪贴板！');
    } catch (err) {
      console.error('Copy failed:', err);
      throw err;
    }
  },
  
  // 格式化日期时间
  formatDateTime: (dateString: string): string => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  // 计算剩余时间
  calculateRemainingTime: (expireDate: string): string => {
    const now = new Date();
    const expire = new Date(expireDate);
    const diff = expire.getTime() - now.getTime();
  
    if (diff <= 0) return '0';
  
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${hours}小时${minutes}分钟`;
  }
};