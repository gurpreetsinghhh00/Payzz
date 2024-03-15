export const validateSignup = (username, password, firstname) => {
  const isfirstNameValid = /^.{1,}$/.test(firstname);
  const isUsernameValid = /^.{4,50}$/.test(username);
  const isPasswordValid = /^.{8,}$/.test(password);

  if (!firstname) return "Enter a valid name";
  if (!isUsernameValid)
    return "Enter a username length must be between 4 and 50 characters";
  if (!isPasswordValid) return "Password length must be atleast 8.";

  return null;
};

export const validateSignin = (username, password) => {
  const isUsernameValid = /^.{4,50}$/.test(username);
  const isPasswordValid = /^.{8,}$/.test(password);

  if (!isUsernameValid)
    return "Enter a username length must be between 4 and 50 characters";
  if (!isPasswordValid) return "Password length must be atleast 8.";

  return null;
};
