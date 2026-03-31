import { Dayjs } from "dayjs";

const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};


const isPasswordValid = (password: string, password2: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (password !== password2) {
        return false;
    } else {
        return passwordRegex.test(password);
    }
};


const isNameValid = (name: string): boolean => {
    return name.trim().length > 0;
}

const isBirthdayValid = (birthday: Dayjs): boolean => {
    const today = new Date();
    const birthDate = birthday.toDate();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 13;
}
export { isEmailValid, isPasswordValid, isNameValid, isBirthdayValid };
