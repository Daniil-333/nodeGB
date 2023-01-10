const EventEmitter = require('events');
const emitter = new EventEmitter();

// console.log('Record 1');

// setTimeout(() => {
//     console.log('Record 2');
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             console.log('Record 3');
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });
// console.log('Record 5');
// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));

// Ответ: 1 5 6 2 3 4


/** 
 * node index.js 21-31-01-2023 25-02-02-2023
*/

let argv = process.argv.slice(2).map(arg => {
    let arr = arg.split('-').reverse();
    return arg = `${arr[0]}-${arr[1]}-${arr[2]} ${arr[3]}:00:00 GMT`;
});

const run = async () => {
    argv.forEach(arg => {
        emitter.emit('timerTick', arg);
    })
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await run();
}


class Handler {

    static tick(dt) {
        let end = new Date(dt);

        let _second = 1000;
        let _minute = _second * 60;
        let _hour = _minute * 60;
        let _day = _hour * 24;

        let now = Date.now() + (5*60*60*1000);
        let distance = end - now;

        if (distance < 0) {
            emitter.emit('removeTick');
            return;
        }

        let days = Math.floor(distance / _day);
        let hours = Math.floor((distance % _day) / _hour);
        let minutes = Math.floor((distance % _hour) / _minute);
        let seconds = Math.floor((distance % _minute) / _second);

        console.log(`LEFT: days ${days} hours ${hours} minutes ${minutes} seconds ${seconds}`);
    }

    static clear() {
        console.log('Time is up');
    }
}

emitter.on('timerTick', Handler.tick);
emitter.on('removeTick', Handler.clear);

run();