var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const path = require("path");
var fs = require('fs');
const mime = require("mime-types")
const multer = require('multer');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'farmosv2@',
    database: 'fjbox_homepage'
});
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "uploads/")
    },
    filename: function(req, file, callback) {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        console.log("파패" + basename);
        var file_path = basename + "-" + Date.now() + extension;
        console.log("파패" + file_path);
        callback(null, file_path);
    }
});
let upload = multer({
    storage: storage

})

function getExtensionOfFilename(filename) {

    var _fileLen = filename.length;

    var _lastDot = filename.lastIndexOf('.');
    var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();

    return _fileExt;
}
//////////////////////수정,삭제시 글번호 정렬///////////////////
function modifySeq() {
    sql = 'alter table board auto_increment=1';
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
    })
    sql = 'set @count=0';
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
    })
    sql = 'update board set seq = @count:=@count+1';
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
    })

};
//////////////////////수정,삭제시 글번호 조정///////////////////
var getSeq = function() {
    sql = ` SELECT  count(*) cnt FROM board `;
    connection.query(sql, (err, data) => {
        count = data[0].cnt + 1;
        if (err) {
            throw err;
        }
        return count;
    })
};
//////////////////////////////////////////////////////
///////////////////////List 불러오기//////////////////
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
    sql = ` SELECT  count(*) cnt FROM board `;
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
        sql = ` SELECT * FROM board order by seq desc  LIMIT ?, ? `; //페이지수 계산 후 수만큼 조회
        connection.query(sql, [start, end], (err, list) => {
            if (err) throw err;
            for (i in list) {
                list[i].title = "[ " + list[i].category_option + " ] " + list[i].title;
            }
            res.send({ success: true, list: list, paging: paging });
        })
    })
});
//////////////////////////////////////////////////////////////////////////////
///////////////////////글등록/////////////////////////////////////////////////
router.post('/addBoard', function(req, res, next) {
    if (req.body.file_name == '') {
        file_name = null
    } else {
        file_name = req.body.file_name;
    }
    //var body = req.body //전송된 데이터를 받는다.

    sql = " INSERT INTO board (title, contents,hit,user_id,category_option,file_path) values (?, ?, ? ,?,? ,?) ";
    connection.query(sql, [req.body.title, req.body.contents, 0, req.body.id, req.body.option, file_name], (err, result) => {
        if (err) throw err;
        modifySeq();
        res.send({ success: true });
    })
});

///////////////게시판 글 상세보기/////////////////////////////////////////////
router.get('/boardread/:seq', function(req, res, next) {
    body = req.query;
    seq = req.params.seq;
    sql = " SELECT * FROM board WHERE seq = ? ";

    connection.query(sql, [seq], (err, data) => {
        if (err) throw err;
        sql = " UPDATE board set hit=hit+1 where seq=? ";
        connection.query(sql, [seq], (err, result) => {})
        res.send({ success: true, data: data });
    })
});


///////////////게시판 글 수정/////////////////////////////////////////////
router.post('/modboard', function(req, res, next) {
    body = req.body; //post
    sql = " UPDATE board SET title = ?, contents = ?,category_option=?, rewrite_date= now() WHERE seq = ? ";
    connection.query(sql, [body.title, body.contents, body.option, body.seq], (err, result) => {
        if (err) throw err;
        res.send({ success: true });
    })
});

