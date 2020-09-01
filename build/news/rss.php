<?php

//https://developer.amazon.com/alexa/console/ask/build/amzn1.ask.skill.9769f9c8-f17b-4ec1-a26f-4cf83f9f0625/development/ja_JP
//https://rinkobus.bus-navigation.jp/wgsys/wgp/busMarkImg.htm?locale=ja&from=%E6%B5%85%E7%94%B0%E4%B8%89%E4%B8%81%E7%9B%AE&fromType=1&fromlat=&fromlng=&to=%E5%B7%9D%E5%B4%8E%E9%A7%85%E5%89%8D&toType=1&tolat=&tolng=&existYn=N&_=1584344430860

error_reporting(-1);

header('Content-Type: application/json');

// ストリームを作成します
$opts = array(
    'http'=>array(
        'method'=>"GET",
        'header'=>"User-Agent: Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36"
    )
);

$context = stream_context_create($opts);

// 上で設定した HTTP ヘッダを使用してファイルをオープンします
$json = file_get_contents('https://rinkobus.bus-navigation.jp/wgsys/wgp/busMarkImg.htm?locale=ja&from=%E6%B5%85%E7%94%B0%E4%B8%89%E4%B8%81%E7%9B%AE&fromType=1&fromlat=&fromlng=&to=%E5%B7%9D%E5%B4%8E%E9%A7%85%E5%89%8D&toType=1&tolat=&tolng=&existYn=N&_=1584344430860', false, $context);
// もしFalseが返っていたらエラー
if ($json!==false) {
    $json = json_decode($json,true);
    $b = $json['busData'];
}
$json = null;
$j = [];

function late($t) {
    if($t==="") return "";
    if( $t<1 ) return "遅れはありません。";
    return $t. "分遅れています。";
}

function type($t) {
    if($t['tempBusCode']=='0324') return "車種は「りんたん」です。";
    return $t['nonstepFlg']!==""? $t['nonstepFlg']."バスです。" : "";
}

function rollsign($s) {
    switch($s) {
        case '川２７':
            return '渡田4丁目経由';
        default:
            return '八丁畷経由';
    }
}

$now = date('c');
$lates = 0;
$maxlate = 0;
$total = 0;

for($i=0, $size=count($b); $i<$size; ++$i) {
    if(($b[$i]['arrivTimeSrcSec']==null|$b[$i]['departureScheduleTimeSec']==null)) continue;
    $late = ceil(($b[$i]['arrivTimeSrcSec']-$b[$i]['departureScheduleTimeSec'])/60);
    $lates += $late;
    if($maxlate<$late) $maxlate = $late;
    $total++;
    if($b[$i]['rollsignName']==="川２７")
    $j[] = (object) array(
        "uid" => $i+1,
        "updateDate" => $now,
        "titleText" => $b[$i]['rollsignName']. "系統",
        "mainText" => $b[$i]['departureScheduleTime']. "発の". rollsign($b[$i]['rollsignName']). "は、あと". $b[$i]['willDepartureTime3']. $b[$i]['willDepartureTime2'] . "。". late($late). type($b[$i]),
        //"ex" => $b[$i]['arrivTimeSrcSec']. "/". $b[$i]['departureScheduleTimeSec']. " ". ceil(($b[$i]['arrivTimeSrcSec']-$b[$i]['departureScheduleTimeSec'])/60). " : ". $b[$i]['tempBusCode']. " ". floor($b[$i]['departureScheduleTimeSec']/60/60). ":". floor($b[$i]['departureScheduleTimeSec']/60%60),
        "redirectionUrl" => "https://www.amazon.com"
    );
}

array_unshift($j, (object) array(
    "uid" => 0,
    "updateDate" => $now,
    "titleText" => "概要",
    "mainText" => $total>0? "運行情報". $total. "件を取得しました。約". late(ceil($lates/$total)). "最大は". $maxlate. "分です。" : "運行情報を取得できませんでした。",
    "ex" => "$lates / $total",
    "redirectionUrl" => "https://www.amazon.com"
));

echo json_encode($j);

?>