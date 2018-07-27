const Rx = require('rxjs')

const observer = {
  next: val => console.log('next:', val),
  error: err => console.error('error:', err),
  complete: res => console.log('complete!', res ? res : '')
}
const o1 = Rx.Observable.create(function(observer) {
  observer.next('1')
  observer.next('2')
})

o1.subscribe(observer)

const o2 = Rx.Observable.of('Jerry', 'Tom')
o2.subscribe(observer)

const o3 = Rx.Observable.from(['Jerry', 'Tom', 2018, 'rxjs'])
o3.subscribe(observer)

const o4 = Rx.Observable.from('Jerry我们')
o4.subscribe(observer)

const o5 = Rx.Observable.from(
  new Promise(resolve => setTimeout(() => resolve('resolved')), 0)
)
o5.subscribe(observer)

// const o6 = Rx.Observable.fromEvent(document.body, 'click')
// o6.subscribe(observer)

class Producer {
  constructor() {
    this.listeners = []
  }

  addListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener)
    } else {
      throw new TypeError('Listener must be function')
    }
  }
  removeListener(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1)
  }

  notify(message) {
    this.listeners.forEach(listener => listener(message))
  }
}

const ep = new Producer()
const o7 = Rx.Observable.fromEventPattern(
  // handler => ep.addListener(handler),
  // handler => ep.removeListener(handler)
  ep.addListener.bind(ep),
  ep.removeListener.bind(ep)
)
o7.subscribe(observer)
ep.notify('Hello, can you hear me?')

// Special Observables
const o8 = Rx.Observable.empty()
o8.subscribe(observer)

const o9 = Rx.Observable.never()
o9.subscribe(observer)

const o10 = Rx.Observable.throw('Error Occured!')
o10.subscribe(observer)

const o11 = Rx.Observable.interval(1000)
const unsub11 = o11.subscribe(observer)

const o12 = Rx.Observable.timer(1000)
const unsub12 = o12.subscribe(observer)

const o13 = Rx.Observable.timer(1000, 100)
const unsub13 = o13.subscribe(observer)

setTimeout(() => {
  unsub11.unsubscribe()
  unsub12.unsubscribe()
  unsub13.unsubscribe()
}, 5000)
