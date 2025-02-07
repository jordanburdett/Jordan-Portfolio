class AdminService {
  isAdminUser(user) {
    return !(user?.admin === false || user?.admin === null);
  }

  handleDatabaseResult(result, { notFoundMessage, notAcknowledgedMessage, successMessage }) {
    if (!result.acknowledged) {
      return { success: false, message: notAcknowledgedMessage };
    }
    
    if (result.deletedCount === 0 || result.modifiedCount === 0) {
      return { success: false, message: notFoundMessage };
    }
    
    return { success: true, message: successMessage };
  }
}

module.exports = new AdminService();
