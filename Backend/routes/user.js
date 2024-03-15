const { Router } = require("express");
const zod = require("zod");
const { User, Account } = require("../dbModels");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = Router();

const signupBody = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Username already taken / Incorrect inputs",
    });
  }
  try {
    const existingUser = await User.findOne({
      username: req.body.username,
    });

    if (existingUser) {
      res.status(411).json({
        message: "Username already taken / Incorrect inputs",
      });
      return;
    }
    const user = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });

    const userId = user._id;

    const token = await jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    await Account.create({
      userId,
      balance: 1 + Math.ceil(Math.random() * 10000),
    });

    return res.status(200).json({
      message: "User created successfully",
      jwt: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while signing up",
    });
  }
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      return res.status(411).json({
        message: "Error while logging in",
      });
    }

    const userId = user._id;

    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      jwt: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while login",
    });
  }
});

const updateBody = zod.object({
  firstName: zod.string().optional(),
  password: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Updated successfully",
    });
  }

  try {
    await User.updateOne(req.body, {
      _id: req.userId,
    });

    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while updating user account",
    });
  }
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    }).select("-password -createdAt -updatedAt");

    const filteredUser = users.filter(
      (user) => req.userId !== user._id.toString()
    );
    res.status(200).json({
      user: filteredUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while searching users",
    });
  }
});

module.exports = userRouter;
