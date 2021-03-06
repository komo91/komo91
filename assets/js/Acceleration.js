var view = true;

window.addEventListener("devicemotion",function(e){
   //加速度
   var acc = e.acceleration;
   var x = obj2NumberFix(acc.x,2);
   var y = obj2NumberFix(acc.y,2);
   var z = obj2NumberFix(acc.z,2);


   //傾き(重力加速度)
   var acc_g = e.accelerationIncludingGravity;
   var gx = obj2NumberFix(acc_g.x,2);
   var gy = obj2NumberFix(acc_g.y,2);
   var gz = obj2NumberFix(acc_g.z,2);

   /*
   //回転値
   var rota_r = e.rotationRate;
   var r_a = obj2NumberFix(rota_r.alpha,2);
   var r_b = obj2NumberFix(rota_r.beta,2);
   var r_c = obj2NumberFix(rota_r.gamma,2);
   */

   if(view==true) {
     warning_view();
     view = false;
   }

   var check = acceleration_decision(x,y,z);
   sleep(1000);

   var mes = document.getElementById('result').innerHTML = "送信中...";

   walk_log(x,y,z,check);
   //表示
   print_3('acc-x',x,'acc-y',y,'acc-z',z);
   print_3('acc-gx',gx,'acc-gy',gy,'acc-gz',gz);
   //print_3('rx',r_a,'ry',r_b,'rz',r_c);
});

function obj2NumberFix(obj,fix_deg) {
   return Number(obj).toFixed(fix_deg);
}

function print_3(id1,value1,id2,value2,id3,value3) {
  print_1(id1,value1);
  print_1(id2,value2);
  print_1(id3,value3);
}
function print_1(id,value) {
  var id_obj = document.getElementById(id);
  id_obj.innerHTML = value;
}

//歩きスマホ警告
function warning_view() {
  var tar = document.getElementById('sub');

  var a_height = Math.max(document.body.clientHeight,document.body.scrollHeight);
  var b_height = Math.max(document.documentElement.scroollheight,document.documentElement.clientHeight);
  var max_height = Math.max(a_height,b_height);
  tar.style.height - max_height + 'px';

  var a_width = Math.max(document.body.clientWidth,document.body.scrollWidth);
  var b_width = Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth);
  var max_width = Math.max(a_width,b_width);
  tar.style.width = max_width + 'px';
}

function walk_log(x,y,z,check) {
  var script = document.createElement('script');
  var base = 'https://script.google.com/macros/s/AKfycbzZ3mZG_xRCN9OaOYIViGn9PQMyHvbgS6PdAtENGAEWVRzZ2LE/exec';
  script.src = base + '?callback=receiveJson&x=' + x + '&y=' + y + '&z=' + z + '&check=' + encodeURI(check);
  document.body.appendChild(script);
}

function receiveJson(json) {
  mes = "送信完了!";
}

function sleep(wait_time) {
  var start = new Date();
  while(new Date() - start < wait_time);
}

function acceleration_decision(x,y,z) {
  //歩きスマホしてる時のみ表示させる
  if(x>=0.5 || y>=1.3 || z>=2.0) {
    document.getElementById('sub').style.visibility = "visible";
    return 'Ok!';
    //alert('歩きスマホダメゼッタイ！');  //レイヤ透明度を低く調整したい
  } else {
    document.getElementById('sub').style.visibility = "hidden";
    return '(判定)ダメです';
  }
}
