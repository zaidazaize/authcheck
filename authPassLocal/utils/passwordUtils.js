const bcrypt = require("bcrypt");
const satlRounds = 10;

module.exports.generateHash = async (password) => {
    const data = {};
    data.password = password;
    data.hash = await bcrypt.hash(password, satlRounds);
    return data;
}

module.exports.isValidPassword =  (password, hash)=>{
    return  bcrypt.compare(password,hash)
}



