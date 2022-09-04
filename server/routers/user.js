import User from "../model/user.js";
import Vacation from "../model/vacation.js";

const mongoDataMethods = {
  getAllUses: async (condition = null) =>
    condition === null ? await User.find() : await User.find(condition),
  getUserById: async (id) => await User.findById(id),
  getAllVacations: async (condition = null) =>
    condition === null ? await Vacation.find() : await Vacation.find(condition),
  getVacationById: async (id) => await Vacation.findById(id),
  createUser: async (args) => {
    const newUser = new User(args);
    return await newUser.save();
  },
  updateUser: async (args) => {
    const existingUser = await User.findById(args.id);
    if (existingUser) {
      existingUser.age = args.age;
      existingUser.name = args.name;
      existingUser.email = args.email;
    }
    await existingUser.save();
    return existingUser;
  },
  createVacation: async (args) => {
    const newVacation = new Vacation(args);
    return await newVacation.save();
  },
};

export default mongoDataMethods;
