const { Router } = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { Account } = require("../dbModels");
const { default: mongoose } = require("mongoose");

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    return res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching balance",
    });
  }
});

// accountRouter.post("transfer", authMiddleware, async (req, res) => {
//   const { amount, to } = req.body;
//   const account = await Account.findOne({
//     userId: req.userId,
//   });

//   if (!account || account.balance < amount) {
//     return res.status(400).json({
//       message: "Insufficient balance",
//     });
//   }

//   const receiver = await Account.findOne({
//     userId: to,
//   });
//   if (!receiver) {
//     return res.status(400).json({
//       message: "Invalid account",
//     });
//   }

//   await Account.updateOne(
//     {
//       userId: req.userId,
//     },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   );

//   await Account.updateOne(
//     {
//       userId: to,
//     },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   );

//   return res.status(200).json({
//     message: "Transfer successful",
//   });
// });

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;
    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const receiver = await Account.findOne({
      userId: to,
    }).session(session);

    if (!receiver) {
      session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();
    return res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while tranfering amount",
    });
  }
});

module.exports = accountRouter;
