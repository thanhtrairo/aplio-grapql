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
  createVacation: async (args) => {
    const newVacation = new vacation(args);
    return await newVacation.save();
  },
};

export default mongoDataMethods;
