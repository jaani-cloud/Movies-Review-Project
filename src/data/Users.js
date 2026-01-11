import bcrypt from "bcryptjs"

const hashedAdminPassword = bcrypt.hashSync("Rohit@45", 10)
const hashedUserPassword = bcrypt.hashSync("Sharma@45", 10)

export const Users = [
    {
        id: 1,
        username: "jaani_cloud",
        email: "jaanilyrical@gmail.com",
        password: hashedAdminPassword,
        role: "admin",
        firstName: "Jaani",
        lastName: "Cloud",
        dob: null,
        profilePhoto: null,
        instagram: null,
        youtube: null,
        createdAt: "2025-01-01T00:00:00.000Z"
    },
    {
        id: 2,
        username: "rohit_sharma",
        email: "rohit@gmail.com",
        password: hashedUserPassword,
        role: "user",
        firstName: "Rohit",
        lastName: "Sharma",
        dob: null,
        profilePhoto: null,
        instagram: null,
        youtube: null,
        createdAt: "2025-01-02T00:00:00.000Z"
    }
];

export const checkEmail = (email) => {
    return Users.find(user => user.email === email);
};

export const checkData = (email, password) => {
    const user = checkEmail(email);
    if (!user) return null;

    if (bcrypt.compareSync(password, user.password)) {
        const {password: _$4571, ...userWithoutPassword} = user
        return userWithoutPassword
    }
    return null;
};