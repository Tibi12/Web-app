import { User } from "../models/User";

export const fetchUser = async (email: string): Promise<any> => {
  const user = await User.findOne({
    where: { email },
    raw: true,
    attributes: ["id", "name", "email", "password"],
  });

  return user;
};
