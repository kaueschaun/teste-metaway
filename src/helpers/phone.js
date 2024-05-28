export default function phoneFormatter(phone) {
    phone = phone.replace(/[^\d]/g, "");

    if (phone.length === 11) {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    else if (phone.length === 10) {
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    else {
        return phone;
    }
}

