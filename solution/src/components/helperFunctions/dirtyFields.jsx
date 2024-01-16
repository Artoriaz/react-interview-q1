const getDirtyFields = (form, INITIAL_STATE) =>
  Object.keys(form).reduce((acc, key) => {
    // check all form fields that have changed
    const isDirty = form[key] !== INITIAL_STATE[key];

    return { ...acc, [key]: isDirty };
  }, {});

export default getDirtyFields;
