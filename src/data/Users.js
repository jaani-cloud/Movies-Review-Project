

export const Users = [
    {
        id: 1,
        username: "jaani_cloud",
        email: "jaanilyrical@gmail.com",
        password: "Rohit@45",
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
        password: "Sharma@45",
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
    if (user.password === password) {

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};