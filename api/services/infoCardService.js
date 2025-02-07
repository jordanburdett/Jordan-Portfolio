const db = require("../db/connection");
const { validateInfoCardId } = require("../validation/infoCardValidation");
const adminService = require("./adminService");

const connectToCollection = async (collection) => {
  const usersCollection = await db.collection(collection);
  return usersCollection;
};

class InfoCardService {
  async getAllInfoCards(query = {}) {
    const infoCardsCollection = await connectToCollection("infoCards");
    return await infoCardsCollection.find(query).toArray();
  }

  async getPublicInfoCards() {
    const infoCardsCollection = await connectToCollection("infoCards");
    return await infoCardsCollection.find({ Hidden: false }).toArray();
  }

  async addInfoCard(infoCard) {
    const infoCardsCollection = await connectToCollection("infoCards");
    return await infoCardsCollection.insertOne(infoCard);
  }

  async updateInfoCard(infoCard) {
    const { _id, ...infoCardWithoutId } = infoCard;
    const infoCardsCollection = await connectToCollection("infoCards");
    return await infoCardsCollection.updateOne(
      { id: infoCard.id },
      { $set: infoCardWithoutId }
    );
  }

  async deleteInfoCard(infoCardId) {
    const validation = validateInfoCardId(infoCardId);
    
    if (!validation.isValid) {
      return { success: false, message: validation.message };
    }
    
    const infoCardsCollection = await connectToCollection("infoCards");
    const result = await infoCardsCollection.deleteOne({ id: infoCardId });
    
    return adminService.handleDatabaseResult(result, {
      notFoundMessage: "infoCard not found",
      notAcknowledgedMessage: "infoCard not deleted",
      successMessage: "infoCard deleted"
    });
  }
}

module.exports = new InfoCardService();
