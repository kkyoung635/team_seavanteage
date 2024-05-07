const fRecruitDark = () => {
    const $body = get('body');
    const $recruitHeader = get('#header div');
    const $recruitVis = get('#subVisual');
    const $recruitCircle = get('.cowork .irdiagram .circular .circle ');
    const $recruitMain = get('.cowork');
    let tema = true;
    setTimeout(() => {
        $body.classList.add('dark');
        $body.style.transition = `0.4s`;
        $recruitVis.classList.add('dark');
        $recruitVis.style.transition = `0.4s`;
        $recruitMain.classList.add('dark');
        $recruitMain.style.transition = `0.4s`;
    }, 1000);

    $recruitCircle.addEventListener('click', (e) => {
        if (tema) {
            $body.classList.remove('dark');
            $recruitVis.classList.remove('dark');
            $recruitMain.classList.remove('dark');
            tema = false;
        } else {
            $body.classList.add('dark');
            $recruitVis.classList.add('dark');
            $recruitMain.classList.add('dark');

            tema = true;
        }
    });
    // setTimeout(() => {
    //     // $recruitHeader.classList.remove('black');
    //     // $recruitHeader.classList.add('white');
    //     $recruitVis.classList.add('dark');
    //     $recruitVis.style.transition = `0.4s`;
    //     $recruitMain.classList.add('dark');
    //     $recruitMain.style.transition = `0.4s`;
    // }, 1000);

    // $recruitCircle.addEventListener('click', (e) => {
    //     if (tema) {
    //         // $recruitHeader.classList.remove('white');
    //         // $recruitHeader.classList.add('black');
    //         $recruitVis.classList.remove('dark');
    //         $recruitMain.classList.remove('dark');
    //         tema = false;
    //     } else {
    //         // $recruitHeader.classList.add('white');
    //         // $recruitHeader.classList.remove('black');
    //         $recruitVis.classList.add('dark');
    //         $recruitMain.classList.add('dark');

    //         tema = true;
    //     }
    // });
};

const fcardClick = () => {
    const $slides = getAll('.cowork .ir-view .irlist .cards .swiper-slide');
    const $paging = getAll('.swiper-pagination-bullet');
    let current = 0,
        old = 0;

    // console.log($paging);
    $slides[current].classList.add('on');
    $slides.forEach((slides, idx) => {
        current = idx;
        slides.addEventListener('click', (e) => {
            $slides.forEach((slide) => {
                slide.classList.remove('on');
            });
            e.currentTarget.classList.add('on');
            old = current;
        });
    });
};

fRecruitDark();
// fcardClick();
