import bcrypt from "bcryptjs";
const password = "123";
const hashedPassword = bcrypt.hashSync(password, 8);
console.log(hashedPassword);
