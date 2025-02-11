import jwt from 'jsonwebtoken'


//create token
export const createToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });
}

//decode token =>  without verify token using secret key
export const decodeToken = (token) => {
    return jwt.decode(token);
}

//verify token =>  with verify token using secret key
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
