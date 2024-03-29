var http = require('http');
var https = require('https');
var url_module = require('url');
var M=require("../index")
function myAxios(axiosConfig) {
    axiosConfig.body=M.urlStringify(axiosConfig.data)
    axiosConfig.headers.host = "";
    var urlObj = url_module.parse(axiosConfig.url)
    var options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.path,
        method: axiosConfig.method.toLocaleUpperCase(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            ...axiosConfig.headers
        }
    }

    let reqHttp = http;
    if (axiosConfig.url.startsWith("https")) {
        reqHttp = https;
    }
    var html = '';
    return new Promise((resolve, reject) => {
        var req = reqHttp.request(options, function (res) {
            options = M.httpBefore(options);
            if (options == false) {
                return;
            }
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                html += chunk;
            });
            res.on('end', function () {
                resolve(JSON.parse(html));
            });

        });
        req.on('error', function (err) {
            console.error(err);
        });
        if(axiosConfig.body){
            req.write(axiosConfig.body);
        }
        req.end();
    })
}


const $1={}
$1.ajax= function (options){
    return {
        success(callback){
            myAxios(options).then(d=>{
                callback(d)
            })
            return {
                fail(callback){

                }
            }
        },

    }
}

'use strict';
/**
 * Created by andy on 14-12-25.
 */
/**
 *   APICloud-rest-SHA1.js ___start
 *  Secure Hash Algorithm (SHA1)
 *  http://www.webtoolkit.info/
 *
 **/

function SHA1(msg) {

    function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };

    function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;

        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str = "";
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };


    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;

        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;

        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) word_array.push(0);

    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);


    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();

}
var api={};
api.ajax=function(ajaxConfig,callback){
    $1.ajax(ajaxConfig).success(function (data, status, header) {
        callback(data,status)
    }).fail(function (header, status, errorThrown) {
        callback(data,errorThrown)
    })
}
'use strict';
function copy(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;

    var temp = obj.constructor();
    // changed

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = copy(obj[key]);
        }
    }
    return temp;
}

function isType(type) {
    return function (obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
    }
}

var isFunction = isType("Function");

function Resource(appId, appKey, baseurl) {
    var now = Date.now();
    this.appId = appId;
    this.baseurl = baseurl || "https://d.apicloud.com/mcm/api";
    this.appCode = SHA1(appId + "UZ" + appKey + "UZ" + now) + "." + now;
    this.defaultactions = {
        'get': { method: 'GET', params: ["_id", "_relation"] },
        'save': { method: 'POST', params: ["_id", "_relation"] },
        'query': { method: 'GET', params: ["filter"] },
        'delete': { method: 'DELETE', params: ["_id", "_relation"] },
        'login': { method: "POST", params: ["username", "password"] },
        'logout': { method: "POST" },
        'count': { method: "GET", params: ["_id", "_relation", "filter"] },
        'exists': { method: "GET", params: ["_id"] },
        'findOne': { method: 'GET', params: ["filter"] },
        'verify': { method: "POST", params: ["email", "language", "username"], alias: "verifyEmail" },
        'reset': { method: "POST", params: ["email", "language", "username"], alias: "resetRequest" },
        'sendvercode': { method: "POST" },
        'checkvercode': { method: "POST", params: ["mobile", "vercode"] },
        'resetByMobile': { method: "POST", params: ["mobile", "vercode", "username", "password"] },
    };
    this.headers = {};
    this.setHeaders("X-APICloud-AppId", this.appId);
    this.setHeaders("X-APICloud-AppKey", this.appCode);
    this.setHeaders("Content-Type", "application/json;");
}
Resource.prototype.setHeaders = function (key, value) {
    this.headers[key] = value;
}
Resource.prototype.batch = function (requests, callback) {
    for (var i = 0, len = requests.length; i < len; i++) {
        var request = requests[i];
        if (request["method"] && request["method"].toUpperCase() === "GET" && request["body"] && request["body"]["filter"]) {
            var url = request["path"];
            var index = url.indexOf('?');
            request["path"] = url.substring(0, index) + "?filter=" + JSON.stringify(request["body"]["filter"]);
            delete request["body"];
        }
    }
    var ajaxConfig = {
        url: this.baseurl + "/batch",
        method: "POST",
        data: {
            body: JSON.stringify({ requests: requests })
        }
    }
    ajaxConfig["headers"] = {};
    for (var header in this.headers) {
        ajaxConfig["headers"][header] = this.headers[header];
    }
    api.ajax(ajaxConfig, function (ret, err) {
        callback(ret, err)
    });
}
Resource.prototype.upload = function (modelName, isFilter, item, params, callback) {
    if (typeof params == "function") {
        callback = params;
        params = {};
    }
    var filepath = item.path;
    var values = item.values || {};
    var url = params["_id"] && params["_relation"] ? ("/" + modelName + "/" + params["_id"] + "/" + params["_relation"]) : "/file";
    var isPut = (!params["_relation"]) && params["_id"];
    var fileUrl = this.baseurl + url + (isPut ? ("/" + params["_id"]) : "");
    var filename = filepath.substr(filepath.lastIndexOf("/") + 1, filepath.length);
    if (!values["filename"]) values["filename"] = filename;
    var ajaxConfig = {
        url: fileUrl,
        method: isPut ? "PUT" : "POST",
        data: {
            values: values,
            files: {
                file: filepath
            }
        }
    }
    ajaxConfig["headers"] = {};
    for (var header in this.headers) {
        if (header == "Content-Type") continue;
        ajaxConfig["headers"][header] = this.headers[header];
    }
    api.ajax(ajaxConfig, function (ret, err) {
        if (ret && ret.id && !err) {
            var newobj = {};
            if (isFilter) {
                newobj["id"] = ret["id"];
                newobj["name"] = ret["name"];
                newobj["url"] = ret["url"];
                callback(null, newobj)
            } else {
                callback(null, ret);
            }
        } else {
            callback(ret || err, null)
        }
    });
}

