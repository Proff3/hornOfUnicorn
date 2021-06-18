import MongoDB from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const mongoClient = new MongoDB.MongoClient(`mongodb+srv://pron9:${process.env.db_password}@cluster0.x42j8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
});
class DataBaseAPI {
    async connect(dbTitle) {
        try {
            this.client = await mongoClient.connect();
            this.db = this.client.db(dbTitle);
        }
        catch (err) {
            console.log(err);
        }
    }
    async getCollection(collection) {
        let data;
        try {
            data = await this.db.collection(collection).find().toArray();
        }
        catch (err) {
            console.error(`Something went wrong: ${err}`);
        }
        return data;
    }
    async insert(collection, data) {
        const requiredCollection = this.db.collection(collection);
        if (Array.isArray(data)) {
            await requiredCollection.insertMany(data);
        }
        else {
            await requiredCollection.insertOne(data);
        }
    }
    async deleteOne(collection, data) {
        if (typeof data === "object" && data !== null) {
            const requiredCollection = this.db.collection(collection);
            await requiredCollection.deleteOne(data);
        }
        else {
            throw new Error("Неверно введен формат данных для удаления");
        }
    }
    async updateOne(collection, key, value, data) {
        const requiredCollection = this.db.collection(collection);
        let filter = {};
        filter[key] = value;
        await requiredCollection.updateOne(filter, {
            $set: data,
        });
    }
    async createOrUpdate(collection, key, value, data) {
        let requiredCollection = await this.getCollection(collection);
        if (requiredCollection.find((item) => item[key] == value)) {
            await this.updateOne(collection, key, value, data);
        }
        else {
            await this.insert(collection, data);
        }
    }
}
export default new DataBaseAPI();
