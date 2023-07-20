export const requestBodyValidation = (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Invalid request body");
  }
};
