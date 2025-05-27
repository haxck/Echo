import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import postRouter from './routes/post';
import wishlistRouter from './routes/wishlist';
import uploadRouter from './routes/upload';

const app = express();
const port = 1234;

// 配置请求体解析中间件
app.use(express.json({ 
  limit: '50mb',
  verify: (req: express.Request, _res: express.Response, buf: Buffer, _encoding: string) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  }
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 配置 CORS 和内容类型
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api/uploads/', express.static(path.join(__dirname, '../data/uploads')));

// 路由
app.use('/api', wishlistRouter);
app.use('/api', postRouter);
app.use('/api', uploadRouter);

// 错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'server_error', message: '服务器错误，请稍后重试' });
  next(err);
});

// 首页
app.get('/', (req: Request, res: Response) => {
  const p = path.join(__dirname, "..", "dist", "index.html");
  res.sendFile(p);
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
