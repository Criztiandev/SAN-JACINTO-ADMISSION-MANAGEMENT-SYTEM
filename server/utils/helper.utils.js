export const checkIfExist = async (model, field, value, error) => {
  const res = await model[field](value);
  if (res) throw new Error(error);

  return res;
};
