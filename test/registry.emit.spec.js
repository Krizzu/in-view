import test from 'ava';
import Registry from '../src/registry';

test('Registry.emit calls each handler', t => {

    let registry = Registry([]);

    registry.on('enter', x => t.true(x === 'a'));
    registry.on('enter', y => t.true(y === 'a'));

    registry.on('exit', x => t.true(x === 'b'));
    registry.on('exit', y => t.true(y === 'b'));

    registry.once('enter', x => t.true(x === 'a'));
    registry.once('enter', y => t.true(y === 'a'));

    registry.once('exit', x => t.true(x === 'b'));
    registry.once('exit', y => t.true(y === 'b'));

    registry.emit('enter', 'a');
    registry.emit('exit', 'b');

});

test('Registry.emit removes once handlers', t => {

    let registry = Registry([]);

    registry.once('enter', () => {});
    t.true(registry.singles.enter.length === 1);

    registry.emit('enter', {});
    t.true(!registry.singles.enter.length);

});

test('Registry.emit returns the registry', t => {
    let registry = Registry([]);
    t.deepEqual(registry.emit('enter', {}), registry);
});


test('Registry.emit throws an error for invalid event name or its type', t => {
    let registry = Registry([]);

    const error1 = t.throws( () => { registry.emit('invalid') }, Error);
    t.is(error1.message, `Event name "invalid" is not valid. Use either "enter" or "exit".`)

    const error2 = t.throws( () => { registry.emit(123) }, Error);
    t.is(error2.message, `No event name provided or event type is not a string.`)
});