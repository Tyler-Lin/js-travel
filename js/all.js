$(document).ready(function() {
    let hotZone = document.querySelector('.zone_wrap');
    let title = document.querySelector('.content_title');
    let str = '';
    let card = document.querySelector('.content');
    let selectZone = document.getElementById('selectZone');
    let data; //所有資料
    let selectZone = new Array;
    let zoneData = []; 
    let nowPage = 1;
    getData();

    hotZone.addEventListener('click',hotfilter,false); //監聽熱門按鈕
    selectZone.addEventListener('change', updateList , false); //監聽選單

    //1.遠端撈取資料並轉陣列 2.進行篩選顯示在下拉選單 3.設定下方顯示地區初始為三民區並更新資料
    function getData(argument) {
        var xhr = new XMLHttpRequest();  //
        xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97','true')
        xhr.send(null);
        xhr.onload =function() {
            data = JSON.parse(xhr.responseText).result.records;
            for (let i = 0; i < data.length; i++) {
                selectZone.push(data[i].Zone);
            }
            selectZone = selectZone.filter(function (element, index, self) {
                return self.indexOf(element) === index;
            });
            for (let i = 0; i < selectZone.length; i++) {
                selectZone.innerHTML +='<option value="'+selectZone[i]+'">'+selectZone[i]+'</option>'
            }
            str = '三民區';
            updateData();
        }
    }

    function updateData() {
        zoneData = [];
        for (let i = 0; i < data.length; i++) {
            const placeName = data[i].Name;
            const placeImg = data[i].Picture1;
            const placeZone = data[i].Zone;
            const placeTime = data[i].Opentime;
            const placeAdd = data[i].Add;
            const placeTel = data[i].Tel;
            const placeTicketinfo = data[i].Ticketinfo;

            if(data[i].Zone == str){
                zoneData.push(data[i]);
            }
            // if (data[i].Zone == str) {
            //     card.innerHTML += 
            //     `<div class="place_wrap"> 
            //         <div class="img" style="background-image: url(${placeImg})"> 
            //             <div class="bar"> 
            //                 <div class="place_name">${placeName}</div> 
            //                 <div class="place_zone">${placeZone}</div> 
            //             </div> 
            //         </div> 
            //         <div class="details_wrap"> 
            //             <div class="place_open wrap_set"> 
            //                 <span><img src="./img/icons_clock.png" alt=""></span>
            //                 ${placeTime}
            //             </div> 
            //             <div class="place_add wrap_set"> 
            //                 <span><img src="./img/icons_pin.png" alt=""></span>
            //                 ${placeAdd}
            //             </div> 
            //             <div class="place_phone wrap_set">
            //                 <span><img src="./img/icons_phone.png" alt=""></span>
            //                 ${placeTel}
            //                 </div> 
            //             <div class="place_ticket"> 
            //                 <span><img src="./img/icons_tag.png" alt=""></span>
            //                 ${placeTicketinfo}
            //             </div> 
            //         </div> 
            //     </div>`;
            // } 
        }
        pagination(zoneData,nowPage);
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


    // 分頁製作---

    function pagination (pageData, nowPage) {
        card.innerHTML="";
        const dataTotal = pageData.length;
        const perpage = 6;
        const pageTotal = Math.ceil(dataTotal / perpage);
        // console.log(`全部資料:${dataTotal},每一頁顯示:${perpage}筆資料,共有${pageTotal}頁`);
        let currentPage = nowPage;
        if (currentPage > pageTotal) {
            currentPage = pageTotal;
        }
        const minData = (currentPage * perpage) - perpage + 1;
        const maxData = (currentPage * perpage);
        const newData =[];
        pageData.forEach((item,index) => {
            const num = index + 1;
            if(num >= minData && num <= maxData){
                newData.push(item);
            }
        }) //產生新陣列
        newData.forEach((item, i )=> {
            const placeName = newData[i].Name;
            const placeImg = newData[i].Picture1;
            const placeZone = newData[i].Zone;
            const placeTime = newData[i].Opentime;
            const placeAdd = newData[i].Add;
            const placeTel = newData[i].Tel;
            const placeTicketinfo = newData[i].Ticketinfo;
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
        }) 
        const page = {
            pageTotal,
            currentPage,
            hasPage: currentPage > 1,
            hasNext: currentPage < pageTotal,
        }
        pageBtn(page);
    }


    function pageBtn (page){
        let str = '';
        const total = page.pageTotal;
      
        if(page.hasPage) {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">Previous</a></li>`;
        } else {
            str += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
        }
      

        for(let i = 1; i <= total; i++){
            if(Number(page.currentPage) === i) {
                str +=`<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            } else {
                str +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            }
        };

        if(page.hasNext) {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">Next</a></li>`;
        } else {
            str += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
        }
        pageid.innerHTML = str;
    }

    function switchPage(e){
        e.preventDefault();
        if(e.target.nodeName !== 'A') return;
        const page = e.target.dataset.page;
        pagination(zoneData, page);
    }

    pageid.addEventListener('click', switchPage);

});

