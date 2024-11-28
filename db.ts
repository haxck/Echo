import { Database } from 'bun:sqlite';
const db = new Database('db.sqlite');


export const getLetterById = (id: number) => {
  return db.query<Letter>(`SELECT * FROM letters WHERE id = ${id}`).get();
}

export const getLetters = () => {
  return db.query<Letter[]>(`SELECT * FROM letters`);
}

export const likeLetter = (id: number) => {
  return db.run(`
    UPDATE letters
    SET likeCount = likeCount + 1
    WHERE id = ${id}
  `);
}

export const deleteLetter = (id: number) => {
  return db.run(`
    DELETE FROM letters
    WHERE id = ${id}
  `);
}
