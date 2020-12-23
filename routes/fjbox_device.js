var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const sharedSecret = 'jinong.co.kr&opensource'
const mysql = require('mysql2/promise')
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'farmosv2@',
    database: 'fjbox_homepage',
    waitForConnections: true,
    connectionLimit: 10

});

function makeToken(obj, expires) {
    const token = jwt.sign(obj, sharedSecret, { expiresIn: expires })
    return token
}
/**
   로그남기기 함수
 */
async function logs(req, fname) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const content = { "functions": fname, "IP": ip, "req": req.body }
        const query = "insert into logs(logtime, content) values(now(), ?)"
        const [result] = await pool.query(query, [JSON.stringify(content)])
        if (result.affectedRows === 1) {
            return true
        } else {
            console.log("fail to add log. : " + JSON.stringify(content))
            return false
        }
    } catch (error) {
        console.log(error)
        console.log("error at adding log. : " + JSON.stringify(content))
        return false
    }
}
////////////////////////////////////
router.post('/addDevice', async function(req, res) {
        try {
            await logs(req, "add a device")
            let query = 'select * from user where serial = ?'
            const [result] = await pool.query(query, [req.body.serial])
            if (result.length > 0) {
                throw new Error("같은 serial이 존재 합니다")
            } else {
                query = 'insert into user (url, port, uuid, serial) values (?, ?, ?, ?)'
                const [insertResult] = await pool.query(query, [req.body.url, req.body.port, req.body.uuid, req.body.serial])

                if (insertResult.affectedRows === 1) {
                    res.status(200).end()
                } else {
                    throw new Error("장비 추가 실패 하였습니다")
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    //////////////////////////////
module.exports = router;