'use strict';

function readFile() {
    const fs = require('fs')
    const file = fs.readFileSync('./dummyUser.csv', { encoding: 'utf-8' }).split('\n')
    let collectContacts = []
        // console.log(file)
    for (let i = 0; i < file.length; i++) {
        let obj = {}
        let collect = file[i].split(',')
            // console.log(collect)
        obj['name'] = collect[0]
        obj['username'] = collect[0]
        obj['password'] = collect[0]
        obj['createdAt'] = new Date()
        obj['updatedAt'] = new Date()
        collectContacts.push(obj)
            // collectAddresses.push(collect.splice(1, file[i].length - 1))
    }
    return collectContacts
        // console.log(collectAddresses)
}

let file = readFile()

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return queryInterface.bulkInsert('Users', file)
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('Users', file)
    }
};