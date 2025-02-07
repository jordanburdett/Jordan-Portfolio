const validateInfoCard = (infoCard) => {
  if (!infoCard) {
    return { isValid: false, message: "infoCard not provided" };
  }

  if (!infoCard.id) {
    return { isValid: false, message: "infoCard id is required" };
  }

  return { isValid: true };
};

const validateInfoCardId = (id) => {
  if (!id) {
    return { isValid: false, message: "infoCardId not provided" };
  }

  return { isValid: true };
};

module.exports = {
  validateInfoCard,
  validateInfoCardId,
};
