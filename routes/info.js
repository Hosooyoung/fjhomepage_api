 var express = require('express');
 var router = express.Router();
 var fs = require('fs');
 const mysql = require('mysql')
 const path = require("path");
 const mime = require("mime-types")
 const multer = require('multer');
 const { stringify } = require('querystring');
 const { fips } = require('crypto');
 var connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'farmos',
     password: 'farmosv2@',
     database: 'fjbox_homepage'
 });

 let storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "uploads/")
     },
     filename: function(req, file, callback) {
         console.log(JSON, stringify(file));
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
     /*
     const storage = multer.diskStorage({
         destination(req, File, callback) {
             callback(null, '../public/uploads');
         },
         filename(req, File, callback) {
             let array = File.originalname.split('.');
             array[0] = array[0] + '_';
             array[1] = '.' + array[1];
             array.splice(1, 0, Date.now().toString());
             const result = array.join('');
             console.log(result);
             callback(null, result);
         }
     });

     const upload = multer({
         storage,
         limits: {
             files: 10,
             fileSize: 1024 * 1024 * 1024,
         }
     });*/
 function getExtensionOfFilename(filename) {

     var _fileLen = filename.length;

     var _lastDot = filename.lastIndexOf('.');
     var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();

     return _fileExt;
 }

 function modifySeq() {
     console.log('진입은합니다.');
     sql = 'alter table notice auto_increment=1';
     connection.query(sql, (err, result) => {
         console.log(sql);
         if (err) {
             throw err;
         } else {}
     })
     sql = 'set @count=0';
     connection.query(sql, (err, result) => {
         if (err) {

             console.log(err);
             throw err;
         } else {}
     })
     sql = 'update notice set seq = @count:=@count+1';
     connection.query(sql, (err, result) => {
         if (err) {
             throw err;
         } else {}
     })

 };
 router.get('/getList', function(req, res, next) {
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

     sql = ` SELECT  count(*) cnt FROM notice `;
     connection.query(sql, (err, data) => {
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
         sql = ` SELECT * FROM notice order by seq desc  LIMIT ?, ? `;
         connection.query(sql, [start, end], (err, list) => {
             if (err) throw err;
             console.log(typeof list);
             for (i in list) {
                 list[i].title = "[ " + list[i].category_option + " ] " + list[i].title;
             }
             res.send({ success: true, list: list, paging: paging });
         })
     })
 });

 router.post('/addNotice', function(req, res, next) {
     var file_name;
     console.log(req.body.mimetype + "맘타")
     if (req.body.file_name == '') {
         file_name = null
     } else {
         file_name = req.body.file_name;
     }
     //var body = req.body //전송된 데이터를 받는다.

     sql = " INSERT INTO notice (title, contents,hit,user_id,category_option,file_path) values (?, ?, ? ,?,? ,?) ";
     connection.query(sql, [req.body.title, req.body.contents, 0, req.body.id, req.body.option, file_name], (err, result) => {
         if (err) throw err;
         modifySeq();
         res.send({ success: true });
     })
 });
 router.get('/inforead/:seq', function(req, res, next) {
     body = req.query;
     seq = req.params.seq;
     sql = " SELECT * FROM notice WHERE seq = ? ";

     connection.query(sql, [seq], (err, data) => {
         if (err) throw err;
         sql = " UPDATE notice set hit=hit+1 where seq=? ";
         connection.query(sql, [seq], (err, result) => {})

         res.send({ success: true, data: data });
     })
 });

 router.post('/reNotice', function(req, res, next) {
     body = req.body; //post
     sql = " UPDATE notice SET title = ?, contents = ?, category_option=?, rewrite_date= now() WHERE seq = ? ";
     connection.query(sql, [body.title, body.contents, body.option, body.seq], (err, result) => {
         if (err) throw err;
         res.send({ success: true });
     })
 });

 router.post('/DelNoti', function(req, res, next) {
     seq = req.body.seq; //post
     sql = " delete from notice WHERE seq = ? ";
     connection.query(sql, [body.seq], (err, result) => {
         if (err) throw err;
         sql = " delete from notice_reply WHERE group_order = ? ";
         connection.query(sql, [body.seq], (err, result) => {
             if (err) throw err;
             sql = "update notice_reply set group_order=group_order-1 where group_order>?";
             connection.query(sql, [body.seq], (err, result) => {
                 if (err) throw err;
             })
             modifySeq();
             res.send({ success: true });
         })
     })

 });

 router.post('/addReply', function(req, res, next) {
     var count;
     body = req.body; //전송된 데이터를 받는다.
     seq = Number(body.seq);
     sql = ` SELECT  count(*) cnt FROM notice_reply where group_order=? `;
     connection.query(sql, [seq], (err, data) => {
         count = data[0].cnt + 1;
         console.log("OK");
         if (err) {
             throw err;
         }
         sql = ` INSERT INTO notice_reply (user_id, contents,group_order,orders) values (?, ?, ? ,?) `;
         connection.query(sql, [body.id, body.contents, seq, count], (err, result) => {
             if (err) throw err;
             res.send({ success: true });
         })

     })
 });
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
     sql = ` SELECT  count(*) cnt FROM notice_reply where group_order= ?`;
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
         sql = ` SELECT * FROM notice_reply where group_order=? order by orders asc  LIMIT ?, ? `;
         connection.query(sql, [body.seq, start, end], (err, list) => {
             if (err) throw err;
             console.log(list);
             res.send({ success: true, list: list, paging: paging });
         })
     })
 });

 router.post('/DelReply', function(req, res, next) {
     body = req.body; //post
     console.log("바바" + req.body.orders);
     console.log("바바ㅅ" + req.body.seq);
     sql = " delete from notice_reply WHERE group_order =? and orders =?";
     connection.query(sql, [body.seq, body.orders], (err, result) => {
         if (err) throw err;
         sql = "update notice_reply set orders=orders-1 where group_order =? and orders>?";
         connection.query(sql, [body.seq, body.orders], (err, result) => {
             if (err) throw err;
         })
         res.send({ success: true });
     })

 });

 router.post('/ModReply', function(req, res, next) {
     body = req.body; //post
     console.log("바바" + req.body.orders);
     console.log("바바" + req.body.contents);
     console.log("바바ㅅ" + req.body.seq);
     body.seq = Number(body.seq);
     sql = " update notice_reply set contents=? where group_order=? and orders=?";
     connection.query(sql, [body.contents, body.seq, body.orders], (err, result) => {
         if (err) throw err;
         res.send({ success: true });
     })

 });
 ////////////////////////////////////////////////////////////////////
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

     sql = "SELECT  count(*) cnt FROM notice WHERE " + option + " LIKE '%" + search + "%'";
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
             sql = " SELECT * FROM notice WHERE " + option + " LIKE '%" + search + "%' order by seq desc  LIMIT ?, ? "; //페이지수 계산 후 수만큼 조회
             connection.query(sql, [start, end], (err, list) => {
                 if (err) throw err;
                 console.log('!@#@!#!@#');
                 for (i in list) {
                     list[i].title = "[ " + list[i].category_option + " ] " + list[i].title;
                 }
                 res.send({ success: true, list: list, paging: paging });
             })
         }
     })
 });
 ///////////////////////////
 router.post('/addNoti_with_file', upload.single("file"), function(req, res, next) {
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
         sql = "select file_path from notice where seq=? ";
         connection.query(sql, seq, (err, result) => {
             if (err) throw err;
             console.log(result[0].file_path + '더하기')
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
 router.post('/DownloadFile', function(req, res) {
     var file;
     //     console.log(req.body.data)
     console.log(req.body.name + "일좀해시바라")
     var file_orgname;
     //var file = req.body.name;
     /*console.log("마마지막.." + seq)
     var file = "C:/workspace/hodu/vue_project2/svr/uploads/";
     file = String(file)
     console.log("파일" + file)
     sql = "select file_path from notice where seq=? ";
     connection.query(sql, seq, (err, result) => {
         if (err) throw err;
         console.log("나왜뺴" + result[0].file_path)
         file_path = String(result[0].file_path)
         file = file + file_path;
         file = String(file)
     });*/
     try {

         file = req.body.name;
         console.log(file + "ㅠㅠㅠㅠ");
         if (fs.existsSync(file)) { // 파일이 존재하는지 체크
             console.log("fileOK")
             var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
             console.log(filename)
             let ext = path.extname(filename);
             var mimetype = mime.contentType(ext)
                 //var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
             console.log('3');
             console.log('filename: ' + filename);
             console.log('mimetype: ' + mimetype);
             console.log('req: ' + req);
             //  res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req, filename)); // 다운받아질 파일명 설정
             res.setHeader("Content-Disposition", "filename=" + filename);
             res.setHeader('Content-type', mimetype); // 파일 형식 지정
             var filestream = fs.createReadStream(file);
             filestream.pipe(res);
         } else {
             res.send({ success: false, message: "" });
             return;
         }
     } catch (e) { // 에러 발생시
         console.log(e);
         res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
         return;
     }
 });
 module.exports = router;