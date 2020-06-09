$(document).ready(function() {
    let hotZone = document.querySelector('.zone_wrap');
    let title = document.querySelector('.content_title');
    let str = '';
    let card = document.querySelector('.content');
    let selectZone = document.getElementById('selectZone');
    let data;
    let allZone = new Array;
    getData();

    hotZone.addEventListener('click',hotfilter,false); //監聽熱門按鈕
    selectZone.addEventListener('change', updateList , false); //監聽選單

    //1.遠端撈取資料並轉陣列 2.進行篩選顯示在選單 3.設定下方顯示地區初始為三民區並更新資料
    function getData(argument) {
        var xhr = new XMLHttpRequest();  //
        xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97','true')
        xhr.send(null);
        xhr.onload =function() {
            data = JSON.parse(xhr.responseText).result.records;
            for (let i = 0; i < data.length; i++) {
                allZone.push(data[i].Zone);
            }
            allZone = allZone.filter(function (element, index, self) {
                return self.indexOf(element) === index;
            });
            for (let i = 0; i < allZone.length; i++) {
                selectZone.innerHTML +='<option value="'+allZone[i]+'">'+allZone[i]+'</option>'
            }
            str = '三民區';
            updateData();
        }
    }

    function updateData() {
        for (let i = 0; i < data.length; i++) {
            const placeName = data[i].Name;
            const placeImg = data[i].Picture1;
            const placeZone = data[i].Zone;
            const placeTime = data[i].Opentime;
            const placeAdd = data[i].Add;
            const placeTel = data[i].Tel;
            const placeTicketinfo = data[i].Ticketinfo;
            if (data[i].Zone == str) {
                card.innerHTML += 
                `<div class="place_wrap"> 
                    <div class="img" style="background-image: url(${placeImg})"> 
                        <div class="bar"> 
                            <div class="place_name">${placeName}</div> 
                            <div class="place_zone">${placeZone}</div> 
                        </div> 
                    </div> 
                    <div class="details_wrap"> 
                        <div class="place_open wrap_set"> 
                            <span><img src="./img/icons_clock.png" alt=""></span>
                            ${placeTime}
                        </div> 
                        <div class="place_add wrap_set"> 
                            <span><img src="./img/icons_pin.png" alt=""></span>
                            ${placeAdd}
                        </div> 
                        <div class="place_phone wrap_set">
                            <span><img src="./img/icons_phone.png" alt=""></span>
                            ${placeTel}
                            </div> 
                        <div class="place_ticket"> 
                            <span><img src="./img/icons_tag.png" alt=""></span>
                            ${placeTicketinfo}
                        </div> 
                    </div> 
                </div>`;
            } 
        }
    }
    // 點擊下拉選單更新
    function updateList (e) {
        let select = e.target.value;
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
        let hotzone = e.target.textContent;
        str = hotzone;
        title.textContent = hotzone;
        card.innerHTML='';
        updateData();
    };
});



