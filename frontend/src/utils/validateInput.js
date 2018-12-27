const validateUsername = username => {
    console.log('validating username...')
    let error = null

    if (username.trim() === '')
        error = 'Chưa nhập Tên tài khoản'
    else if (username.length > 30)
        error = 'Tên tài khoản không được dài quá 30 kí tự'
    else if (username.length < 8)
        error = 'Tên tài khoản không được ngắn hơn 8 kí tự'

    return error
}

const validatePassword = (password, confirm_password = password) => {
    console.log('validating password...')
    let error = null
    if (password.trim() === '') error = 'Chưa nhập password'
    if (password !== confirm_password) error = 'Mật khẩu không đồng nhất'
    return error
}

const validateEmail = email => {
    console.log('validating email...')
    let error = null
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email)) error = 'Địa chỉ email không hợp lệ'
    return error
}

export {
    validatePassword,
    validateUsername,
    validateEmail
}