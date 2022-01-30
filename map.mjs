// import countryName from "./countryName.json";
// const countryName = require("./countryName.json");
// 設定中心點
var map = L.map("map", {
  // center: [22.604799, 120.2976256],
  zoom: 16,
});

// setView 可以設定地圖座標
// watch 則是持續監聽使用者的位置
map.locate({ setView: true, watch: true });

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
var greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
// 新增圖層專門放icon
var markers = new L.MarkerClusterGroup().addTo(map);
// 串接api
// var xhr = new XMLHttpRequest();
// xhr.open("get", "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json");
// xhr.send();
// xhr.onload = function () {
//     var data = JSON.parse(xhr.responseText).features
//     for (let i = 0; data.length > i; i++)
{
  //         markers.addLayer(L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], { icon: greenIcon }).bindPopup(data[i].properties.name));
  //         // add more markers here...
  //         // L.marker().addTo(map)
  //         //   )
  //     }
  //     map.addLayer(markers);
  // }

  // link coffee api
  var xhr = new XMLHttpRequest();
  var cors = "https://cors.bridged.cc/";
  var url = "https://cafenomad.tw/api/v1.2/cafes/";
  // var table = `<table>
  // <thead>
  //     <tr>
  //         <th colspan="2">${value.name}</th>
  //     </tr>
  // </thead>
  // <tbody>
  //     <tr>
  //         <td>地址</td>
  //         <td>${value.address}</td>
  //     </tr>
  //   <tr>
  //         <td>時間</td>
  //         <td>${value.open_time}</td>
  //     </tr>
  // </tbody>
  // </table>`
  xhr.open("get", `${cors}${url}`);
  xhr.send();
  xhr.onload = function () {
    var datas = JSON.parse(xhr.responseText);
    datas.map(function (value, index) {
      var openTime, mrt, fanpage, wifi;
      if (value.wifi !== "") {
        wifi = `<tr>
                        <td>Wifi</td>
                            <td>${value.wifi}</td>
                        </tr>`;
      } else {
        wifi = ``;
      }

      if (value.open_time !== "") {
        openTime = `<tr>
                        <td>營業時間</td>
                            <td>${value.open_time}</td>
                        </tr>`;
      } else {
        openTime = ``;
      }
      if (value.mrt !== "") {
        mrt = `<tr>
                        <td>捷運</td>
                            <td>${value.mrt}</td>
                        </tr>`;
      } else {
        mrt = ``;
      }

      if (value.url !== "") {
        fanpage = `<tr>
                        <td>粉絲頁</td>
                            <td><a href="${value.url}">${value.url}</a></td>
                            
                        </tr>`;
      } else {
        fanpage = ``;
      }

      markers.addLayer(
        L.marker([value.latitude, value.longitude], { icon: greenIcon })
          .bindPopup(`<table>
        <thead>
            <tr>
                <th colspan="2">${value.name}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>地址</td>
                <td>${value.address}</td>
            </tr>
            ${wifi}
            ${openTime}
            ${mrt}
            ${fanpage}
            
        </tbody>
        </table>`)
      );
    });
    map.addLayer(markers);
  };
}
