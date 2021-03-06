var lat //緯度
var lng //経度
var alt //高度
var accLatlng //緯度・経度の精度
var accAlt  //高度の精度
var heading //方角
var speed //速度

var syncerWatchPosition = {
  cont: 0,
  lastTime: 0,
  map: null,
  marker: null,
};


//GeoLocationAPI対応
if(navigator.geolocation) {
  console.log("test1");
  navigator.geolocation.getCurrentPosition(
    //現在地測定成功の場合
    function( position )
    {
      var data = position.coords;

      lat = data.latitude;
      lng = data.longitude;
      alt = data.altitude;
      accLatlng = data.accuracy;
      accAlt = data.altitudeAccuracy;
      heading = data.heading;
      speed = data.speed;
      //console.log(lat);

      //alert("現在位置は¥n[" + lat + "," + lng + "]\nです");
      //現在地表示
      //document.getElementById('result1').innerHTML = '<dl><dt>現在地</dt><dd>' + lat + ',' + lng '</dd></dl>'

      //divにて結果表示
      document.getElementById('result').innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>';

      decision();
      
      var myPosition = new google.maps.LatLng(lat,lng);
      
      //GoogleMaps 書き出し
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 20,
        center: myPosition,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControl: false,
      });
      
      //マーカー出力
      var mark = new google.maps.Marker({
        postion: myPosition,
        map: map
      });
    },

    //現在地測定失敗の場合
    function(error)
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

    },

    //オプション
    {
      "enableHighAccuracy": false,
      "timeout": 8000,
      "maximumAge": 2000,
    }
  );
}
else
{
  var errorMessage = "御使いの端末は、GeoLocationAPIに対応していません"

  alert(errorMessage);

  document.getElementById('result').innerHTML = errorMessage;
}

function decision() {
  //仮で自宅座標を取る
  if(lat==35.6382236&&lng==139.3020877) {
    alert("この場所は目的地Aです");
  }
}
