// This module is used to create an indexedDB

let db
// create a new db request for the budget indexedDB
const request = indexedDB.open('budget', 1)

request.onupgradeneeded = function (event) {
  // create object store called "pending" and set autoIncrement to true
  const db = event.target.result
  // Set autoincrement to true for the pending store
  db.createObjectStore('pending', { autoIncrement: true })
}

request.onsuccess = function (event) {
  db = event.target.result

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase()
  }
}

request.onerror = function (event) {
  console.log('Woops! ' + event.target.errorCode)
}

export function saveRecord (record) {
  // create a transaction on the pending db with readwrite access
  const transaction = db.transaction(['pending'], 'readwrite')

  // access your pending object store
  const store = transaction.objectStore('pending')

  // add record to your store with add method.
  store.add(record)
}
// This is called with an online event listener
export function checkDatabase () {
  // open a transaction on your pending db
  const transaction = db.transaction(['pending'], 'readwrite')
  // access your pending object store
  const store = transaction.objectStore('pending')
  // get all records from store and set to a variable
  const getAll = store.getAll()
  // if there a values in the indexedDB post them to the actual database
  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          const transaction = db.transaction(['pending'], 'readwrite')

          // access your pending object store
          const store = transaction.objectStore('pending')

          // clear all items in the store once they have been posted to the database
          store.clear()
        })
        .catch(err => console.log(err))
    }
  }
}