///////////////게시판 글 삭제/////////////////////////////////////////////
router.post('/DelBoard', function(req, res, next) {
    seq = req.body.seq; //post
    sql = " delete from board WHERE seq = ? ";
    connection.query(sql, [body.seq], (err, result) => {
        if (err) throw err;
        sql = " delete from board_reply WHERE group_order = ? ";
        connection.query(sql, [body.seq], (err, result) => {
            if (err) throw err;
            sql = "update board_reply set group_order=group_order-1 where group_order>?";
            connection.query(sql, [body.seq], (err, result) => {
                if (err) throw err;
            })
            modifySeq();
            res.send({ success: true });
        })
    })

});
/*계층형
router.post('/DelBoard', function(req, res, next) {
    body = req.body;
    orders = Number(body.orders);
    seq = Number(body.seq);
    group_order = Number(body.group_order);
    console.log('t.t');
    if (orders == 1) {
        console.log('t.t?');
        sql = " delete from board WHERE group_order = ?";
        connection.query(sql, [seq], (err, result) => {
            if (err) throw err;
            sql = "update board set group_order=group_order-1 where group_order >?";;
            connection.query(sql, [group_order], (err, result) => {
                if (err) throw err;
            })
            modifySeq();
            res.send({ success: true });
        })

    } else if (orders > 1) {
        console.log('t.t??');
        sql = " delete from board WHERE seq = ? ";
        connection.query(sql, [seq], (err, result) => {
            sql = "update board set orders=orders-1 where group_order= ? and orders>?";;
            connection.query(sql, [group_order, orders], (err, result) => {
                if (err) throw err;
            })
            if (err) throw err;
            modifySeq();

            res.send({ success: true });
        })
    }
});*/
///////////////댓글등록/////////////////////////////////////////////
router.post('/addReply', function(req, res, next) {
    var count;
    body = req.body; //전송된 데이터를 받는다.
    seq = Number(body.seq);
    sql = ` SELECT  count(*) cnt FROM board_reply where group_order=? `;
    connection.query(sql, [seq], (err, data) => {
        count = data[0].cnt + 1;
        console.log("OK");
        if (err) {
            throw err;
        }
        sql = ` INSERT INTO board_reply (user_id, contents,group_order,orders) values (?, ?, ? ,?) `;
        connection.query(sql, [body.id, body.contents, seq, count], (err, result) => {
            if (err) throw err;
            res.send({ success: true });
        })

    })
});
/*계층형 
router.post('/addReply', function(req, res, next) {
    console.log(req.body);
    body = req.body; //전송된 데이터를 받는다.
    depth = Number(body.depth);
    depth = depth + 1;
    orders = Number(body.orders);
    //orders = orders + 1;
    group_order = Number(body.group_order);

    for (i = 1; i < depth; i++) {
        body.title = '[ RE ] ' + body.title;
    }
    console.log(body.title);
    sql = "update board set orders=orders + 1 where group_order = ? AND orders > ?";
    connection.query(sql, [group_order, orders], (err, result) => {
        orders = orders + 1;
        sql = " INSERT INTO board (user_id,title, contents,hit,depth,orders,group_order) values (?,?,?,0,?,?, ?) ";
        connection.query(sql, [body.id, body.title, body.contents, depth, orders, group_order], (err, result) => {


            modifySeq();
            if (err) throw err;

        })
        res.send({ success: true });
    })

});*/
///////////////////////댓글목록/////////////////////////////////////////////
router.get('/getReply', function(req, res, next) {
    //console.log('getlist');
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
    console.log('body' + body.seq);
    console.log('body' + body.page);
    sql = ` SELECT  count(*) cnt FROM board_reply where group_order= ?`;
    connection.query(sql, [body.seq], (err, data) => {
        // console.log('cnt:' + data[0].cnt);
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
        sql = ` SELECT * FROM board_reply where group_order=? order by orders asc  LIMIT ?, ? `;
        connection.query(sql, [body.seq, start, end], (err, list) => {
            if (err) throw err;
            res.send({ success: true, list: list, paging: paging });
        })
    })
});
///////////////////////댓글삭제
router.post('/DelReply', function(req, res, next) {
    body = req.body; //post
    sql = " delete from board_reply WHERE group_order =? and orders =?";
    connection.query(sql, [body.seq, body.orders], (err, result) => {
        if (err) throw err;
        sql = "update board_reply set orders=orders-1 where group_order =? and orders>?";
        connection.query(sql, [body.seq, body.orders], (err, result) => {
            if (err) throw err;
        })
        res.send({ success: true });
    })

});


///////////////////////댓글수정
router.post('/ModReply', function(req, res, next) {
    body = req.body; //post
    console.log("바바" + req.body.orders);
    console.log("바바" + req.body.contents);
    console.log("바바ㅅ" + req.body.seq);
    body.seq = Number(body.seq);
    sql = " update board_reply set contents=? where group_order=? and orders=?";
    connection.query(sql, [body.contents, body.seq, body.orders], (err, result) => {
        if (err) throw err;
        res.send({ success: true });
    })

});
/////////////////////////
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
    if (body.option == "제목")
        option = "title";
    if (body.option == "내용")
        option = "contents";

    sql = "SELECT  count(*) cnt FROM board WHERE " + option + " LIKE '%" + search + "%'";
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
            sql = " SELECT * FROM board WHERE " + option + " LIKE '%" + search + "%' order by seq desc  LIMIT ?, ? "; //페이지수 계산 후 수만큼 조회
            connection.query(sql, [start, end], (err, list) => {
                if (err) throw err;
                console.log('!@#@!#!@#');
                res.send({ success: true, list: list, paging: paging });
            })
        }
    })
});
///////////////////////////
router.post('/addBoard_with_file', upload.single("file"), function(req, res, next) {
    let file = req.file
    console.log(file);
    let result = {
        originalName: file.originalname,
        size: file.size,
        filename: file.filename
    }
    let ext = path.extname(result.filename);
    var type = mime.contentType(ext)
    console.log("타타" + typeof type)
    res.send({ success: true, file_name: result.filename, mimetype: type });

});
////////////////////////////////////////////////////////////////

router.post('/searchFile', function(req, res, next) {
        var seq = Number(req.body.seq);
        console.log("서치파일" + seq)
        sql = "select file_path from board where seq=? ";
        connection.query(sql, seq, (err, result) => {
            if (err) throw err;
            console.log(result[0].file_path)
            if (result[0].file_path != null) {
                var file_type = getExtensionOfFilename(result[0].file_path)
                var filetitle = result[0].file_path.split('.').slice(0, -1).join('.')
                var show_name = filetitle.slice(0, -14) + file_type
            }
            var file_name = "./uploads/" + result[0].file_path;

            if (fs.existsSync(file_name)) {
                res.send({ success: true, name: result[0].file_path, title: show_name })
            } else {
                res.send({ sucess: false })
            };
        })
    })
    ////////////////////////////////////////////////////////////////
module.exports = router;