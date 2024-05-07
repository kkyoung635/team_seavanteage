import { strNewsDataURL, blogPost } from './data.js';
/*------------------------------------------------------------------
    create by kimsona
    at 2024-04-30
------------------------------------------------------------------*/
// scroll paging
let arrGetSectionTops = [];
function fGetAreaTops() {
    const nDocuTop = document.documentElement.getBoundingClientRect().top;
    return [...document.querySelectorAll('.main .areas')].map((item) => Math.floor(item.getBoundingClientRect().top - nDocuTop));
}
const fWheelPage = (e) => {
    if (e.deltaY < 0) return;
    const nNowY = Math.floor(window.scrollY) + 100;
    let ty = e.deltaY > 0 ? arrGetSectionTops.find((num) => nNowY < num) : arrGetSectionTops.findLast((num) => nNowY > num);
    ty = ty === undefined && e.deltaY < 0 ? 0 : ty;
    const k = e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
    if (ty !== undefined && k !== true) {
        e.preventDefault();
        window.scroll({ top: ty + 5, behavior: 'smooth' });
    }
};
window.addEventListener('resize', (e) => {
    arrGetSectionTops = fGetAreaTops();
});
window.addEventListener('load', (e) => {
    arrGetSectionTops = fGetAreaTops();
});
window.addEventListener('wheel', fWheelPage, { passive: false });

const objDefaultAnit = [{ opacity: [0, 1] }, { duration: 300, fill: 'forwards' }];
// for RollBanner class
class CMakeRollBanner {
    prntNode = null;
    chldNode = null;
    interval = 4500;
    nRollTime = 0.4;
    static pagingEle;
    timer = null;
    nPrntWidth = 0;
    nCurNode = 0;
    nLastNode = 0;
    paingClsName = 'on';
    bAutoRoll = true;
    nTotalCnt = 0;
    constructor(ele) {
        this.prntNode = ele;
        this.nPrntWidth = parseInt(getComputedStyle(ele).width);
        this.chldNode = [...ele.children];
        this.nTotalCnt = this.chldNode.length;
    }
    init() {
        this.pagingEle !== undefined ? this.pagingInit() : null;
        this.run(this.nCurNode);
        this.bAutoRoll ? this.startRoll() : null;
    }
    run(num = 0) {
        num = (num < 0 ? this.nTotalCnt - 1 : num) % this.nTotalCnt;
        this.nCurNode = num;
        this.chldNode[this.nLastNode].style.zIndex = 0;
        this.chldNode[num].style.transition = `left ${this.nRollTime}s`;
        this.chldNode[num].style.left = `0px`;
        this.chldNode[num].style.opacity = 1;
        this.chldNode[num].style.zIndex = 1;
        this.bAutoRoll && this.pagingEle !== undefined ? this.paging(num) : null;
        this.nCurNode !== this.nLastNode ? this.timeout(this.nLastNode) : null;
        this.nLastNode = this.nCurNode;
    }
    stopRoll() {
        clearInterval(this.timer);
        this.timer = null;
    }
    startRoll() {
        this.timer = setInterval(() => {
            this.run(this.nCurNode + 1);
        }, this.interval);
    }
    setRoll(num = 0) {
        this.run(num);
        this.stopRoll();
        this.startRoll();
    }
    timeout(num = 0) {
        setTimeout(() => {
            this.chldNode[num].style.transition = 'none';
            this.chldNode[num].style.left = `${this.nPrntWidth}px`;
            this.chldNode[num].style.opacity = 0;
        }, this.nRollTime * 1000);
    }
    pagingInit() {
        this.pagingEle.forEach((item, idx) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.setRoll(idx);
            });
        });
    }
    paging(num = 0) {
        this.pagingEle.forEach((item) => item.classList.remove(this.paingClsName));
        this.pagingEle[num].classList.add(this.paingClsName);
    }
}
class CRollForA4 extends CMakeRollBanner {
    static objAni;
    bPagingAni = false;
    spanDot = document.querySelector('.main .main-area4 .menu-paing span');
    constructor(ele) {
        super(ele);
    }
    run(num = 0) {
        super.run(num);
        this.ani();
    }
    ani() {
        if (this.objAni === undefined) return;
        const time = this.nRollTime * 1000;
        const num = this.nCurNode;
        this.objAni[num].style.transform = 'translateX(-100%)';
        this.objAni[num].style.opacity = 0;
        this.objAni[num].animate({ ...objDefaultAnit[0], transform: ['translateX(-100%)', 'translateX(0%)'] }, { ...objDefaultAnit[1], duration: time, delay: time / 2 });
    }
    paging(num = 0) {
        super.paging(num);
        if (this.bPagingAni === false) return;
        this.pagingAniSet(this.pagingEle[num]);
    }
    pagingAniSet(ele) {
        const wid = ele.getBoundingClientRect().left + ele.getBoundingClientRect().width - this.spanDot.getBoundingClientRect().width + 10 - ele.parentElement.getBoundingClientRect().left;
        const ani = [
            { transform: ['', `translateX(${wid}px)`], opacity: [0, 1] },
            { duration: 400, fill: 'forwards' },
        ];
        this.spanDot.animate(...ani);
    }
}
// viewport onload function
function fObserverInitA3(ele,fucn,flag=true) {
    const opt = { root: null, rooMargin: '13.3333vw 0vw 13.3333vw 0vw', threshold: 0, delay: 1000 };
    const obser = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            fucn(1);
            if(flag===true) observer.unobserve(ele);
        } else {
            if(flag === false) fucn(0);
        }
    }, opt);
    return obser;
}

