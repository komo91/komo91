var lat //緯度
var lng //経度
var alt //高度
var accLatlng //緯度・経度の精度
var accAlt  //高度の精度
var heading //方角
var speed //速度

//動的情報取得データ
var syncerWatchPosition = {
  count: 0,
  lastTime: 0,
  map: null,
  marker: null,
};

//地点情報
var point = {
  lat: 35.6259739,
  lng: 139.2785983,
};

//周囲判定円
var CirclePoint = {
  center: new google.maps.LatLng(point.lat,point.lng),
  map: syncerWatchPosition.map,
  radius: 10,
};


//GeoLocationAPI対応
if(navigator.geolocation) {
  //現在地測定成功の場合
  function successFunc( position ) {
    var data = position.coords;
    
    lat = data.latitude;
    lng = data.longitude;
    alt = data.altitude;
    accLatlng = data.accuracy;
    accAlt = data.altitudeAccuracy;
    heading = data.heading;
    speed = data.speed;
    
    ++syncerWatchPosition.count;
    var nowTime = ~~(new Date() / 1000);
      
    if((syncerWatchPosition.lastTime + 3) > nowTime) {
      return false;
    }
      
    syncerWatchPosition.lastTime = nowTime;
      
    //document.getElementById('result1').innerHTML = '<dl><dt>現在地</dt><dd>' + lat + ',' + lng '</dd></dl>'

    //divにて結果表示
    document.getElementById('result').innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>';

    var myPosition = new google.maps.LatLng(lat,lng);
      
    if(syncerWatchPosition.map == null) {
      syncerWatchPosition.map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 20,
        center: myPosition,
      });
        
      syncerWatchPosition.marker = new google.maps.Marker( {
        map: syncerWatchPosition.map,
        position: myPosition,
      });
    } else {
      syncerWatchPosition.map.setCenter(myPosition);
      syncerWatchPosition.marker.setPosition(myPosition);
    }
    
    test1();
    
    decision();
  }

  //現在地測定失敗の場合
  function errorFunc(error)
  {
    var errorInfo = [
      "原因不明のエラー", //0
      "位置情報取得許可されない", //1
      "電波状況で位置情報取得できず", //2
      "タイムアウト"  //3
    ];

    var errorNo = error.code;

    var errorMessage = "[エラー番号:" + errorNo + "]\n" + errorInfo[errorNo];

    alert(errorMessage);
    console.log("test3");

    document.getElementById("result").innerHTML = errorMessage;

  }

  //オプション
  var optionObj = {
    "enableHighAccuracy": false,
    "timeout": 8000,
    "maximumAge": 2000,
  };
} else {
  var errorMessage = "御使いの端末は、GeoLocationAPIに対応していません"

  alert(errorMessage);

  document.getElementById('result').innerHTML = errorMessage;
}
  
var watchId = navigator.geolocation.watchPosition( successFunc, errorFunc, optionObj );


function decision() {
  //仮地点A座標を取る
  if(lat==35.6382236&&lng==139.3020877) {
    alert("この場所は地点Aです");
    navigator.geolocation.clearWatch(watchId);
  } else if(lat==35.6387688&&lng==139.3030753) {  //神社近く
    alert("この地点は神社近くです");
    navigator.geolocation.clearWatch(watchId);
  } else if(lat==35.63836704&&lng==139.30648098) {  //ドンキ
    alert("この地点はドンキ前です");
    navigator.geolocation.clearWatch(watchId);
  } else if(lat==35.63781429&&lng==139.30421229) {  //元セブン
    alert("この地点は元セブン前です");
    navigator.geolocation.clearWatch(watchId);
  } else if(lat==35.63805769&&lng==139.30061043) {  //アルプス
    alert("この地点はアルプス前です");
    navigator.geolocation.clearWatch(watchId);
  } else if(lat <= point.lat && lng <= point.lng) { //テスト
    alert("円の中");
    navigator.geolcation.clearWatch(watchId);
  }
}

function test1() {
  var Cir = new google.maps.Circle(CirclePoint);
  
  console.log("test1実行");
}
