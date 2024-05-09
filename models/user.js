module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        username: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false }
    }, { timestamps: false })


    return User;
}