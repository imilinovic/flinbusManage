const db = require('../db')

//razred User enkapsulira korisnika web trgovine
module.exports = class User {
    //konstruktor korisnika
    constructor(username, email, password, currentpoints, totalpoints, name, surname) {
        this.user_name = username
        this.email = email
        this.password = password
        this.totalpoints = totalpoints
        this.currentpoints = currentpoints
        this.name = name
        this.surname = surname
    }

    //dohvat korisnika na osnovu korisničkog imena
    static async fetchByUsername(username) {
        let results = await dbGetUserByName(username)
        let newUser = new User()
        console.log("rezultati", results)
        console.log(results.length)
        if( results.length > 0 ) {
            newUser = new User(results[0].profileusername, results[0].profileemail,
                results[0].profilepasswordhash, results[0].profilepoints, results[0].profiletotalpoints,
                results[0].profilename, results[0].profilesurname);
        }
        console.log(newUser)
        return newUser
    }
    static async fetchAllReports() {
        let results = await dbGetAllReports()
        return results.length
    }

    //dohvat korisnika na osnovu email adrese
    static async fetchByEmail(email) {

        let results = await dbGetUserByEmail(email)
        let newUser = new User()

        if( results.length > 0 ) {
            newUser = new User(results[0].user_name, results[0].first_name,
                results[0].last_name, results[0].email, results[0].password, results[0].role)
            newUser.id = results[0].id
        }
        return newUser
    }

    static async fetchByPoints() {
        let results = await dbGetUserByPoints()
        let newUser = new User()
        let userList = []
        for(let i=0; i < Math.min(10, results.length); ++i){
            newUser = new User(results[i].profileusername, results[i].profileemail,
                results[i].profilepasswordhash, results[i].profilepoints, results[i].profiletotalpoints,
                results[i].profilename, results[i].profilesurname);
            userList.push(newUser)
        }
        return userList
    }

    /*//dohvat korisnika na osnovu id korisnika (tablica users)
    static async fetchByUserId(id) {

        let results = await dbGetUserById(id)
        let newUser = new User()

        if( results.length > 0 ) {
            newUser = new User(results[0].user_name, results[0].first_name,
                results[0].last_name, results[0].email, results[0].password, results[0].role)
            newUser.id = results[0].id
        }
        return newUser
    }*/

    //da li je korisnik pohranjen u bazu podataka?
    isPersisted() {
        return this.id !== undefined
    }

    //provjera zaporke
    checkPassword(password) {
        return this.password ? this.password === password : false
    }

    //pohrana korisnika u bazu podataka
    async persist() {
        try {
            let userID = await dbNewUser(this)
            this.id = userID
        } catch(err) {
            console.log("ERROR persisting user data: " + JSON.stringify(this))
            throw err
        }
    }

}

//dohvat korisnika iz baze podataka na osnovu korisničkog imena (stupac user_name)
dbGetUserByName = async (user_name) => {
    const sql = `SELECT profileUsername, profilePasswordHash, profilePoints, profileEmail, profileTotalPoints, profileToken, profileName, profileSurname
    FROM profile WHERE profileUsername = '` + user_name + `'`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbGetUserByPoints = async () => {
    const sql = `SELECT profileUsername, profilePasswordHash, profilePoints, profileEmail, profileTotalPoints, profileToken, profileName, profileSurname
    FROM profile ORDER BY profileTotalPoints desc`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbGetAllReports = async () => {
    const sql = `SELECT * FROM trashReport`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

//dohvat korisnika iz baze podataka na osnovu email adrese (stupac email)
dbGetUserByEmail = async (user_email) => {
    const sql = `SELECT profileUsername, profilePasswordHash, profilePoints, profileEmail, profileTotalPoints, profileToken, profileName, profileSurname
    FROM profile WHERE profileEmail = '` + user_email + `'`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};
/*
//dohvat korisnika iz baze podataka na osnovu id korisnika (stupac id)
dbGetUserById = async (user_id) => {
    const sql = `SELECT id, user_name, first_name, last_name, email, password, role
    FROM users WHERE id = ` + user_id;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}*/
/*
//umetanje zapisa o korisniku u bazu podataka
dbNewUser = async (user) => {
    const sql = "INSERT INTO users (user_name, first_name, last_name, email, password, role) VALUES ('" +
        user.user_name + "', '" + user.first_name + "', '" + user.last_name + "', '" +
        user.email + "', '" + user.password + "', '" + user.role + "') RETURNING id";
    try {
        const result = await db.query(sql, []);
        return result.rows[0].id;
    } catch (err) {
        console.log(err);
        throw err
    }
}*/
