# -- coding: utf-8 --

import json, requests
import hashlib
import sys


# 翻译字符
# 参数 fromText：源语言， toText：目标语言，transWords： 待翻译内容
def trans_words(fromText, toText, transWords):
    # http://api.fanyi.baidu.com/api/trans/vip/translate?q=banana&from=en&to=zh&appid=20220331001153008&salt=1435660288&sign=b91ccd40c9d41dfa8230044b82cbd2b4
    if(transWords == '' or  transWords is None):
        return "1"

    transUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
    salt = '1435660288' 
    password = 'p65WQ_aMpFXMvELJIGfg'
    appid = '20220331001153008' 

    sign = hashlib.md5((appid+transWords+salt+password).encode(encoding='UTF-8')).hexdigest()

    # 请求参数拼接
    data = {
        "from": fromText,   # 源语言 en-英语 kor-韩文 jp-日语 it-意大利 zh 中文
        "to": toText,       # 翻译目标语言
        "q": transWords,    # 待翻译字符
        "appid": appid,     # 开发者id
        "salt": salt,       # 随机数
        "sign": sign,       # 签名：appid+q+salt+密钥的顺序拼接
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    }
    try:
        res = requests.post(transUrl, data=data, headers=headers, timeout=3).json()
        # print(res)
        data_result = json.loads(json.dumps(res, indent=2, ensure_ascii=False)) # dumps将字符串转化为json， loads将json转化为字典
        print(data_result)
    except Exception as e:
        print('请求出现异常:', e)
        return "2"

    if('trans_result' not in data_result.keys()):
        return "3"
    return data_result['trans_result'][0]['dst']

if __name__ =='__main__':
    if(len(sys.argv) < 4):
      print('请求参数不足')
      exit(0)
    result = trans_words(sys.argv[1], sys.argv[2], sys.argv[3])
    print('result', result)
    filename = 'test.txt'

    #读取：
    with open('./script/translate_result.txt', 'w', encoding='utf-8') as fileobj:
        fileobj.write(result)
