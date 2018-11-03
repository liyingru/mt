var myswiper = new Swiper('.swiper-container', {
    slidePerview: 1,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
});
init();

function init() {
    ajax({
        url: '/api/content',
        success: function(data) {
            render(data.data);
        }
    })
}


//var con3 = document.querySelector('.con3');

function render(data) {
    var html = '';
    data.forEach(function(item) {
        html += `<dl>
                    <dt>
                        <img src="images/${item.img}">
                    </dt>
                    <dd>
                        <p>${item.title}</p>
                        <p>${item.type}</p>
                        <p><span class="price">${item.price}</span> 门市价:<b>${item.oldprice}</b><span class="num">已售<b>${item.num}</b></span></p>
                    </dd>
                </dl>`;
    });
    $('.con3').append(html);
}

var Bscroll = new BScroll('.wrap', {
    click: true,
    scrollbar: true,
    probeType: 2
});

Bscroll.on('scroll', function() {
    console.log(this.y, this.maxScrollY);
    if (this.y < this.maxScrollY - 50) {
        $('#pullUp').html('释放加载更多').addClass('flip');
    } else if (this.y < this.maxScrollY - 20) {
        $('#pullUp').html('上拉加载').removeClass('flip');
    } else if (this.y > 50) {
        $('#pullDown').html('释放刷新.....').addClass('flip');
    } else if (this.y > 20) {
        $('#pullDown').html('下拉刷新').removeClass('flip');
    }
});

Bscroll.on('scrollEnd', function() {
    if ($('#pullUp').hasClass('flip')) {
        pullUp();
        $('#pullUp').html('上拉加载').removeClass('flip');
    } else if ($('#pullDown').hasClass('flip')) {
        pullDown();
        $('#pullDown').html('下拉刷新').removeClass('flip');
    }
})

function pullUp() {
    init();
}

function pullDown() {
    $('.con3').html('');
    init();
}