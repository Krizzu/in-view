import test from 'ava';
import inView from '../src/in-view';
import Registry from '../src/registry';

test('inView is a function', t => {
    t.true(typeof inView === 'function');
});

test('isView throws an error for invalid selector', t => {

    const error1 = t.throws( () => { inView() }, Error);
    t.is(error1.message, `No selector provided or it's not a string.`);

    const error2 = t.throws( () => { inView(666) }, Error);
    t.is(error2.message, `No selector provided or it's not a string.`);
    
})

test('inView returns a registry', t => {
    t.true(inView('body').__proto__ === Registry([]).__proto__);
});

test('inView returns existing registries', t => {
    let registry = inView('body');
    t.true(registry === inView('body'));
});

test('inView updates existing registry elements', t => {

    const addDiv = () => {
        document.body.appendChild(
            document.createElement('div')
        );
    };

    t.true(inView('div').elements.length === 0);

    addDiv();
    t.true(inView('div').elements.length === 1);

});

test.after(initBrowserEnv);
