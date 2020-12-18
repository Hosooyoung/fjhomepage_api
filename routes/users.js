var express = require('express');
var router = express.Router();
var request = require('request');
const bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'vue_project'
});
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/////////create account in DB//////
router.post('/createAcc', function(req, res) {
    console.log('userB');
    const user = {
        'userid': req.body.user.userid,
        'name': req.body.user.name,
        'password': req.body.user.password,
        'phone': req.body.user.phone,
        'email': req.body.user.email,
        'group': req.body.user.group,
        'device': req.body.user.dev
    };
    connection.query('SELECT id FROM users WHERE id = "' + user.userid + '"', function(err, row) {
        if (row[0] == undefined) { //  동일한 아이디 없ㅇㅁ
            const salt = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(user.password, salt);
            connection.query('INSERT INTO users (id,user_name,user_password,phone,email,user_auth,user_group,user_device) VALUES ("' + user.userid + '","' + user.name + '","' + encryptedPassword + '","' + user.phone + '","' + user.email + '",4,"' + user.group + '","' + user.device + '")', user, function(err, row2) {
                if (err) throw err;
            });
            res.json({
                createsuccess: true,
                message: '가입성공'
            })
        } else {
            res.json({
                createsuccess: false,
                message: '아이디중복'
            })
        }
    });

});
///////////login account check//////////////////////s
router.post('/logincheck', function(req, res) {
    const user = {
        'userid': req.body.user.userid,
        'password': req.body.user.password
    };
    console.log("id" + user.userid);
    console.log("pW" + user.password);
    connection.query('SELECT id, user_password, user_name,user_auth FROM users WHERE id = "' + user.userid + '"', function(err, row) {
        if (err) throw err;
        if (row[0] == undefined) {
            res.json({ // 아이디 없음
                success: false,
                message: '아이디를확인하세요'
            })
        }
        if (row[0] !== undefined && row[0].id === user.userid) {
            bcrypt.compare(user.password, row[0].user_password, function(err, res2) {
                console.log("succees");
                console.log("id!" + user.userid);
                console.log("pW!" + user.password);
                if (res2) {
                    console.log("auth!" + row[0].user_auth);
                    console.log("succees2");
                    res.json({ // 로그인 성공
                        auth: row[0].user_auth,
                        success: true,
                        message: 'Login successful!'
                    })
                    connection.query('UPDATE users SET last_login=now() where id=?', [user.userid], function(err, row) {
                        if (err) throw err;
                    })
                } else {
                    res.json({
                        success: false,
                        message: '비밀번호를 확인하세요'
                    })
                }
            })
        }
    })

});
///////////////////////////////////////////////////////
router.post('/check_user_info', function(req, res) {
    var id = req.body.id;
    sql = " select *from users where id=? ";
    connection.query(sql, id, (err, data) => {
        if (err) throw err;
        res.send({ success: true, data: data });
    })
});
////////////////////////////
router.post('/modAcc', function(req, res) {
    const user = {
        'userid': req.body.user.userid,
        'name': req.body.user.name,
        'password': req.body.user.password,
        'phone': req.body.user.phone,
        'email': req.body.user.email,
        'group': req.body.user.group,
        'device': req.body.user.dev,
        'law_check': req.body.user.law_check,
        'before_mod': req.body.before_mod_id,
        'same': req.body.user.same
    };
    sql = " select *from users where id=? ";
    connection.query(sql, user.userid, (err, data) => {
        var next = 0;
        if (err) throw err;
        if (data[0] != undefined && user.same == false) {
            next++;
            console.log('ne' + next);
            res.send({ success: false, message: '수정실패:중복되는 ID가 존재합니다.' });
        }
        console.log(user.same);
        console.log(next);
        if (next == 0 && user.same == true) {
            const salt = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(user.password, salt);
            connection.query('update users set user_name=?,phone=?,email=?,user_password=?,user_group=?,user_device=? where id=?', [user.name, user.phone, user.email, encryptedPassword, user.group, user.device, user.before_mod], function(err, row2) {
                if (err) throw err;
                res.send({ success: true, message: '수정성공' });
            });
        } else if (next == 0 && user.same == false) {
            const salt = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(user.password, salt);
            connection.query('update users set id= ?,user_name=?,phone=?,email=?,user_password=?,user_group=?,user_device=? where id=?', [user.userid, user.name, user.phone, user.email, encryptedPassword, user.group, user.device, user.before_mod], function(err, row2) {
                if (err) throw err;
                res.send({ success: true, message: '수정성공', id: user.userid });
            });
        }
    });
    //}
});
router.post('/check_pass', function(req, res) {
    var id = req.body.id;
    var password = req.body.password;
    console.log(id);
    console.log(password);
    connection.query('SELECT id, user_password FROM users WHERE id = "' + id + '"', function(err, row) {
        if (err) throw err;
        if (row[0] == undefined) {
            res.json({ // 아이디 없음
                success: false,
                message: '아이디를확인하세요'
            })
        }
        if (row[0] !== undefined && row[0].id === id) {
            bcrypt.compare(password, row[0].user_password, function(err, res2) {
                if (res2) {
                    res.json({
                        success: true
                    })
                } else {
                    res.json({
                        success: false,
                        message: '비밀번호를 확인하세요'
                    })
                }
            })
        }
    })
});
//////////////////
router.post('/delAcc', function(req, res) {
    const userid = req.body.id;
    console.log(userid);
    connection.query('UPDATE users SET user_auth=3 , last_login=now() where id=?', [userid], function(err, res2) {
        if (err) throw err;
        if (res2) {
            res.json({
                success: true,
                message: '탈퇴성공'
            })
        } else {
            res.json({
                success: false
            })
        }
    });

});
/////////////s
router.get('/getList', function(req, res, next) {
    let ipp = 10;
    let totalCount = 0;
    let block = 10;
    let total_page = 0;
    let page = 1;
    let start = 0;
    let end = ipp;
    let start_page = 1;
    let end_page = block;
    let where = "";
    body = req.query;
    sql = ` SELECT  count(*) cnt FROM users `;
    connection.query(sql, (err, data) => {
        if (err) throw err;
        totalCount = data[0].cnt;
        total_page = Math.ceil(totalCount / ipp);
        if (body.page) page = body.page;
        start = (page - 1) * 10;
        start_page = Math.ceil(page / block);
        end_page = start_page * block;
        if (total_page < end_page) end_page = total_page;
        let paging = {
            "totalCount": totalCount,
            "total_page": total_page,
            "page": page,
            "start_page": start_page,
            "end_page": end_page,
            "ipp": ipp
        }
        sql = ` SELECT * FROM users where user_auth!=3 LIMIT ?, ? `; //페이지수 계산 후 수만큼 조회
        connection.query(sql, [start, end], (err, list) => {
            if (err) throw err;
            for (i in list) {
                if (list[i].user_device == null) {
                    list[i].user_device = "등록장비없음";
                }

            }
            res.send({ success: true, list: list, paging: paging });
        })
    })
});
//////////////////////////////////////////////////////////
router.get('/getJoinList', function(req, res, next) {
    let ipp = 10;
    let totalCount = 0;
    let block = 10;
    let total_page = 0;
    let page = 1;
    let start = 0;
    let end = ipp;
    let start_page = 1;
    let end_page = block;
    let where = "";
    body = req.query;
    sql = ` SELECT  count(*) cnt FROM users where user_auth=4`;
    connection.query(sql, (err, data) => {
        if (err) throw err;
        totalCount = data[0].cnt;
        total_page = Math.ceil(totalCount / ipp);
        if (body.page) page = body.page;
        start = (page - 1) * 10;
        start_page = Math.ceil(page / block);
        end_page = start_page * block;
        if (total_page < end_page) end_page = total_page;
        let join_paging = {
            "totalCount": totalCount,
            "total_page": total_page,
            "page": page,
            "start_page": start_page,
            "end_page": end_page,
            "ipp": ipp
        }
        sql = ` SELECT * FROM users where user_auth=4 LIMIT ?, ?`; //페이지수 계산 후 수만큼 조회
        connection.query(sql, [start, end], (err, list) => {
            if (err) throw err;
            res.send({ success: true, join_list: list, join_paging: join_paging });
        })
    })
});
/////////////////////////////////////////////////////
router.get('/check_auth_admin', function(req, res, next) {
    var body = req.query;
    console.log(req.query);
    console.log(req.query.id);
    console.log(body);
    console.log(body.id);

    sql = 'select user_auth from users where id=?';
    connection.query(sql, body.id, (err, data) => {
        if (err) throw err;
        if (data[0].user_auth == 1) {
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    })
});
router.post('/check_auth_all', function(req, res) {
    try {
        sql = " select user_auth from users where id=? ";
        if (req.body.id == null) {
            req.body.id = '';
        }
        connection.query(sql, req.body.id, (err, data) => {
            if (err) throw err;
            if (data[0].user_auth == 1 || data[0].user_auth == 0) {
                res.send({ success: true });
            } else if (data[0].user_auth == 2) {
                res.send({ success: false, message: "휴면계정입니다.관리자에게 문의하세요." });
            } else if (data[0].user_auth == 4) {
                res.send({ success: false, message: "가입승인이 필요합니다.관리자에게 문의하세요." });
            } else {
                res.send({ success: false, message: "계정을 확인하세요." });
            }

        })
    } catch (err) {
        console.log(err);
    }
});
////////////////////////////////////////////
router.post('/check_auth_info_reply', function(req, res) {
    var body = req.body;
    body.seq = Number(body.seq);
    sql = " select * from notice_reply where group_order=? and orders=? ";
    connection.query(sql, [body.seq, body.orders], (err, data) => {
        console.log(body.id);
        console.log(data[0].user_id);
        if (err) throw err;
        if (data[0].user_id == body.id) {
            res.send({ success: true });
        } else if (body.auth == "admin") {
            res.send({ success: true });
        } else {
            res.send({ success: false, message: "권한이 없습니다.." });
        }

    })
});
/////////////////////////////////////////////////
router.post('/check_auth_board', function(req, res) {
        var body = req.body;
        console.log("zqweqweqwe" + body.purpose)
        console.log("zqweqweqwe" + body.id)
        if (body.purpose == "board") {
            sql = " select user_id from board where seq=? ";
            connection.query(sql, body.seq, (err, data) => {
                if (err)
                    console.log(err);
                if (data[0].user_id == body.id) {
                    res.send({ success: true });
                } else if (body.auth == "admin") {
                    res.send({ success: true });
                } else {
                    res.send({ success: false, message: "권한이 없습니다.." });
                }

            })
        } else if (body.purpose == "reply") {
            sql = " select user_id from board_reply where group_order=? and orders=? ";
            connection.query(sql, [body.seq, body.orders], (err, data) => {
                if (err)
                    console.log(err);
                if (data[0].user_id == null) {
                    res.send({ success: false, message: "권한이 없습니다." });
                } else if (data[0].user_id == body.id) {
                    res.send({ success: true });
                } else if (body.auth == "admin") {
                    res.send({ success: true });
                } else {
                    res.send({ success: false, message: "권한이 없습니다.." });
                }

            })
        }
    })
    ////////////////////////////////////////////////////
router.post('/Getjoin', function(req, res) {
    var body = req.body;
    if (body.ok == "join") {
        sql = " UPDATE users SET user_auth = 0 where id=? ";
        connection.query(sql, [req.body.id], (err, data) => {
            console.log(body.id);
            if (err) throw err;
            res.send({ success: true });
        })
    } else if (body.ok == "reject") {
        sql = " delete from users where id=? ";
        connection.query(sql, [req.body.id], (err, data) => {
            console.log(body.id);
            if (err) throw err;
            res.send({ success: false });
        })
    }
});
//////////////////////////////////////////////////
router.get('/getSearchList:search', function(req, res, next) {
    let search = req.params.search;
    let ipp = 10;
    let totalCount = 0;
    let block = 10;
    let total_page = 0;
    let page = 1;
    let start = 0;
    let end = ipp;
    let start_page = 1;
    let end_page = block;
    let where = "";
    console.log(search);
    body = req.query;
    if (body.option == "아이디")
        option = "id";
    if (body.option == "이름")
        option = "user_name";
    if (body.option == "소속")
        option = "user_group";
    if (body.option == "연락처")
        option = "phone";
    if (body.option == "이메일")
        option = "email";
    if (body.option == "장비")
        option = "user_device";
    console.log(search)
    sql = "SELECT  count(*) cnt FROM users WHERE " + option + " LIKE '%" + search + "%' and user_auth!=3";
    connection.query(sql, (err, data) => {
        if (err) throw err;
        if (data[0].cnt == 0) {
            res.send({ success: false });
        } else {
            totalCount = data[0].cnt;
            total_page = Math.ceil(totalCount / ipp);
            if (body.page) page = body.page;
            start = (page - 1) * 10;
            start_page = Math.ceil(page / block);
            end_page = start_page * block;
            if (total_page < end_page) end_page = total_page;
            let paging = {
                "totalCount": totalCount,
                "total_page": total_page,
                "page": page,
                "start_page": start_page,
                "end_page": end_page,
                "ipp": ipp
            }
            sql = " SELECT * FROM users WHERE " + option + " LIKE '%" + search + "%'  LIMIT ?, ? ";
            connection.query(sql, [start, end], (err, list) => {
                if (err) throw err;
                console.log('!@#@!#!@#');

                res.send({ success: true, list: list, paging: paging });
            })
        }
    })
});
/////////////////////////////////////////////////
router.get('/getSearchJoinList:search', function(req, res, next) {
    let search = req.params.search;
    let ipp = 10;
    let totalCount = 0;
    let block = 10;
    let total_page = 0;
    let page = 1;
    let start = 0;
    let end = ipp;
    let start_page = 1;
    let end_page = block;
    let where = "";
    console.log(search);
    body = req.query;
    if (body.option == "아이디")
        option = "id";
    if (body.option == "이름")
        option = "user_name";
    if (body.option == "소속")
        option = "user_group";
    if (body.option == "연락처")
        option = "phone";
    if (body.option == "이메일")
        option = "email";
    if (body.option == "장비")
        option = "user_device";
    console.log(search)
    sql = "SELECT  count(*) cnt FROM users WHERE " + option + " LIKE '%" + search + "%' and user_auth=4";
    connection.query(sql, (err, data) => {
        if (err) throw err;
        if (data[0].cnt == 0) {
            res.send({ success: false });
        } else {
            totalCount = data[0].cnt;
            total_page = Math.ceil(totalCount / ipp);
            if (body.page) page = body.page;
            start = (page - 1) * 10;
            start_page = Math.ceil(page / block);
            end_page = start_page * block;
            if (total_page < end_page) end_page = total_page;
            let join_paging = {
                "totalCount": totalCount,
                "total_page": total_page,
                "page": page,
                "start_page": start_page,
                "end_page": end_page,
                "ipp": ipp
            }
            sql = " SELECT * FROM users WHERE " + option + " LIKE '%" + search + "%' and user_auth=4 LIMIT ?, ? ";
            connection.query(sql, [start, end], (err, list) => {
                if (err) throw err;

                res.send({ success: true, join_list: list, join_paging: join_paging });
            })
        }
    })
});
//////////////////////////////////////////////////
router.post('/farmos_access', function(req, res) {
    console.log(req.body.id);
    console.log(req.body.pw);

});
////////////////////////////////////////////////////
router.post('/reset_pw', function(req, res) {
    var body = req.body;
    var password = "fjbox1234"
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    sql = " UPDATE users SET user_password=? where id=? ";
    connection.query(sql, [encryptedPassword, req.body.id], (err, data) => {
        console.log(body.id);
        if (err) throw err;
        res.send({ success: true, message: "초기화완료" });
    })

});
module.exports = router;