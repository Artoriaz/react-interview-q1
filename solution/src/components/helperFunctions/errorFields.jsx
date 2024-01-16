const getErrorFields = (form, dirtyFields, VALIDATION) =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key] || dirtyFields[key] === false) return acc;

    const errorsPerField = VALIDATION[key]
      // get a list of potential errors for each field
      // by running through all the checks
      .map((validation) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      // only keep the errors
      .filter((errorPerField) => !errorPerField.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});

export default getErrorFields;
