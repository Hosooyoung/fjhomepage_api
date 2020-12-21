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
/////////////조사자 로그인 /////////////////////////////////////
router.post('/investigatorLogin', async function(req, res) {
    try {
        await logs(req, "investigatorLogin")
        const query = 'select * from user where uuid = ?'
        const [result] = await pool.query(query, [req.body.uuid])
        if (result.length > 0) {
            const item = {
                iss: result[0].serial,
                url: result[0].url,
                port: result[0].port,
                privilege: 'investigator'
            }
            const token = makeToken(item, '7 days')
            const refreshToken = makeToken(item, '30 days')
            res.json({
                url: result[0].url,
                port: result[0].port,
                token: token,
                refreshToken: refreshToken
            }).end()
        } else {
            res.status(401).send()
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});
//////////////////////////////////////////////////////////////////
router.post('/login', async function(req, res) {
        try {
            await logs(req, "login")
            const query = 'select * from user where id = ? and pw = password(?)'
            const [result] = await pool.query(query, [req.body.id, req.body.pw])
            if (result.length > 0) {
                const item = {
                    iss: result[0].serial,
                    url: result[0].url,
                    port: result[0].port,
                    privilege: 'admin'
                }
                const token = makeToken(item, '7 days')
                const refreshToken = makeToken(item, '30 days')
                res.json({
                    url: result[0].url,
                    token: token,
                    refreshToken: refreshToken
                }).end()
            } else {
                res.status(401).send()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    //////////////장비추가 //////////////////
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
    //////////////////사용자 입력////////////
router.put('/addDevice', async function(req, res) {
        try {
            await logs(req, "add a user")
            let query = 'select * from user where id = ?'
            const [result] = await pool.query(query, [req.body.id])
            if (result.length > 0) {
                throw new Error("같은 id가 존재 합니다")
            } else {
                query = 'update user set id = ?, pw = password(?) where serial = ?'
                const [updateResult] = await pool.query(query, [req.body.id, req.body.pw, req.body.serial])

                if (updateResult.affectedRows === 1) {
                    res.status(200).end()
                } else {
                    throw new Error("사용자 정보 입력 실패 하였습니다")
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    //////////////////비밀번호 확인//////////////////

router.post('/check_pw', async function(req, res) {
        try {
            const query = 'select * from user where id=? and pw = password(?)'
            const [result] = await pool.query(query, [req.body.id, req.body.pw])
            if (result.length > 0) {
                res.json({
                    success: true
                }).end()
            } else {
                res.status(401).send()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    ///////////////////비밀번호 변경///////////////////////////
router.post('/mod_pw', async function(req, res) {
        try {
            console.log(req.body.id);
            console.log(req.body.pw);
            const query = 'update user set pw=password(?) from user where id = ? and pw = password(?)'
            await pool.query(query, [req.body.id, req.body.pw])

            res.json({
                success: true
            }).end()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    ///////////////////////////////////////////
module.exports = router;