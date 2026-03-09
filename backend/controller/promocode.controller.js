const Promo = require("../model/promocode.model");

// validate promo code
const validatePromo = async (req, res) => {
  try {
    const { code } = req.body;
    const promo = await Promo.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!promo) {
      return res.status(400).json({
        success: false,
        message: "Invalid promo code",
      });
    }

    if (promo.expireAt && promo.expireAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Promo code expired",
      });
    }

    if (promo.usageLimit !== 0 && promo.usedCount >= promo.usageLimit) {
      return res.status(400).json({
        success: false,
        message: "Promo code usage limit reached",
      });
    }

    res.json({
      success: true,
      code: promo.code,
      discount: promo.discountAmount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create promo code (admin)
const createPromo = async (req, res) => {
  try {
    const promo = await Promo.create(req.body);

    res.status(201).json({
      success: true,
      promo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all promo
const getPromos = async (req, res) => {
  try {
    const promos = await Promo.find().sort({ createdAt: -1 });

    res.json(promos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { validatePromo, createPromo, getPromos };
