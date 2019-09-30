

const createRequestObject = (token, options = {}) => ({
    headers: {'Authorization': 'Bearer ' + token},
    ...options
})

export default createRequestObject