Resource.prototype.Factory = function (modelName) {
    var self = this;
    var route = new Route(modelName, self.baseurl);
    var actions = copy(this.defaultactions);
    var resourceFactory = new Object();
    Object.keys(actions).forEach(function (name) {
        if (modelName != "user" && ["login", "logout", "verify", "reset", "sendvercode", "checkvercode", "resetByMobile"].indexOf(name) != -1) { return; }
        resourceFactory[name] = function (a1, a2, a3) {
            var action = copy(actions[name]);
            var params = {}, data, callback;
            var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);
            switch (arguments.length) {
                case 3:
                    params = a1;
                    data = a2;
                    callback = a3;
                    break;
                case 2:
                    if (hasBody)
                        data = a1;
                    else
                        params = a1;
                    callback = a2;
                    break;
                case 1:
                    if (isFunction(a1))
                        callback = a1;
                    else if (hasBody)
                        data = a1;
                    else
                        params = a1;
                    break;
                case 0:
                    break;
                default:
                    throw new Error("鍙傛暟鏈€澶氫负3涓�");
            }
            if (hasBody && name != "logout") {
                var fileCount = 0;
                Object.keys(data).forEach(function (key) {
                    var item = data[key];
                    if (item && item.isFile) {
                        var isFilter = true;
                        if (modelName == "file" || item.isFileClass) {
                            isFilter = false;
                        }
                        fileCount++;
                        self.upload(modelName, isFilter, item, (modelName == "file" ? params : {}), function (err, returnData) {
                            if (err) {
                                return callback(null, err);
                            } else {
                                if (!isFilter)
                                    return callback(returnData, null);
                                data[key] = returnData;
                                fileCount--;
                                if (fileCount == 0) {
                                    next();
                                }
                            }
                        })
                    }
                });
                if (fileCount == 0) {
                    next();
                }
            } else {
                next();
            }
            function next() {
                var httpConfig = {};
                httpConfig["headers"] = {};
                for (var header in self.headers) {
                    httpConfig["headers"][header] = self.headers[header];
                }
                if (name === "logout" && !httpConfig["headers"]["authorization"]) {
                    return callback({ status: 0, msg: "鏈缃產uthorization鍙傛暟,鏃犳硶娉ㄩ攢!" }, null);
                }
                if (hasBody) {
                    httpConfig.data = {
                        body: JSON.stringify(data)
                    };
                }

                if (params && (name == "save") && params["_id"] && (!params["_relation"]) && (!params["_relationid"])) {
                    action.method = "PUT";
                }
                if (params && (name == "save") && params["_id"] && params["_relation"] && params["_relationid"]) {
                    action.method = "PUT";
                }
                for (var key in action) {
                    if (key != 'params' && key != "alias") {
                        httpConfig[key] = copy(action[key]);
                    }
                }

                var curparams = {};
                action.params = action.params || [];
                for (var k = 0, len = action.params.length; k < len; k++) {
                    var tempkey = action.params[k];
                    if (params[tempkey]) {
                        curparams[tempkey] = copy(params[tempkey]);
                    }
                }
                if (["login", "logout", "count", "exists", "verify", "reset", "findOne", "sendvercode", "checkvercode", "resetByMobile"].indexOf(name) != -1) {
                    curparams["_custom"] = action.alias || name;
                }
                route.setUrlParams(httpConfig, curparams);
                httpConfig.cache = true;
                // console.log(httpConfig.method + "\t" + httpConfig.url);
                api.ajax(httpConfig, function (ret, err) {
                    return callback(ret, err);
                })
            }
        };
    });
    return resourceFactory;
};

function Route(template, baseurl) {
    this.template = template;
    this.baseurl = baseurl;
}