// main visual
const liVisuAni = document.querySelector('#visual .vis-banner li');
const fVisuSet = (b) =>{
    const ani = [{...objDefaultAnit[0],transform: ['translateX(-100%)', 'translateX(0%)']},{...objDefaultAnit[1]}];
    liVisuAni.animate(...ani);
};
fObserverInitA3(liVisuAni,(b)=>fVisuSet(b),true).observe(liVisuAni);

// toTop Shortcut link
const iconToTop = document.querySelector('#sideBar .menu a');
iconToTop.addEventListener('click',e=>{
    e.preventDefault();
    window.scroll({ top: 0, behavior: 'smooth' });
});

// area1 hover event
const ulArea1 = document.querySelector('.main .main-area1 ul');
const imgArea1 = document.querySelector('.main .main-area1 .sol-img img');
const divArea1 = [...document.querySelectorAll('.main .main-area1 .txt-cards')];
const liArea1 = [...ulArea1.children];
liArea1.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        liArea1.forEach(item=>item.classList.remove('on'));
        item.classList.add('on');
        fSetArea1Hover(idx + 1);
    });
});
function fSetArea1Hover(num = 0) {
    divArea1.forEach((item) => item.classList.remove('on'));
    divArea1[num].classList.add('on');
    divArea1[num].animate(...objDefaultAnit);
    imgArea1.animate(...objDefaultAnit);
    imgArea1.setAttribute('src', `images/main/main-area1-img${num}.jpg`);
    imgArea1.setAttribute('alt', document.querySelectorAll('.main .main-area1 .txt-cards h2')[num].textContent);
}

// area2 roll logos
const divA2Logos = document.querySelector('.main .main-area2 .logos-width');
const ulA2Logos = divA2Logos.querySelector('ul');
const clUlLogos = ulA2Logos.cloneNode(true);
divA2Logos.appendChild(clUlLogos);
clUlLogos.style.left = ulA2Logos.style.width;
ulA2Logos.classList.add('original');
clUlLogos.classList.add('clone');

// area3 swiper plug-in set
const divA2Swip = document.querySelectorAll('.main .main-area3 .a3-banner .swiper-slide div');
const swiper = new Swiper(".a3Swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
});
divA2Swip[0].classList.add('on');
swiper.on('slideChange',function () {
    divA2Swip.forEach(item=>item.classList.remove('on'));
    divA2Swip[swiper.activeIndex].classList.add('on');
});

// area3 count
const ulCountNum = document.querySelector('.main .main-area3 ul:first-of-type');
const arrCountNum = document.querySelectorAll('[data-count]');
const emCountNum = document.querySelectorAll('.main .main-area3 ul:first-of-type li b strong');
const fSetCountNum = (b) => {
    if (b===0) return;
    emCountNum.forEach((item, idx) => {
        const num = Number(arrCountNum[idx].dataset.count),
            speed = 250;
        let currnt = 0,
            step = 0;
        const fCountUp = () => {
            step = Math.floor(num / speed);
            step = step === 0 ? speed / 700 : step;
            if (currnt <= num) {
                currnt += step;
                item.textContent = new Intl.NumberFormat().format(currnt.toFixed(0));
                setTimeout(fCountUp, 10);
            } else item.textContent = new Intl.NumberFormat().format(num);
        };
        fCountUp();
    });
};
fObserverInitA3(ulCountNum,(b)=>{fSetCountNum(b)},true).observe(ulCountNum);

// area4 roll
const ulRollArea4 = document.querySelector('.main .main-area4 .suit-banner');
const ancRollArea4 = document.querySelectorAll('.main .main-area4 .menu-paing a');
const cRollArea4 = new CRollForA4(ulRollArea4);
cRollArea4.pagingEle = ancRollArea4;
cRollArea4.objAni = document.querySelectorAll('.main .main-area4 .suit-banner li .bg-trans');
cRollArea4.bPagingAni = true;
cRollArea4.init();

// area4~5 fade in
AOS.init();

// area6 scroll
const btnContentCard = document.querySelectorAll('.main .main-area6 .category span');
const newslist = document.querySelector('.news-list');
const bloglist = document.querySelector('.blog-list');
const allConList = document.querySelectorAll('.main .main-area6 .list');
const [arrNewsList, arrBlogList] = [strNewsDataURL, blogPost.filter((item) => item.id <= 5)];
let bViewNews = true;
btnContentCard.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        allConList.forEach(($item) => $item.classList.remove('on'));
        btnContentCard.forEach(($item) => $item.classList.toggle('on'));
        bViewNews = idx === 0 ? true : false;
        allConList[idx].animate(...objDefaultAnit);
        allConList[idx].classList.add('on');
    });
});
function fContListInit(list, arr) {
    const ul = list.querySelector('ul');
    const cate = list.className.indexOf('news') >= 0 ? true : false;
    ul.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const pic = document.createElement('img');
        const p = document.createElement('p');
        pic.setAttribute('alt', arr[i].title);
        pic.setAttribute('src', `./images/main/area6/${cate===true?'news':'blog'}-img${i}.jpg`);
        p.textContent = arr[i].title;
        li.setAttribute('class','swiper-slide');
        li.append(pic,p);
        ul.append(li);
    }
}
fContListInit(newslist, arrNewsList);
fContListInit(bloglist, arrBlogList);
new Swiper(".list", {
    slidesPerView: 2,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
});
