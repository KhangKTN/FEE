const users = [
    { id: 1, first_name: "Eamon", last_name: "Harhoff", email: "eharhoff0@imageshack.us", gender: "Male", age: 70, salary: 18888 },
    { id: 2, first_name: "Laney", last_name: "Whittam", email: "lwhittam1@issuu.com", gender: "Male", age: 39, salary: 15018 },
    { id: 3, first_name: "Lynett", last_name: "Twinberrow", email: "ltwinberrow2@gov.uk", gender: "Female", age: 80, salary: 13343 }
];  

// Filter
const userFilter = users.filter(user => user.gender === 'Male' && user.age < 40)
console.log(userFilter);

// Map
const listFullname = users.map(user => user.first_name + ' ' + user.last_name)
console.log(listFullname);

// Reduce
const totalAge = users.reduce((avg, user) => avg + user.age, 0)
const ageAvg = totalAge/users.length
console.log(totalAge);
console.log(ageAvg);