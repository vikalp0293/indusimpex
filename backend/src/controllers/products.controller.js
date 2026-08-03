// Stub controller — wire up to MySQL via ../config/db when the products table exists.

exports.list = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: list products' });
};

exports.getBySlug = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: get product by slug' });
};

exports.create = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: create product' });
};

exports.update = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: update product' });
};

exports.remove = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: delete product' });
};
