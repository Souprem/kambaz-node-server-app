import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  let { users } = db;
  
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    db.users.push(newUser);
    return newUser;
  };

  const findAllUsers = () => db.users;

  const findUserById = (userId) => db.users.find((user) => user._id === userId);

  const findUserByUsername = (username) => db.users.find((user) => user.username === username);

  const findUserByCredentials = (username, password) =>
    db.users.find((user) => user.username === username && user.password === password);

  const updateUser = (userId, user) => {
    const index = db.users.findIndex((u) => u._id === userId);
    if (index !== -1) {
      db.users[index] = { ...db.users[index], ...user };
      return db.users[index];
    }
    return null;
  };

  const deleteUser = (userId) => {
    const index = db.users.findIndex((u) => u._id === userId);
    if (index !== -1) {
      db.users.splice(index, 1);
      return { deleted: 1 };
    }
    return { deleted: 0 };
  };

  const findUsersByRole = (role) => db.users.filter((user) => user.role === role);

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return db.users.filter((user) => 
      regex.test(user.firstName) || regex.test(user.lastName)
    );
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
    findUsersByPartialName,
  };
}
