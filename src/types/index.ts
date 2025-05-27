// 帖子选项接口
export interface PostOptions {
  slowRead: boolean;
  burnAfterRead: boolean;
  signature: boolean;
  signatureName: string;
}

// 帖子响应接口
export interface PostResponse {
  content: string;
  slowRead: boolean;
  slowReadExpire: string | null;
  burnAfterRead: boolean;
  isRead: boolean;
  signature: boolean;
  signatureName: string | null;
  ctime: string;
}

// 错误响应接口
export interface ErrorResponse {
  error: 'not_found' | 'slow_read' | 'burn_after_read';
  message?: string;
  expireDate?: string;
}

// 帖子数据接口
export interface PostData {
  content: string;
  options: PostOptions;
}

// 分享选项接口
export interface ShareOptions {
  slowRead: boolean;
  burnAfterRead: boolean;
  signature: boolean;
  signatureName: string;
} 