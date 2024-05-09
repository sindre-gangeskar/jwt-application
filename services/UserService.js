class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async create(username, password) {
        await this.User.create({ username: username, password: password });
    }
    async getAll() {
        return await this.User.findAll({ where: {} });
    }
    async getOne(id) {
        return await this.User.findOne({ where: { id: id } });
    }
    async getOnebyName(username) {
        return await this.User.findOne({ where: { username: username } });
    }
}

module.exports = UserService;