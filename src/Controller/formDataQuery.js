const query = (model, res) => {
  try {
    model.findAll().then((value) => res.status(200).json(value));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error Server" });
  }
};

module.exports = { query };
