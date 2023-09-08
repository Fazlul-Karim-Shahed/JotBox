
const checkRequiredFields = (obj, requiredFields) => {

    for (let i = 0; i < requiredFields.length; i++) {
        const fieldName = requiredFields[i];

        if (!(fieldName in obj)) {
            return false;
        }

        if (obj[fieldName] === null || obj[fieldName] === undefined || obj[fieldName] === '') {
            return false;
        }
    }

    return true;
}


exports.checkRequiredFields = checkRequiredFields