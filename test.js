var my_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

var looks = [];

console.log(my_array);

looks = looks.concat(my_array.splice(3, 6));

console.log(looks);
console.log(my_array);

// looks = looks.concat(my_array.splice(3, 3));
//
// console.log(looks);
// console.log(my_array);

// console.log(result2);
// console.log(result3);
// console.log(result4);
// console.log(result5);
