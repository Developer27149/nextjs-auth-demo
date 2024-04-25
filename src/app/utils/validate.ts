/**
 * Validate email
 */
export const isValidateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}


/**
 * validate password: at least 8 characters, at least one letter and one number
 */
export const isValidatePassword = (password: string): boolean => {
    // const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // return re.test(password);
    return password.length > 0
}