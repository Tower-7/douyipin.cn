const qiniu = require('qiniu');

let uploadFile = async (filePath) => {
    let accessKey = 'qLfJrb6VJXkM-E03Bt30OujoAj9yGwaFqRMgZMX9';
    let secretKey = 'XQhEYYYHr_bla4o8FEBgOUmjUTH0c3E6XU_xjwIB';
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    let options = {
        scope: 'tower',
        expires: 7200
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken= putPolicy.uploadToken(mac);
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z1;
    // 是否使用https域名
    //config.useHttpsDomain = true;
    // 上传是否使用cdn加速
    //config.useCdnDomain = true;
    let localFile = 'http://localhost:2000/53f9b128-85e1-4a37-9b98-dcc1855e34a6';
    console.log(filePath)
    let formUploader = new qiniu.form_up.FormUploader(config);
    let putExtra = new qiniu.form_up.PutExtra();
    let key=Date.now()+'test.jpg';
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
    respBody, respInfo) {
    if (respErr) {
        throw respErr;
    }
    if (respInfo.statusCode == 200) {
        console.log(respBody);
    } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
    }
    });
}

module.exports = {
    // 调用函数
    upload:async ctx =>{
        let filePath = ctx.request.body.filePath
        uploadFile(filePath)
    }
    
}
