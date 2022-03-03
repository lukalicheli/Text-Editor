import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jateStore", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Post to the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jateStore", "readwrite");
  const store = tx.objectStore("jateStore", 1);
  const request = store.put({ content, id: 1 });
  const result = await request;
  if (!result) {
    console.log("err");
  } else {
    console.log(result);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jateStore", "readonly");
  const store = tx.objectStore("jateStore");
  const request = store.get(1);
  const result = await request;
  if (!result) {
    console.log("Nothing in getDB");
  } else {
    return result.content;
  }
};

initdb();
