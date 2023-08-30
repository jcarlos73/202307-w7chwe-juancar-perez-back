import mongoose from "mongoose";
import { type RobotStructure } from "../types.js";

export const robotsMock: RobotStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "klok",
    image:
      "https://img.freepik.com/premium-photo/robot-dog-is-robot-factoryfuturistic-technologies-future-generative-ai_76964-15430.jpg?size=626&ext=jpg&ga=GA1.1.1619950158.1693307503&semt=sph",
    speed: 4,
    endurance: 8,
  },

  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "bluffik",
    image:
      "https://img.freepik.com/premium-vector/cute-robot-cyborg-modern-robotic-character-artificial-intelligence-technology-concept-vector-illustration_48369-42931.jpg?w=1380",
    speed: 6,
    endurance: 4,
  },
];

export const createdRobotMock: Omit<RobotStructure, "_id"> = {
  name: "klok",
  image:
    "https://img.freepik.com/premium-photo/robot-dog-is-robot-factoryfuturistic-technologies-future-generative-ai_76964-15430.jpg?size=626&ext=jpg&ga=GA1.1.1619950158.1693307503&semt=sph",
  speed: 4,
  endurance: 8,
};

export const incorrectRobotMock: Omit<RobotStructure, "name"> = {
  _id: new mongoose.Types.ObjectId().toString(),
  image:
    "https://img.freepik.com/premium-vector/cute-robot-cyborg-modern-robotic-character-artificial-intelligence-technology-concept-vector-illustration_48369-42931.jpg?w=1380",
  speed: 6,
  endurance: 4,
};
