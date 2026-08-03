// Stub controller — serves editable content blocks for home/about/export-info pages.

exports.getByKey = async (req, res) => {
  res.status(501).json({ message: `Not implemented: get page content for "${req.params.key}"` });
};

exports.update = async (req, res) => {
  res.status(501).json({ message: `Not implemented: update page content for "${req.params.key}"` });
};