Route.prototype = {
    setUrlParams: function (config, params) {
        var url = "/:_class/:_id/:_relation/:_custom/:_relationid";
        url = url.replace(":_class", this.template);
        var parArr = [];
        Object.keys(params).forEach(function (ckey) {
            if (ckey.charAt(0) == '_') {
                url = url.replace(":" + ckey, params[ckey]);
                delete params[ckey];
            } else {
                if (ckey == "filter") {
                    parArr.push(ckey + "=" + JSON.stringify(params[ckey]));
                }
            }
        });
        url = url.replace(/:[^/]+/ig, '/');
        if (parArr.length > 0) {
            url += ("?" + parArr.join("&"));
        }
        url = url.replace(/\/+/g, '/');
        url = url.replace(/\/$/, '');
        config.url = this.baseurl + url;
    }
};

/////////////////////////////////APICloud-rest-SHA1.js ___end/////////////////////////////////////////////////////

class MiApiCloudClient {
    constructor(appid, appkey) {
        this.appid = appid;
        var now = Date.now();
        this._preappKey=appkey;
        this.appKey = SHA1(this.appid + "UZ" + this._preappKey+ "UZ" + now) + "." + now
        this._apiHost = 'https://d.apicloud.com/mcm/api'
        this.resource= new Resource(this.appid, this._preappKey)
        MiApiCloudClient.MiApiCloudClient_this=this;
        MiApiCloudClient.begin=function(){}
    }

    defaultGetConfig(url, data){
        return {
            "url": url,
            "method": "GET",
            "cache": false,
            "headers": {
                "X-APICloud-AppId":  this.appid ,
                "X-APICloud-AppKey":  this.appKey
            },
            "data": data
        }
    }
    defaultPostConfig(url, data){
        return {
            "url": url,
            "method": "POST",
            "cache": false,
            "headers": {
                "X-APICloud-AppId": this.appid,
                "X-APICloud-AppKey": this.appKey
            },
            "data": data
        }
    }
    tableClient(tableName) {
        let tclient = {}
        tclient.tableClient = MiApiCloudClient.MiApiCloudClient_this.resource.Factory(tableName);
        tclient.tableName=tableName;

        tclient.add = function (data) {
            MiApiCloudClient.begin({tableName,data,"action":"add"})
            return new Promise(function (reslove, reject) {
                    $1.ajax(MiApiCloudClient.MiApiCloudClient_this.defaultPostConfig(MiApiCloudClient.MiApiCloudClient_this._apiHost + "/"+tableName, data)).success(function (data, status, header) {
                        reslove(data)
                    }).fail(function (header, status, errorThrown) {
                        reject(errorThrown)
                    })
                }
            )
        }

        tclient.delete = function (data) {
            MiApiCloudClient.begin({tableName,data,"action":"delete"})
            return new Promise(function (reslove, reject) {
                    $1.ajax(
                        MiApiCloudClient.MiApiCloudClient_this.defaultPostConfig(MiApiCloudClient.MiApiCloudClient_this._apiHost + "/"+tableName+"/" + data.id, {
                            "_method": "DELETE"
                        })
                    ).success(function (data, status, header) {
                        reslove(data)
                    }).fail(function (header, status, errorThrown) {
                        reject(errorThrown)
                    })
                }
            )
        }

        tclient.update = function (data) {
            //console.log("AAAAAAAA",data)
            MiApiCloudClient.begin({tableName,data,"action":"update"})
            data._method = "PUT";
            return new Promise(function (reslove, reject) {
                    $1.ajax(
                        MiApiCloudClient.MiApiCloudClient_this.defaultPostConfig(MiApiCloudClient.MiApiCloudClient_this._apiHost + "/"+tableName+"/" + data.id,data)
                    ).success(function (data, status, header) {
                        reslove(data)
                    }).fail(function (header, status, errorThrown) {
                        reject(errorThrown)
                    })
                }
            )
        }

        tclient.list = function (data,limit,skip,order,include,includefilter) {
            MiApiCloudClient.begin({data,limit,skip,order,include,includefilter,"action":"list"})
            return new Promise(function (reslove, reject) {
                    tclient.tableClient.query({
                        "filter": {
                            "where": data||{},
                            "limit": limit||500000,
                            "skip": skip||0,
                            "order": order||"createdAt ASC",
                            "include":include||{},
                            "includefilter":includefilter||{}
                        }
                    }, function (ret, err) {
                        reslove(ret)
                    })
                }
            )
        }

        tclient.count = function (data) {
            MiApiCloudClient.begin({tableName,data,"action":"count"})
            return new Promise(function (reslove, reject) {
                    tclient.tableClient.count({
                        "filter": {
                            "where": data||{}
                        }
                    }, function (ret, err) {
                        reslove(ret)
                    })
                }
            )
        }
        return tclient;
    }
}



module.exports = MiApiCloudClient;