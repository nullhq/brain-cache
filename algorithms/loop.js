let n = 12;
for(let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
        if (j == i || i == n) {
            console.log("*".repeat(n));
            break;
        } else {
            console.log("*"+ " ".repeat(n-2) + "*");
            break;
        }
    }
}