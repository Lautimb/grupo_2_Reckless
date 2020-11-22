const path = require('path');
const fs = require('fs');


const usersHelper = {
    getAllUsers: () =>{
        const usersData = path.join('./src/data/users-data.json');
        return JSON.parse(fs.readFileSync(usersData, 'utf-8'));
    },
    getAllBusinessUsers: () =>{
        const businessUsersData = path.join('./src/data/business-users-data.json');
        return JSON.parse(fs.readFileSync(businessUsersData, 'utf-8'));
    },
    generateId: () =>{
        const allUsersData = usersHelper.getAllUsers();
        return allUsersData.pop().id +1;
    },
    generateBusinessId: () =>{
        const allBusinessUsersData = usersHelper.getAllBusinessUsers();
        return allBusinessUsersData.pop().id +1;
    },
    writeUserData: (usersToSave) => {

        const usersToStringify = JSON.stringify(usersToSave, null, ' ');
        return fs.writeFileSync('./src/data/users-data.json', usersToStringify);

    },
    writeBusinessUserData: (businessUsersToSave) => {

        const usersToStringify = JSON.stringify(businessUsersToSave, null, ' ');
        return fs.writeFileSync('./src/data/business-users-data.json', usersToStringify);

    }

}

module.exports = usersHelper;