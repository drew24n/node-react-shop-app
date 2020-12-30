export const validateInputs = {
    // eslint-disable-next-line
    required: '${label} is required!',
    string: {
        // eslint-disable-next-line
        max: '${name} max length: ${max} chars',
        // eslint-disable-next-line
        range: '${min} - ${max} chars length'
    },
    // eslint-disable-next-line
    whitespace: '${label} cannot be empty',
    types: {
        // eslint-disable-next-line
        email: '${label} is not valid!',
    }
}