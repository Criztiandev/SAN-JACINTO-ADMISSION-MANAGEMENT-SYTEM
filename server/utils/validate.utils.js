export const checkUserExistance = async (
  payload,
  model,
  { exist, data = false, select = "-password" }
) => {
  const keys = Object.keys(payload);
  if (keys <= 0) {
    return "Payload is empty";
  }

  for (const key of keys) {
    const _data = await model
      .findOne({ [key]: payload[key] })
      .lean()
      .select(select);

    if (_data) {
      if (exist && !data) {
        return `${key.charAt(0).toUpperCase() + key.slice(1)} already exist`;
      } else if (exist && data) {
        return _data;
      } else {
        return null;
      }
    }
  }
};
