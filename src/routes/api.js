const apiBase = "http://localhost:9000";

module.exports = {
  getDataCustomer: apiBase + "/get-data-customer",
  addCustomer: apiBase + "/add-customer",
  deleteCustomer: apiBase + "/delete-customer",
  roles: apiBase + "/roles",
  users: apiBase + "/users"
};
