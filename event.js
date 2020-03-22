const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('event', () => {
  console.log('Ha ocurrido un evento');
});

emitter.emit('event');

emitter.on('eventWithArgument', (arg) => {
  console.log('Ha ocurrido un evento con estos argumentos: '+ arg.id +' '+arg.number);
})

emitter.emit('eventWithArgument', {id: 1, number: 23});
