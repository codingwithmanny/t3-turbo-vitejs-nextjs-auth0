/**
 * Handler that will be called during the execution of a PostChangePassword flow.
 *
 * @param {Event} event - Details about the user and the context in which the change password is happening.
 * @param {PostChangePasswordAPI} api - Methods and utilities to help change the behavior after a user changes their password.
 */
exports.onExecutePostChangePassword = async (event, api) => {
  console.log("onExecutePostChangePassword");
};
