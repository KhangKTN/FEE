// Test only number with length = 16
console.log(new RegExp('^[0-9]{16}$').test('1234567890123456'));

// Test number
console.log(/^-?[0-9]\d*(\.\d+)?$/.test('-12'));

// Test email
console.log(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test('abc1342@gmail.com'));

// Test url
var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

console.log(pattern.test('http://www.w3schools.com/'));
console.log(pattern.test('https://www.w3schools.com/'));

// Test
console.log(/^[A-Za-z0-9 ]*$/.test('123a'));

const validateEmail = (email) => {
    let emailParts = email.split('@')
    if(emailParts.length !== 2) return false
    const username = emailParts[0]
    if(!(/^[A-Za-z0-9]*$/.test(username))) return false
    return emailParts[1] === 'fsoft.com.vn'
}

console.log(/^\d{11}$/.test('12341234123'));

console.log(/^[0-9]{10}$/.test('12345678901'));

console.log(/^\d+$/.test('01'));
