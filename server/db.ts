import { Database } from 'bun:sqlite';
import { randomUUIDv7 } from 'bun';

interface PostOptions {
  slowRead: boolean;
  burnAfterRead: boolean;
  signature: boolean;
  signatureName: string;
}

interface DBResult {
  lastInsertRowid: bigint;
}

interface QueryResult {
  uid: string;
}

interface PostContent {
  content: string;
}

interface PostResponse {
  content: string;
  slowRead: boolean;
  slowReadExpire: string | null;
  burnAfterRead: boolean;
  isRead: boolean;
  signature: boolean;
  signatureName: string | null;
  ctime: string;
}

export class WishlistDatabase {
  private db: Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.initialize();
  }

  private initialize() {
    this.db.run('CREATE TABLE IF NOT EXISTS wishlist (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, ctime TEXT)');
    this.db.run('CREATE TABLE IF NOT EXISTS letters (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, uid TEXT, ctime TEXT, slowRead INTEGER, slowReadExpire TEXT, burnAfterRead INTEGER, isRead INTEGER, signature INTEGER, signatureName TEXT)');
  }

  public insert(email: string, ctime: string): number {
    const sql = 'INSERT INTO wishlist (email, ctime) VALUES (?, ?)';
    const result = this.db.run(sql, [email, ctime]);
    return Number(result.lastInsertRowid);
  }

  public newPost(content: string, options: PostOptions): string {
    const uid = randomUUIDv7("base64url")
    const ctime = new Date().toISOString()
    
    // 计算声声慢模式的过期时间（0-72小时）
    let slowReadExpire: string | null = null;
    if (options.slowRead) {
      const hours = Math.floor(Math.random() * 72); // 0-72小时
      const expireDate = new Date();
      expireDate.setHours(expireDate.getHours() + hours);
      slowReadExpire = expireDate.toISOString();
    }
    
    // 设置阅后即焚和已读状态
    const isRead = 0; // 初始状态为未读
    
    const sql = 'INSERT INTO letters (uid, content, ctime, slowRead, slowReadExpire, burnAfterRead, isRead, signature, signatureName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const result = this.db.run(sql, [
      uid, 
      content, 
      ctime, 
      options.slowRead ? 1 : 0, 
      slowReadExpire, 
      options.burnAfterRead ? 1 : 0, 
      isRead, 
      options.signature ? 1 : 0, 
      options.signatureName || null
    ]) as DBResult;
    
    const query = this.db.query(`SELECT uid FROM letters WHERE id = ?`)
    const res = query.get(Number(result.lastInsertRowid)) as QueryResult;
    return res.uid;
  }

  public getPost(uid: string): PostResponse {
    const query = `SELECT content, slowRead, slowReadExpire, burnAfterRead, isRead, signature, signatureName, ctime 
                  FROM letters WHERE uid = ?`
    const stmt = this.db.prepare(query);
    const result = stmt.get(uid) as any;
    
    if (!result) {
      throw new Error('Post not found');
    }

    return {
      content: result.content,
      slowRead: Boolean(result.slowRead),
      slowReadExpire: result.slowReadExpire,
      burnAfterRead: Boolean(result.burnAfterRead),
      isRead: Boolean(result.isRead),
      signature: Boolean(result.signature),
      signatureName: result.signatureName,
      ctime: result.ctime
    };
  }

  public emailExists(email: string): boolean {
    const checkSql = `SELECT COUNT(*) as count FROM wishlist WHERE email = ?`;
    const checkStmt = this.db.prepare(checkSql);
    const result = checkStmt.get(email) as { count: number };
    return result.count > 0;
  }

  public markAsRead(uid: string): void {
    const sql = 'UPDATE letters SET isRead = 1 WHERE uid = ?';
    this.db.run(sql, [uid]);
  }
}