const Catagory = require('../models/catagory');
const Product = require('../models/product');
const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new Catagory({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send('Create category failed');
  }
};

exports.list = async (req, res) =>
  res.json(await Catagory.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let catagory = await Catagory.findOne({ slug: req.params.slug }).exec();
  // res.json(catagory);
  const products = await Product.find({ catagory }).populate('catagory').exec();
  res.json({
    catagory,
    products,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Catagory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('Category update failed');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Catagory.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('Catagory delete failed');
  }
};

exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
