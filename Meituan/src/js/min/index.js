"use strict";var myswiper=new Swiper(".swiper-container",{slidePerview:1,autoplay:!0,pagination:{el:".swiper-pagination",clickable:!0}});function init(){ajax({url:"/api/content",success:function(l){render(l.data)}})}function render(l){var n="";l.forEach(function(l){n+='<dl>\n                    <dt>\n                        <img src="images/'.concat(l.img,'">\n                    </dt>\n                    <dd>\n                        <p>').concat(l.title,"</p>\n                        <p>").concat(l.type,'</p>\n                        <p><span class="price">').concat(l.price,"</span> 门市价:<b>").concat(l.oldprice,'</b><span class="num">已售<b>').concat(l.num,"</b></span></p>\n                    </dd>\n                </dl>")}),$(".con3").append(n)}init();var Bscroll=new BScroll(".wrap",{click:!0,scrollbar:!0,probeType:2});function pullUp(){init()}function pullDown(){$(".con3").html(""),init()}Bscroll.on("scroll",function(){console.log(this.y,this.maxScrollY),this.y<this.maxScrollY-50?$("#pullUp").html("释放加载更多").addClass("flip"):this.y<this.maxScrollY-20?$("#pullUp").html("上拉加载").removeClass("flip"):50<this.y?$("#pullDown").html("释放刷新.....").addClass("flip"):20<this.y&&$("#pullDown").html("下拉刷新").removeClass("flip")}),Bscroll.on("scrollEnd",function(){$("#pullUp").hasClass("flip")?(pullUp(),$("#pullUp").html("上拉加载").removeClass("flip")):$("#pullDown").hasClass("flip")&&(pullDown(),$("#pullDown").html("下拉刷新").removeClass("flip"))});