const bcryptjs = require('bcryptjs');

const hashPassword = (password) => {
    let salt = bcryptjs.genSaltSync(+process.env.SALT)
    let hash = bcryptjs.hashSync(password, salt)

    return hash
}

const compareHash = (password, hash) => {
    return bcryptjs.compareSync(password, hash)
}

module.exports = {hashPassword, compareHash}