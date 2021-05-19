import jwt from 'jsonwebtoken'

const getUserId = (request) => {
    const header = request.request.headers.authoriztion
    console.log(header)
    if (!header) {
        throw new Error('Authentication required')
    }

    const token = header.replace('Bearer', '')
    const decoded = jwt.verify(token, 'this is a secret')

    return decoded.userId
}

export { getUserId as default }