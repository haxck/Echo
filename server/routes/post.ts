import { Router, Request, Response, RequestHandler } from 'express';
import { WishlistDatabase } from '../db';

const router = Router();
const db = new WishlistDatabase('data/wish.db');

interface PostRequestBody {
  content: string;
  options: {
    slowRead: boolean;
    burnAfterRead: boolean;
    signature: boolean;
    signatureName?: string;
  };
}

interface PostParams {
  code: string;
}

const handlePostRequest: RequestHandler<{}, any, PostRequestBody> = (req, res) => {
  try {
    const content = req.body?.content;
    const options = req.body?.options;

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'invalid_content', message: "内容格式不正确" });
    }

    if (!options || typeof options !== 'object') {
      return res.status(400).json({ error: 'invalid_options', message: "选项格式不正确" });
    }

    const sanitizedOptions = {
      slowRead: Boolean(options.slowRead),
      burnAfterRead: Boolean(options.burnAfterRead),
      signature: Boolean(options.signature),
      signatureName: options.signatureName || ''
    };

    try {
      const id = db.newPost(content, sanitizedOptions);
      if (!id) {
        return res.status(503).json({ error: 'service_unavailable', message: "服务繁忙，请稍后重试" });
      }
      res.json({ message: id });
    } catch (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json({ error: 'database_error', message: "数据库错误，请稍后重试" });
    }
  } catch (error) {
    console.error('Error handling post request:', error);
    res.status(500).json({ error: 'server_error', message: "服务器错误，请稍后重试" });
  }
};

const handleGetRequest: RequestHandler<PostParams> = (req, res) => {
  const code = req.params.code;
  try {
    const post = db.getPost(code);
    if (post.slowRead && post.slowReadExpire) {
      const expireDate = new Date(post.slowReadExpire);
      if (expireDate > new Date()) {
        return res.status(403).json({ error: 'slow_read', expireDate: post.slowReadExpire });
      }
    }
    if (post.burnAfterRead && post.isRead) {
      return res.status(403).json({ error: 'burn_after_read', message: '这封信已经被阅读过了' });
    }
    if (post.burnAfterRead) db.markAsRead(code);
    res.json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(404).json({ error: 'not_found', message: '找不到这封信' });
  }
};

router.post('/post', handlePostRequest);
router.get('/post/:code', handleGetRequest);

export default router;