// challenge of the day https://www.freecodecamp.org/learn/daily-coding-challenge/2025-09-01
// The Tribonacci sequence is a series of numbers where each number is the sum of the three preceding ones. 
// When starting with 0, 0 and 1, the first 10 numbers in the sequence are 0, 0, 1, 1, 2, 4, 7, 13, 24, 44.


function tribonacciSequence(startSequence, length) {
    let outputSequence = [];
    if (length <= 0) {
        return outputSequence;
    }

    if (!startSequence.length === 3) {
        console.log("error: the starting sequence should contain exactly three numbers :)");
        return outputSequence;
    }

    let i = 0;
    while (i < length) {
        if (i<3) {
            outputSequence.push(startSequence[i]); // as the starting numbers are part of sequence.
            i++;
        } else {
            let currentLength = outputSequence.length;
            let summ = outputSequence[currentLength-1] + outputSequence[currentLength - 2] + outputSequence[currentLength - 3];
            outputSequence.push(summ); // because each number is the sum of the three preceding ones ;)
            i++;
        }
    }

    return outputSequence;
}


// tests
console.log("test 1. ", tribonacciSequence([0, 0, 1], 20)); // output : [0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927, 1705, 3136, 5768, 10609, 19513]
console.log("test 2. ", tribonacciSequence([21, 32, 43], 1)); // output : [21]
console.log("test 3. ", tribonacciSequence([0, 0, 1], 0)); // output : []
console.log("test 4. ", tribonacciSequence([10, 20, 30], 2)); // output : [10, 20]
console.log("test 5. ", tribonacciSequence([10, 20, 30], 3)); // output : [10, 20, 30]
console.log("test 6. ", tribonacciSequence([123, 456, 789], 8)); // output : [123, 456, 789, 1368, 2613, 4770, 8751, 16134]
