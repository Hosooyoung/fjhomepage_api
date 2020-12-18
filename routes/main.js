var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mime = require('mime');
var getDownloadFilename = require('./lib/Filename').getDownloadFilename;
router.post('/DownloadFile_1', function(req, res, next) {
    //var upload_folder = 'C:/test/';
    var file = './downloads/test12.xlsx';
    console.log('1');
    try {
        console.log('2');

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
    var file = 'C:/test/테스트2.pdf';
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
    var file = 'C:/test/테스트2.pdf';
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
router.post('/DownloadFile_4', function(req, res, next) {
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
router.post('/DownloadFile_5', function(req, res, next) {
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
module.exports = router;