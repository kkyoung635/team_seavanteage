const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const flink = () => {
    const $links = getAll('a[href="#"]');
    $links.forEach((links) => {
        links.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
};
const fheaderType = () => {
    const $header = get('#header .type');
    const $logo = get('#header .type h1 a img');
    const $user = get('#header .icons .user img');
    const $allMenu = get('#header .icons .all-menu img');
    let type = $header.className;
    if (type === 'type black' || type === 'type trans') {
        $logo.setAttribute(`src`, `images/common/Seavantage_logo_w270_w.png`);
        $user.setAttribute(`src`, `images/common/user_icon_w.png`);
        $allMenu.setAttribute(`src`, `images/common/all_menu_w.png`);
        $header.classList.remove('black');
    } else if (type === 'type white') {
        $logo.setAttribute(`src`, `images/common/Seavantage_logo_w270_b.png`);
        $user.setAttribute(`src`, `images/common/user_icon_b.png`);
        $allMenu.setAttribute(`src`, `images/common/all_menu_b.png`);
    }
};

const comInit = () => {
    const getPage = (page, tag) => {
        fetch(page)
            .then((res) => res.text())
            .then((res) => {
                get(tag).innerHTML = res;

                // 헤더 푸터 패치완료 후 함수 작성
                fheaderType();
                flink();
            });
    };
    getPage('page/header.html', '#header .type');
    getPage('page/footer.html', '#footer');
};

(() => {
    comInit();
})();
