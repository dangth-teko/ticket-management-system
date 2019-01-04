const validateUsername = username => {
    let error = null
    if (username.trim() === '')
        error = 'Chưa nhập Tên tài khoản'
    else if (username.length > 30)
        error = 'Tên tài khoản không được dài quá 30 kí tự'
    else if (username.length < 8)
        error = 'Tên tài khoản không được ngắn hơn 8 kí tự'

    return error
}

const validatePassword = (password, confirmPassword = password) => {
    let error = null
    let REGEX_PASSWORD = /^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){1,})(?=(?:.*\d){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,})$/
    if (password.trim() === '') error = 'Chưa nhập password'
    if (password !== confirmPassword) error = 'Mật khẩu không đồng nhất'
    if (!REGEX_PASSWORD.test(password)) error = 'Mật khẩu phải gồm chữ hoa, chữ thường, chữ số và không ngắn hơn 8 kí tự'
    return error
}

const validateEmail = email => {
    let error = null
    let REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!REGEX_EMAIL.test(email)) error = 'Địa chỉ email không hợp lệ'
    return error
}

export {
    validatePassword,
    validateUsername,
    validateEmail
}
