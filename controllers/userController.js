const { Op, where } = require("sequelize");
const { Users } = require("../models");

const findUsers = async (req, res, next) => {
  try {
    // get query parameter from request
    const { userName, roleUser, ageUser, addressUser } = req.query;

    const condition = {};
    if (userName) condition.name = { [Op.iLike]: `%${userName}%` };
    if (roleUser) condition.role = { [Op.iLike]: `%${roleUser}%` };
    if (ageUser) condition.age = ageUser;
    if (addressUser) condition.address = { [Op.iLike]: `%${addressUser}%` };

    // Query to find users with dynamic conditions
    const users = await Users.findAll({
      where: condition,
    });

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {}
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {}
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, shopId } = req.body;
  try {
    await Users.update(
      {
        name,
        age,
        role,
        address,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update user",
    });
  } catch (err) {}
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {}
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
