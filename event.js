const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('event', () => {
  console.log('Ha ocurrido un evento');
});

emitter.emit('event');
