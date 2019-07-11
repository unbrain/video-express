var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile('index.html');
});

router.get('/206', function (req, res, next) {
  var path = '1.mp4';
  var stat = fs.statSync(path);
  console.log(req.headers);

  var total = stat.size;
  if (req.headers['range']) {
    console.log('fine');
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total - 1;
    var chunksize = (end - start) + 1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {
      start: start,
      end: end
    });
    res.writeHead(206, {
      "Connection": "keep-alive",
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4;charset=utf-8',
      // 'Content-Disposition': "attachment;filename=p.mp4"
    });
    file.pipe(res);
  }else{
    res.sendfile('index.html');
  }
})

router.get('/200', function (req, res, next) {
  var path = '1.mp4';
  var stat = fs.statSync(path);
  console.log(req.headers);

  var total = stat.size;
  if (req.headers['range']) {
    console.log('fine');
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total - 1;
    var chunksize = (end - start) + 1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {
      start: start,
      end: end
    });
    res.writeHead(200, {
      "Connection": "keep-alive",
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4;charset=utf-8',
      // 'Content-Disposition': "attachment;filename=p.mp4"
    });
    file.pipe(res);
  }else{
    res.sendfile('index.html');
  }
})
module.exports = router;