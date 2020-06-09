$(document).ready(function() {
    var hotZone = document.querySelector('.zone_wrap');
    var title = document.querySelector('.content_title');
    var str = '';
    var card = document.querySelector('.content');
    var selectZone = document.getElementById('selectZone');
    var data;
    var allZone = new Array;
    getData();

    hotZone.addEventListener('click',hotfilter,false); //監聽熱門按鈕
    selectZone.addEventListener('change', updateList , false); //監聽選單

    //1.遠端撈取資料並轉陣列 2.進行篩選顯示在選單
    function getData(argument) {
        var xhr = new XMLHttpRequest();  //
        xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97','true')
        xhr.send(null);
        xhr.onload =function() {
            data = JSON.parse(xhr.responseText).result.records;
            for (var i = 0; i < data.length; i++) {
                allZone.push(data[i].Zone);
            }
            allZone = allZone.filter(function (element, index, self) {
                return self.indexOf(element) === index;
            });
            for (var i = 0; i < allZone.length; i++) {
                selectZone.innerHTML +='<option value="'+allZone[i]+'">'+allZone[i]+'</option>'
            }
            list();
        }
    }
    // 網頁剛載入時下方顯示之資料
    function list() {
        str = '三民區';
        for (var i = 0; i < data.length; i++) {
            if (data[i].Zone == str) {
                card.innerHTML += '<div class="place_wrap"> <div class="img" style="background-image: url('+data[i].Picture1+')"> <div class="bar"> <div class="place_name">'+data[i].Name+'</div> <div class="place_zone">'+data[i].Zone+'</div> </div> </div> <div class="details_wrap"> <div class="place_open wrap_set"> <span><img src="./img/icons_clock.png" alt=""></span>'+data[i].Opentime+'</div> <div class="place_add wrap_set"> <span><img src="./img/icons_pin.png" alt=""></span>'+data[i].Add+'</div> <div class="place_phone wrap_set"> <span><img src="./img/icons_phone.png" alt=""></span>'+data[i].Tel+'</div> <div class="place_ticket"> <span><img src="./img/icons_tag.png" alt=""></span>'+data[i].Ticketinfo+'</div> </div> </div>';
            } 
        }
    }
     //更新資料
    function updateData() {
        for (var i = 0; i < data.length; i++) {
            if (data[i].Zone == str) {
                card.innerHTML += '<div class="place_wrap"> <div class="img" style="background-image: url('+data[i].Picture1+')"> <div class="bar"> <div class="place_name">'+data[i].Name+'</div> <div class="place_zone">'+data[i].Zone+'</div> </div> </div> <div class="details_wrap"> <div class="place_open wrap_set"> <span><img src="./img/icons_clock.png" alt=""></span>'+data[i].Opentime+'</div> <div class="place_add wrap_set"> <span><img src="./img/icons_pin.png" alt=""></span>'+data[i].Add+'</div> <div class="place_phone wrap_set"> <span><img src="./img/icons_phone.png" alt=""></span>'+data[i].Tel+'</div> <div class="place_ticket"> <span><img src="./img/icons_tag.png" alt=""></span>'+data[i].Ticketinfo+'</div> </div> </div>';
            } 
        }
    }
    // select更新資料
    function updateList (e) {
        var select = e.target.value;
        str = select;
        title.textContent = select;
        card.innerHTML='';
        updateData();
    }
    // 點擊熱門按鈕更新資料
    function hotfilter(e) {
        e.preventDefault();
        if (e.target.nodeName !== 'LI') {
            return;
        }
        var hotzone = e.target.textContent;
        str = hotzone;
        title.textContent = hotzone;
        card.innerHTML='';
        updateData();
    };
});



