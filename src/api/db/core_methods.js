
class CoreDbMethods {

    create = async (collectionName, payload) => {
        return collectionName.create(payload);
    }

    get  = async (collectionName, lenderId) => {
        return collectionName.findById(lenderId);
    }

    update = async (collectionName, recordId, payload) => {
        return collectionName.findByIdAndUpdate(recordId, payload, { new: true });
    }

}

module.exports.CoreDbMethods = new CoreDbMethods();
