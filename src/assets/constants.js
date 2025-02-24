// Backend URL
export const API = "http://localhost:3000"

// Create function to check if password has at least 8 characters, a lowercase letter, an uppercase letter, and a number
export function isValidPassword(password) {
    const hasMinLength = password.length >= 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    return {
        hasMinLength,
        hasLowercase,
        hasUppercase,
        hasNumber,
        passwordValid: hasMinLength && hasLowercase && hasUppercase && hasNumber
    }
}

// Create function to check if email is valid
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Create function to check if username is valid (at least 4 characters, no spaces, starts with a letter and only contains letters, numbers, and underscores)
export function isValidUsername(username) {
    const hasMinLength = username.length >= 4;
    const noSpaces = !/\s/.test(username);
    const startsWithLetter = /^[A-Za-z]/.test(username);
    const validCharacters = /^[A-Za-z0-9_]+$/.test(username);

    return hasMinLength && noSpaces && startsWithLetter && validCharacters;
}

// Create function to check if a string is valid (starts with a letter and only contains letters, numbers, and spaces)
export function isValidName(string) {
    const startsWithLetter = /^[A-Za-z]/.test(string);
    const validCharacters = /^[A-Za-z0-9 ]+$/.test(string);
    return startsWithLetter && validCharacters;
}

// Create function to check if a string might be a valid username or a valid email
export function isValidUsernameOrEmail(string) {
    return isValidEmail(string) || isValidUsername(string)
}

// Create a function to format money in the format $X,XXX.XX
export const formatMoney = (amount) => {
    const num = Number(amount);
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatMoney2 = (amount) => {
    // Parse the input as an integer
    const num = Math.floor(Number(amount));
    return '$ ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};