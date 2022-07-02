export const isValidError = (error: any) => {
  const hasAllProperties =
    "message" in error && "error_code" in error && "type" in error;
  const everyPropertyIsDefined =
    !!error.message && !!error.error_code && !!error.type;
  return hasAllProperties && everyPropertyIsDefined;
};
