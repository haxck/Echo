import { Database } from 'bun:sqlite';

export class WishlistDatabase {
  private db: Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.initialize();
  }

  private initialize() {
    this.db.run('CREATE TABLE IF NOT EXISTS wishlist (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, ctime TEXT)');
  }

  public insert(email: string, ctime: string): number {
    const sql = 'INSERT INTO wishlist (email, ctime) VALUES (?, ?)';
    const result = this.db.run(sql, [email, ctime]);
    return result.lastInsertRowid;
  }

  public emailExists(email: string): boolean {
    const checkSql = `SELECT COUNT(*) as count FROM wishlist WHERE email = ?`;
    const checkStmt = this.db.prepare(checkSql);
    const result = checkStmt.get(email);
    return result.count > 0;
  }
}