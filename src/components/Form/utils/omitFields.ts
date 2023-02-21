const omitFields = (obj: any, ...keys: string[]) => {
  const draft = Object.create(obj);
  (keys || []).forEach((key) => {
    delete draft[key];
  });
  return draft;
};

export default omitFields;
