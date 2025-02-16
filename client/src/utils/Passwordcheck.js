export const validatePassword = (password) => {
    const minLength = 8;
    const minLowercase = 1;
    const minUppercase = 1;
    const minSymbols = 1;
    const minNumbers = 1;

    const errors = [];

    // Check lowercase letters
    const lowercaseRegex = /[a-z]/g;
    if ((password.match(lowercaseRegex) || []).length < minLowercase) {
        errors.push("Password must contain at least one lowercase letter.");
    }

    // Check uppercase letters
    const uppercaseRegex = /[A-Z]/g;
    if ((password.match(uppercaseRegex) || []).length < minUppercase) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    // Check symbols
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if ((password.match(symbolRegex) || []).length < minSymbols) {
        errors.push("Password must contain at least one symbol.");
    }

    // Check numbers
    const numberRegex = /[0-9]/g;
    if ((password.match(numberRegex) || []).length < minNumbers) {
        errors.push("Password must contain at least one number.");
    }

    // Check length
    if (password.length < minLength) {
        errors.push("Password must be at least 8 characters long.");
    }

    // If no errors, return true
    return errors.length === 0 ? true : errors;
}