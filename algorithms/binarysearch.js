let sortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let n = 12;

function binarySearchIt (n, list) {
    let min = 0;
    let max = list.length - 1;
    let supposition = 0;

    while (min <= max) {
        let mid  = Math.floor((min + max) / 2);
        supposition += 1;
        if (n == list[mid]) {
            return "("+ mid + ", " + n + ")" + " " + "Found in " + supposition + " guesses";
        } else if (list[mid] < n) {
            min = mid + 1;
        } else  {
            max = mid - 1;
        }
    }
}

console.log(binarySearchIt(n, sortedList)); // (11, 12)