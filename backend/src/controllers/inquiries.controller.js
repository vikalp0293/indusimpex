// Stub controller — wire up to MySQL via ../config/db when the inquiries table exists.

exports.list = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: list inquiries' });
};

exports.create = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: create inquiry (RFQ submission)' });
};

exports.update = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: update inquiry status' });
};
