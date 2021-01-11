var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mime = require('mime');
const { PythonShell } = require("python-shell");
var getDownloadFilename = require('./lib/Filename').getDownloadFilename;
router.post('/DownloadFile_1', function(req, res, next) {
    //var upload_folder = 'C:/test/';
    var file = './downloads/fjbox_growth_manual.pdf';
    try {

        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
            var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
            console.log('3');
            console.log('filename: ' + filename);
            console.log('mimetype: ' + mimetype);
            console.log('req: ' + req);
            res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req, filename)); // 다운받아질 파일명 설정
            res.setHeader('Content-type', mimetype); // 파일 형식 지정
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            res.send('해당 파일이 없습니다.');
            return;
        }
    } catch (e) { // 에러 발생시
        console.log(e);
        res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
        return;
    }
});
router.post('/DownloadFile_2', function(req, res, next) {
    //var upload_folder = 'C:/test/';
    var file = './downloads/fjbox_ui_manual.pdf';
    console.log('11');
    try {
        console.log('22' + file);
        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
            var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
            console.log('33');
            console.log('filename: ' + filename);
            console.log('mimetype: ' + mimetype);
            console.log('req: ' + req);
            res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req, filename)); // 다운받아질 파일명 설정
            res.setHeader('Content-type', mimetype); // 파일 형식 지정
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            console.log('44');
            res.send('해당 파일이 없습니다.');
            return;
        }
    } catch (e) { // 에러 발생시
        console.log('55');
        console.log(e);
        res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
        return;
    }
});
////////////////////////////////////////////////////
router.post('/DownloadFile_3', function(req, res, next) {
    //var upload_folder = 'C:/test/';
    var file = './downloads/fjbox_nutrient_manual.pdf';
    console.log('11');
    try {
        console.log('22' + file);
        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
            var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
            console.log('33');
            console.log('filename: ' + filename);
            console.log('mimetype: ' + mimetype);
            console.log('req: ' + req);
            res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req, filename)); // 다운받아질 파일명 설정
            res.setHeader('Content-type', mimetype); // 파일 형식 지정
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            console.log('44');
            res.send('해당 파일이 없습니다.');
            return;
        }
    } catch (e) { // 에러 발생시
        console.log('55');
        console.log(e);
        res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
        return;
    }
});
/////////////////////////////////////////////////
////////////////////////////////////////////////////
router.post('/DownloadFile_4', function(req, res, next) {
    //var upload_folder = 'C:/test/';
    var file = './downloads/fjbox_device_manual.pdf';
    console.log('11');
    try {
        console.log('22' + file);
        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
            var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
            console.log('33');
            console.log('filename: ' + filename);
            console.log('mimetype: ' + mimetype);
            console.log('req: ' + req);
            res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req, filename)); // 다운받아질 파일명 설정
            res.setHeader('Content-type', mimetype); // 파일 형식 지정
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            console.log('44');
            res.send('해당 파일이 없습니다.');
            return;
        }
    } catch (e) { // 에러 발생시
        console.log('55');
        console.log(e);
        res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
        return;
    }
});
/////////////////////////////////////////////////
router.post('/DownloadFile_5', function(req, res, next) {
    //var upload_folder = 'C:/test/';
    var file = './downloads/info_law.pdf';
    console.log('11');
    try {
        console.log('22' + file);
        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
            var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
            console.log('33');
            console.log('filename: ' + filename);
            console.log('mimetype: ' + mimetype);
            console.log('req: ' + req);
            res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req, filename)); // 다운받아질 파일명 설정
            res.setHeader('Content-type', mimetype); // 파일 형식 지정
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            console.log('44');
            res.send('해당 파일이 없습니다.');
            return;
        }
    } catch (e) { // 에러 발생시
        console.log('55');
        console.log(e);
        res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
        return;
    }
});
///////////////////////////////////////////////////
router.post('/DownloadFile_6', function(req, res, next) {
    //var upload_folder = 'C:/test/';
    var file = './downloads/homepage_law.pdf';
    console.log('11');
    try {
        console.log('22' + file);
        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
            var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
            console.log('33');
            console.log('filename: ' + filename);
            console.log('mimetype: ' + mimetype);
            console.log('req: ' + req);
            res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req, filename)); // 다운받아질 파일명 설정
            res.setHeader('Content-type', mimetype); // 파일 형식 지정
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            console.log('44');
            res.send('해당 파일이 없습니다.');
            return;
        }
    } catch (e) { // 에러 발생시
        console.log('55');
        console.log(e);
        res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
        return;
    }
});
/////////////////////////////////////////////////
router.post('/nutrient_target', async function(req, res) {
        try {
            var target_ec = Number(req.body.ec);
            var target_k = Number(req.body.k);
            var target_ca = Number(req.body.ca);
            var target_mg = req.body.mg;
            var target_no3 = Number(req.body.no3);
            var target_h2po4 = Number(req.body.h2po4);
            var target_so4 = req.body.so4;
            console.log(target_k + "KKK")
            console.log(target_ca + "CACAA")
            console.log(target_mg + "MGMGMG")
            var options = {
                scriptPath: "./",
                pythonPath: 'python',
                args: [target_ec, target_k, target_ca, target_mg, target_no3, target_h2po4, target_so4]
            };
            PythonShell.run("nutrient.py", options, function(err, data) {
                if (err) throw err;
                console.log("thisisresponse")
                console.log(data);
                for (var i = 0; i < 5; i++) {
                    console.log(data[i]);
                }
                res.send({ value: data })
            });


        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    ///////////////////////////////
module.exports = router;