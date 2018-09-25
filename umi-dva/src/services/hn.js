import Firebase from 'firebase'

const api = new Firebase('https://hacker-news.firebaseio.com/v0')

/**
 * fetch base-functions, called in effects.
 * so it needs to return the promise
 */
function fetch(child) {
  return new Promise((resolve, reject) => {
    api.child(child).once('value', (snapshot) => {
      const val = snapshot.val()

      if (val) {
        resolve(val)
      } else {
        setTimeout(() => {
          fetch(child).then(val => resolve(val))
        }, 500)
      }
    }, reject)
  })
}

export function fetchIdsByType(type) {
  return fetch(`${type}stories`)
}

export function fetchItem(id) {
  return fetch(`item/${id}`)
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
  return fetch(`user/${id}`)
}

/**
 * called in subscriptions, be used to updating the list in time.
 * so it does not need to return promise.
 */
export function watchList(type, cb) {
  let first = true
  const ref = api.child(`${type}stories`)
  const handler = (snapshot) => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}
