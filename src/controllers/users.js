import bcrypt from "bcrypt";
import users from "../model/user.js";
import { signToken } from "../middleware/jwt.js";

export const getAllUsers = async (req, res) => {
  try {
    const Users = await users.find({});
    res.status(200).json({ Users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const registerUser = async (req, res) => {
  let { name, email, password, phone, role } = req.body;

  const login_email = await users.findOne({ email: email });

  if (login_email) {
    return res.status(200).json({ msg: "This email is in use" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new users({
      name,
      email,
      password: hashedPass,
      phone,
      role,
    });

    const user = await newUser.save();
    res
      .status(200)
      .json({ msg: "You are now registered, You can LogIn", data: user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    const userlogin = await users.findOne({ email: email });

    if (!userlogin) {
      return res.status(400).json({ msg: "No account!, Please register" });
    }

    const validated = await bcrypt.compare(password, userlogin.password);

    if (!validated) {
      return res.status(400).json({ msg: "Wrong password!" });
    }

    const token = await signToken(userlogin);

    return await res.status(200).json({
      message: "You have successfully Logged in ",
      data: userlogin,
      Token: token,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//Update User
export const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({ msg: "updated", data: updatedUser });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await users.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: `No user with id ${userId}` });
    }

    const deletedUser = await users.findByIdAndDelete(userId);

    return res
      .status(200)
      .json({ msg: "User has been deleted...", data: deletedUser });
  } catch (error) {
    res.status(404).json("User not found");
  }
};
