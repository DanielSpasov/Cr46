export const isValidError = (error: any) => {
  const hasAllProperties = "message" in error && "error_code" in error;
  const everyPropertyIsDefined = !!error.message && !!error.error_code;
  return hasAllProperties && everyPropertyIsDefined;
};
