export const validateEmail = (value) => {
    return /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}/.test(value);
};

export const validateRequired = (value) => {
    return value.trim() !== '';
};

export const validateMinLength = (value, minLength) => {
    return value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
    return value.length <= maxLength;
};