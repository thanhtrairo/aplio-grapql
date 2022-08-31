import mongoose from "mongoose";

const vacationSchema = mongoose.Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    isConfirm: {
      type: Boolean,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const vacation = mongoose.model("Vacation", vacationSchema);

export default vacation;
