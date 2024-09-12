const first_name = $('input#first_name')
const last_name = $('input#last_name')
const email = $('input#email')
const phone = $('input#phone')
const address = $('input#address')
const city = $('input#city')
const state = $('select#state')
const zipcode = $('input#zipcode')
const checkme = $('input#checkme')
const nameOnCard = $('input#card_name')
const numberOnCard = $('input#card_number')
const month = $('input#month')
const year = $('input#year')
const cvv = $('input#cvv')


const messageBlank = 'This field not blank!'
const messageText = 'This field only allow text!'

const isText = (input) => {
    return /^[A-Za-z0-9]*$/.test(input)
}

const isPhoneVN = (input) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(input);
}

const isValidLength = (input, length) => {
    if(!/^\d+$/.test(input)) return false 
    return input.length === length
}

const isValidEmail = (email) => {
    let emailParts = email.split('@')
    if (emailParts.length !== 2) return false
    const username = emailParts[0]
    if (!(/^[A-Za-z0-9]*$/.test(username))) return false
    return emailParts[1] === 'fsoft.com.vn'
}

const isValidMonth = (month) => {
    if(month.length !== 2) return false
    try {
        let monthInt = parseInt(month)
        return monthInt >= 1 && monthInt <= 12
    } catch (error) {
        return false
    }
}

const isValidYear = (year) => {
    if(year.length !== 4) return false
    try {
        let yearInt = parseInt(year)
        return yearInt > 2000
    } catch (error) {
        return false
    }
}

const isValidCardNumber = (cardNumber) => {
    return /^[0-9]{16}$/.test(cardNumber)
}

const fieldValidateText = ['first_name', 'last_name', 'address', 'city', 'card_name'] 

const fieldNumberValid = [
    {id: 'zipcode', length: 5},
    {id: 'cvv', length: 3},
]

const addDefaultRow = () => {
    if($('tbody tr').length === 0){
        const rowDefault = '<tr id="col_default"><td class="text-center" colspan="100%">No data</td></tr>'
        $('tbody').append(rowDefault)
    }
    else $('tbody tr#col_default').remove()
}

// addDefaultRow()

$('form').submit((e) => {
    e.preventDefault()

    // Hide all message invalid
    $('.invalid_feedback').text('')
    $('input').css('border-color', '#ccc')

    let formValid = true;

    //Check if select has changed
    // if($('select#state').val() == 0){
    //     $('select#state').next().text('You must choose one!')
    //     formValid = false
    // }

    // Selector field input to validate
    // $('input').each(function() {
    //     const valueInput = $(this).val().trim()
    //     const id = $(this).prop('id')

    //     if(!valueInput || ($(this).prop('type') === 'checkbox' && !$(this).prop('checked'))){
    //         $(this).next().text(messageBlank)
    //         formValid = false
    //         $(this).css('border-color', 'red')
    //     }
    //      else{
    //         if(fieldValidateText.includes(id) && !isText(valueInput)){
    //             $(this).next().text(messageText)
    //             formValid = false
    //         }
    //         else if(fieldNumberValid.some(field => field.id === id) && !isValidLength(valueInput, fieldNumberValid.find(field => field.id === id).length)){
    //             $(this).next().text('Length must')
    //             formValid = false
    //         }
    //         else if(id === 'email' && !isValidEmail(valueInput)){
    //             $(this).next().text('Email must use domain @fsoft.com.vn')
    //             formValid = false
    //         } 
    //         else if(id === 'phone' && !isPhoneVN(valueInput)){
    //             $(this).next().text('Phone number invalid!')
    //             formValid = false
    //         }
    //         else if(id === 'month' && !isValidMonth(valueInput)){
    //             $(this).next().text('Month must be between 1 and 12!')
    //             formValid = false
    //         }
    //         else if(id === 'year' && !isValidYear(valueInput)){
    //             $(this).next().text('Year must be > 2000!')
    //             formValid = false
    //         }
    //         else if(id === 'card_number' && !isValidCardNumber(valueInput)){
    //             $(this).next().text('Card number must be 11 numbers!')
    //             formValid = false
    //         }
    //     }
    // })

    // Skip if form was invalid 
    if(!formValid) return

    // If form valid, create new row to add data
    const row = 
        `<tr>
            <td id="col-first_name">${first_name.val()}</td>
            <td id="col-last_name">${last_name.val()}</td>
            <td id="col-email">${email.val()}</td>
            <td id="col-phone">${phone.val()}</td>
            <td id="col-address">${address.val()}</td>
            <td id="col-city">${city.val()}</td>
            <td id="col-state">${state.val()}</td>
            <td id="col-zipcode">${zipcode.val()}</td>
            <td id="col-card_name">${nameOnCard.val()}</td>
            <td id="col-card_number">${numberOnCard.val()}</td>
            <td id="col-month">${month.val()}</td>
            <td id="col-year">${year.val()}</td>
            <td id="col-cvv">${cvv.val()}</td>
            <td id="action">
                <button id="edit" class="btn btn-warning">Edit</button>
                <button id="delete" class="btn btn-danger">Delete</button>
            </td>
        </tr>`

    // Add row into table
    $('tbody').append(row)
    userCount++
    $('#countUser').text(`User count: ${userCount}`)
    $('form').trigger('reset')
    // addDefaultRow()
})

let myModal = new bootstrap.Modal($('.modal'), {
    keyboard: false
})

// Choose tag: 'button' on table to handle Delete row
$('table').on('click', 'button#delete', function() {
    const rowDelete = $(this).parent().parent()
    
    myModal.toggle()

    $('.modal button').each(function(){
        $(this).click(function(){
            if($(this).attr('id') === 'yes'){
                rowDelete.remove()
                myModal.hide()
                $('#countUser').text(`User count: ${$('tbody tr').length}`)
            }
            $('#exampleModal').hide()
        })
    })
})

// Get data from table row
$('table').on('click', 'button#edit', function() {
    $(this).parent().parent().children().each(function(){
        const id = $(this).attr('id')
        const idInput = id.split('-')[1]
        if(id !== 'action'){
            $(`input#${idInput}`).val($(this).text())
        }
        if(idInput === 'state'){
            $(`select#${idInput}`).val($(this).text())
        }
    })
})