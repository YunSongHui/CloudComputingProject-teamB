
const { format } = require('mysql2')
var mysql = require('mysql2/promise');
// DB 계정정보 파일
var db_conf = require('./db_conf')
var connection

async function init() {
    // create the connection
    connection = await mysql.createConnection(db_conf);
}

exports.getAll = async function getAll() {
    if (!connection) await init()

    try {
        var sql = await format('SELECT * FROM Recruitment_Info WHERE ISNULL(car)')
        console.log(sql)
        const result = await connection.execute(sql);
        return result[0]
    } catch (error) {
        console.log(error)
        return false
    }


}

exports.setTransferTime = async function setTransferTime(id, data) {
    if (!connection) await init()

    try {
        var sql = await format('UPDATE Recruitment_Info SET ? WHERE id = ?', [data, id])
        console.log(sql)
        const result = await connection.execute(sql);
        return result
    } catch (error) {
        console.log(error)
        return false
    }


}

exports.insertRecruitment = async function insertRecruitment(data) {
    if (!connection) await init()

    try {
        var sql = await format('INSERT INTO Recruitment_Info SET ?', data)
        console.log(sql)
        const result = await connection.execute(sql);
        return result
    } catch (error) {
        console.log(error)
        return false
    }

}

exports.insertJobplanet = async function insertJobplanet(data, company) {
    if (!connection) await init()

    try {
        var sql = await format(`UPDATE Recruitment_Info SET ? WHERE company = ?`, [data, company])
        // console.log(sql)
        const result = await connection.execute(sql);
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}

exports.insertJobkoreaSuccess = async function insertJobkoreaSuccess(data) {
    if (!connection) await init()

    try {
        var sql = await format('INSERT INTO SuccessSpec SET ?', data)
        console.log(sql)
        const result = await connection.execute(sql);
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}

exports.getJobkoreaSuccess = async function getJobkoreaSuccess(data) {
    if (!connection) await init()


    try {
        var sql = await format('SELECT * FROM SuccessSpec')
        console.log(sql)
        const result = await connection.execute(sql);
        return result[0]
    } catch (error) {
        console.log(error)
        return false
    }
}

init()