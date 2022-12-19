const colors = require("colors/safe");

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

let argv = process.argv.slice(2).map(arg => parseInt(arg));

argv.forEach(arg => {
    if(isNaN(arg)) {
        console.log(colors.red(`Один из аргументов не является числом`));
        process.exit();
    }
})

const nums = {
    green: 1, 
    yellow: 2, 
    red: 3
}

let i = argv[0], result, j=1;

for (i; i <= argv[1]; i++, j++) {
    if(isPrime(i)) {
        // console.log(i);
        switch(j) {
            case nums.green:
                console.log(colors.green(i));
                nums.green += 3;
                break;
            case nums.yellow:
                console.log(colors.yellow(i));
                nums.yellow += 3;
                break;
            case nums.red:
                console.log(colors.red(i));
                nums.red += 3;
                break;
        }
    }
}

// if(!result) {
//     console.log(colors.red('Нет простых чисел'));
// }else {
//     console.log(result);
// }