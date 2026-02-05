const Test = require("../model/test.model");

const createTest = async (req, res) => {
  const test = await Test.create({
    exam: req.params.examId,
    ...req.body,
    isActive: false,
  });

  res.json(test);
};

module.exports = { createTest };
