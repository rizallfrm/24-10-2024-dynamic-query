const { Op, where } = require("sequelize");
const { Users } = require("../models");

const findUsers = async (req, res, next) => {
  try {
    // get query parameter from request
    const {
      userName,
      roleUser,
      ageUser,
      addressUser,
      page = 1,
      limit = 10,
    } = req.query;

    const condition = {};
    if (userName) condition.name = { [Op.iLike]: `%${userName}%` };
    if (roleUser) condition.role = { [Op.iLike]: `%${roleUser}%` };
    if (ageUser) condition.age = ageUser;
    if (addressUser) condition.address = { [Op.iLike]: `%${addressUser}%` };

    const offset = (page - 1) * limit;
    // Query to find users with dynamic conditions
    const users = await Users.findAll({
      where: condition,
      limit: limit,
      offset: offset,
    });

    // Optionally, you can count total products if needed
    const totalUsers = await Users.count({ where: condition });

    res.status(200).json({
      status: "Success",
      data: {
        users,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers
      },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
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
