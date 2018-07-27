class IteratorFromArray {
  constructor(arr) {
    this._array = arr
    this._cursor = 0
  }

  next() {
    return this._cursor < this._array.length
      ? { value: this._array[this._cursor++], done: false }
      : { value: undefined, done: true }
  }

  map(callback) {
    const iterator = new IteratorFromArray(this._array)
    return {
      next: () => {
        const { done, value } = iterator.next()
        return {
          done: done,
          value: done ? undefined : callback(value)
        }
      }
    }
  }
}

const ite = new IteratorFromArray([1, 2, 3])
const maped = ite.map(val => val * 2)
let ret = maped.next() 
while(!ret.done) {
  console.log(ret.value)
  ret = maped.next()
}
