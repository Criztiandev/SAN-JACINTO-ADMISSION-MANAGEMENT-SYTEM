export const serverController = api => (err, event) => {
  if (err) throw new Error(err);

  console.log(api);
};
