$(document).ready(function() {
    var popZone = document.querySelector('.zone_wrap');
    var title = document.querySelector('.content_title');
    var str = '';
    var card = document.querySelector('.content');
    var selectZone = document.getElementById('selectZone');
    getZone();
    list();


    popZone.addEventListener('click',popfilter,false);
    selectZone.addEventListener('change', updateList , false);

    // select option add
    function getZone () {
        var xhr = new XMLHttpRequest();  //
        xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97','true')
        xhr.send(null);
        xhr.onload = function() {
            var allZone = new Array;
            var data = JSON.parse(xhr.responseText).result.records; //陣列
            for (var i = 0; i < data.length; i++) {
                allZone.push(data[i].Zone);
            }
            var zoneData = allZone.filter(function (element, index, self) {
                return self.indexOf(element) === index;
            });

            for (var i = 0; i < zoneData.length; i++) {
                selectZone.innerHTML +='<option value="'+zoneData[i]+'">'+zoneData[i]+'</option>'
            }
        } 
    };
    // 網頁剛載入時顯示三民區
    function list() {
        var xhr = new XMLHttpRequest();  //
        xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97','true')
        xhr.send(null);
        xhr.onload = function() {
            var str = '三民區';
            var data = JSON.parse(xhr.responseText).result.records; //陣列
            for (var i = 0; i < data.length; i++) {
                if (data[i].Zone == str) {
                    card.innerHTML += '<div class="place_wrap"> <div class="img" style="background-image: url('+data[i].Picture1+')"> <div class="bar"> <div class="place_name">'+data[i].Name+'</div> <div class="place_zone">'+data[i].Zone+'</div> </div> </div> <div class="details_wrap"> <div class="place_open wrap_set"> <span><img src="./img/icons_clock.png" alt=""></span>'+data[i].Opentime+'</div> <div class="place_add wrap_set"> <span><img src="./img/icons_pin.png" alt=""></span>'+data[i].Add+'</div> <div class="place_phone wrap_set"> <span><img src="./img/icons_phone.png" alt=""></span>'+data[i].Tel+'</div> <div class="place_ticket"> <span><img src="./img/icons_tag.png" alt=""></span>'+data[i].Ticketinfo+'</div> </div> </div>';
                } 
            }
        }
    }
    // select更新資料
    function updateList (e) {
        // body... 
        var select = e.target.value;
        str = select;
        title.textContent = select;
        card.innerHTML='';
        getData();
    }
    // 點擊熱門地區更新資料
    function popfilter(e) {
        e.preventDefault();
        if (e.target.nodeName !== 'LI') {
            return;
        }
        var popzone = e.target.textContent;
        str = popzone;
        title.textContent = popzone;
        card.innerHTML='';
        getData();
    };

    //抓取資料
    function getData() {
        var xhr = new XMLHttpRequest();  //
        xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97','true')
        xhr.send(null);
        xhr.onload = function() {
            var data = JSON.parse(xhr.responseText).result.records; //陣列
            for (var i = 0; i < data.length; i++) {
                if (data[i].Zone == str) {
                    card.innerHTML += '<div class="place_wrap"> <div class="img" style="background-image: url('+data[i].Picture1+')"> <div class="bar"> <div class="place_name">'+data[i].Name+'</div> <div class="place_zone">'+data[i].Zone+'</div> </div> </div> <div class="details_wrap"> <div class="place_open wrap_set"> <span><img src="./img/icons_clock.png" alt=""></span>'+data[i].Opentime+'</div> <div class="place_add wrap_set"> <span><img src="./img/icons_pin.png" alt=""></span>'+data[i].Add+'</div> <div class="place_phone wrap_set"> <span><img src="./img/icons_phone.png" alt=""></span>'+data[i].Tel+'</div> <div class="place_ticket"> <span><img src="./img/icons_tag.png" alt=""></span>'+data[i].Ticketinfo+'</div> </div> </div>';
                } 
            }
        }
    }
});



