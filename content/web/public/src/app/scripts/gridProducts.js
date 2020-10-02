if (window.jQuery)
    (function ($) {
        $.fn.GridProdukts = function (options) {
            return this.each(function () {
                var element = $(this);
                if (element.data("GridProdukts")) return;
                var myplugin = new GridProdukts(this, options);
                element.data("GridProdukts", myplugin);
                element.data().GridProdukts.methods.init();
            });
        };

        $.support.cors = true;

        var GridProdukts = function (target, options) {
            var component = {
                qname: "loadmore",
                pagination: "scroll", // scroll | noscroll paginado
                nPagination: 5,
                limit: 25,
                cat_id: 0,
                page: 1,
                type: "items",
                currentPage: 1,
                async: true,
                bottom_reached: 0,
                search: "",
                requests: 0,
                loadingHTML:
                    '<div id="loader-wrapper"> <div id="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>' +
                    '<div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>',
                remoteURL: api_base_url,
                methodURL: "",
                buttons: null,
                methods: {
                    init: function () {
                        if (options.pagination !== undefined) {
                            component.pagination = options.pagination;
                        }
                        if (options.nPagination !== undefined) {
                            component.nPagination = options.nPagination;
                        }
                        if (options.currentPage !== undefined) {
                            component.currentPage = options.currentPage;
                        }
                        if (options.remoteURI !== undefined) {
                            component.remoteURI = options.remoteURI;
                        }
                        if (options.limit !== undefined) {
                            component.limit = options.limit;
                        }
                        if (options.type !== undefined) {
                            component.type = options.type;
                        }
                        if (options.loadingHTML !== undefined) {
                            component.loadingHTML = options.loadingHTML;
                        }
                        if (options.cat_id !== undefined) {
                            component.cat_id = options.cat_id;
                        }
                        if (options.search !== undefined) {
                            component.search = options.search;
                        }
                        component.methodURL = `items/find?page=${component.page}&limit=${component.limit}`;
                        if (component.cat_id > 0) {
                            component.methodURL = `items/category/${component.cat_id}?page=${component.page}&limit=${component.limit}`;
                        }
                        $(target).after(component.loadingHTML);
                        component.methods.load_more();
                        if (component.pagination == "scroll") {
                            $(window).scroll(function () {
                                if (component.page > 1) {
                                    if (
                                        $(window).scrollTop() >=
                                        $(target).height() +
                                            $(target).offset().top -
                                            $(window).height()
                                    ) {
                                        if (component.bottom_reached == 0) {
                                            component.bottom_reached = 1;
                                            component.methodURL = `items/find?page=${component.page}&limit=${component.limit}`;
                                            if (component.cat_id > 0) {
                                                component.methodURL = `items/category/${component.cat_id}?page=${component.page}&limit=${component.limit}`;
                                            }
                                            component.methods.load_more(false);
                                        }
                                    }
                                }
                            });
                        }
                    },
                    search: function (opt) {
                        component.bottom_reached = 0;
                        component.page = 1;
                        if (opt.search !== undefined) {
                            component.search = opt.search;
                        }
                        component.methods.load_more(true);
                    },
                    load_more: function (force) {
                        force = force ? false : force;
                        component.page =
                            component.page === 0 ? 1 : component.page;
                        if (component.page === 1) {
                            $(target).html("");
                        }
                        if (force) {
                            $.ajaxq.clear(component.qname);
                        }
                        if (!$.ajaxq.isRunning(component.qname)) {
                            $.ajaxq(component.name, {
                                type: "GET",
                                beforeSend: function () {},
                                error: function (request, status, error) {
                                    console.log("err " + status);
                                    console.log(error);
                                    console.log(request.responseText);
                                },
                                xhrFields: {
                                    withCredentials: false,
                                },
                                crossDomain: true,
                                url: `${component.remoteURL}${component.methodURL}`,
                                success: function (responseData) {
                                    // $(target).parent().find('.pagination').remove();

                                    // $('.search input[type=text]').attr('disabled', false);
                                    // $('.search button').attr('disabled', false);
                                    // $(target).next('#loading-items').hide();
                                    component.requests++;
                                    var dataRequest = responseData.data;
                                    var items = dataRequest.data;
                                    if (items.length > 0) {
                                        if (component.pagination === "scroll") {
                                            $(target).data(
                                                "page",
                                                component.page + 1
                                            );
                                            component.page = component.page + 1;
                                        }
                                        for (var item in items) {
                                            var html = "",
                                                li_id = `item-${items[item].id}`,
                                                $article;
                                            let image_src = items[item].images.length > 1 ? items[item].images.map(img => {return img.src} )
                                                : ['/images/product/default-front.jpg', '/images/product/default-back.jpg'];
                                            if (component.type === "home") {
                                                $article = $("<div>", {
                                                    class: "p-3 itemContent",
                                                    "data-id": items[item].id,
                                                });
                                                html +=
                                                    '<div class="tt-product thumbprod-center">';
                                                html +=
                                                    '<div class="tt-image-box">';
                                                if (!items[item].external_purchase) {
                                                    html +=
                                                        '<a href="#" class="tt-btn-quickview" data-tooltip="Compra rápida" data-tposition="left"></a>';
                                                }
                                                html += `<a href="${host_url}view/${items[item].id}">`;
                                                html += `<span class="tt-img"><img src="${resourse_url}${image_src[0]}" alt=""></span>`;
                                                html += `<span class="tt-img-roll-over"><img src="${resourse_url}${image_src[1]}" alt=""></span>`;
                                                html +=
                                                    '<span class="tt-label-location">';
                                                html +=
                                                    '<span class="tt-label-sale">Nuevo</span>';
                                                html += "</span>";
                                                html += "</a>";
                                                html += "</div> ";
                                                html +=
                                                    '<div class="tt-description">';
                                                html += '<div class="tt-row">';
                                                // html +=     `<ul class="tt-add-info"><li><a href="#" tabindex="0">ENTRETENIMIENTO</a></li></ul>`;
                                                html +=     '<div class="tt-rating"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></div>';
                                                html += '</div>';
                                                html += `<h2 class="tt-title"><a href="${host_url}view/${items[item].id}">${items[item].name}</a></h2>`;
                                                // html += `<div class="tt-price">$${items[item].prices[0].label}</div>`;
                                                html +=
                                                    '<div class="tt-product-inside-hover">';
                                                html +=
                                                    '<div class="tt-row-btn">';
                                                if (!items[item].external_purchase) {
                                                    html +=
                                                        '<a href="#" class="tt-btn-addtocart thumbprod-button-bg" data-tooltip="Compra rápida">Comprar Ahora</a>';
                                                } else {
                                                    html +=
                                                        `<a href="${items[item].external_purchase}" target="_blank" class="tt-btn-addtocart external-purchase thumbprod-button-bg" data-tooltip="Comprar">Comprar</a>`;
                                                }
                                                html += "</div>";
                                                html +=
                                                    '<div class="tt-row-btn">';
                                                html +=
                                                    '<a href="#" class="tt-btn-quickview" ></a>';
                                                html +=
                                                    '<a href="#" class="tt-btn-wishlist"></a>';
                                                // html +=
                                                //     '<a href="#" class="tt-btn-compare"></a>';
                                                html += "</div>";
                                                html += "</div>";
                                                html += "</div>";
                                                html += "</div>";
                                            } else if (
                                                component.type === "items"
                                            ) {
                                                $article = $("<div>", {
                                                    class:
                                                        "col-6 col-md-4 tt-col-item",
                                                    "data-id": items[item].id,
                                                });

                                                html +=
                                                    '<div class="tt-product thumbprod-center">';
                                                html +=
                                                    '<div class="tt-image-box">';
                                                // html +=
                                                //     '<a href="#" class="tt-btn-quickview" data-tooltip="Compra rápida" data-tposition="left"></a>';
                                                html += `<a href="${host_url}view/${items[item].id}">`;
                                                html += `<span class="tt-img"><img src="${resourse_url}${image_src[0]}" alt=""></span>`;
                                                html += `<span class="tt-img-roll-over"><img src="${resourse_url}${image_src[1]}g" alt=""></span>`;
                                                html +=
                                                    '<span class="tt-label-location">';
                                                html +=
                                                    '<span class="tt-label-sale">Más vendido</span>';
                                                html += "</span>";
                                                html += "</a>";
                                                html += "</div>";
                                                html +=
                                                    '<div class="tt-description">';
                                                html += `<h2 class="tt-title"><a href="${host_url}view/${items[item].id}">${items[item].name}</a></h2>`;
                                                html += `<div class="tt-price">$${items[item].prices[0].label}</div>`;
                                                html +=
                                                    '<div class="tt-product-inside-hover">';
                                                html +=
                                                    '<div class="tt-row-btn">';
                                                if (!items[item].external_purchase) {
                                                    html +=
                                                        '<a href="#" class="tt-btn-addtocart thumbprod-button-bg" data-tooltip="Compra rápida">Comprar Ahora</a>';
                                                } else {
                                                    html +=
                                                        `<a href="${items[item].external_purchase}" target="_blank" class="tt-btn-addtocart external-purchase thumbprod-button-bg" data-tooltip="Comprar">Comprar</a>`;
                                                }
                                                html += "</div>";
                                                html +=
                                                    '<div class="tt-row-btn">';
                                                html +=
                                                    '<a href="#" class="tt-btn-quickview"></a>';
                                                html +=
                                                    '<a href="#" class="tt-btn-wishlist"></a>';
                                                // html +=
                                                //     '<a href="#" class="tt-btn-compare"></a>';
                                                html +=
                                                    "</div></div></div></div>";
                                            }

                                            if (component.onItemClick) {
                                                $article.on("click", function (
                                                    event
                                                ) {
                                                    event.stopPropagation();
                                                    component.onItemClick(
                                                        $(this).data()
                                                    );
                                                });
                                            }
                                            $article.attr("id", li_id);
                                            $article.html(html);

                                            $article
                                                .find(
                                                    ".tt-btn-quickview, .tt-btn-addtocart:not(.external-purchase)"
                                                )
                                                .on("click", function (e) {
                                                    e.preventDefault();
                                                    var id = $(this)
                                                        .closest(".itemContent")
                                                        .data("id");
                                                    openModalView(id);
                                                });

                                            if ($("#" + li_id).length < 1) {
                                                $article.appendTo(target);
                                            }
                                        }
                                    } else {
                                        if (component.page == 1) {
                                            if (
                                                $(target).find("#no-items")
                                                    .length < 1
                                            ) {
                                                $(target).append(
                                                    '<ins id="no-items">No se encontraron art&iacute;culos</ins>'
                                                );
                                            }
                                        } else if (component.page > 1) {
                                            component.bottom_reached = 1;
                                        }

                                        // $(target)
                                        //     .next("#loading-items")
                                        //     .removeClass("active");
                                        // component.page = -1;
                                    }
                                    var $grid = $(".tt-carousel-products");
                                    if (
                                        component.type === "home" &&
                                        $grid.length
                                    ) {
                                        $grid.each(function () {
                                            var slick = $(this),
                                                item = $(this).data("item");
                                            slick.slick({
                                                dots: true,
                                                arrows: true,
                                                infinite: true,
                                                speed: 300,
                                                slidesToShow: item || 4,
                                                slidesToScroll: item || 4,
                                                adaptiveHeight: true,
                                                responsive: [
                                                    {
                                                        breakpoint: 1025,
                                                        settings: {
                                                            slidesToShow: 3,
                                                            slidesToScroll: 3,
                                                        },
                                                    },
                                                    {
                                                        breakpoint: 791,
                                                        settings: {
                                                            slidesToShow: 2,
                                                            slidesToScroll: 2,
                                                        },
                                                    },
                                                ],
                                            });
                                        });
                                    }
                                    if (component.pagination != "scroll") {
                                        if (item.length > 0) {
                                            if (item[0].result_total_items) {
                                                var result_count =
                                                    item[0].result_total_items;
                                                var pagination = document.createElement(
                                                    "ul"
                                                );
                                                $(pagination).addClass(
                                                    "pagination"
                                                );

                                                var npages = Math.ceil(
                                                    result_count /
                                                        component.limit
                                                );
                                                if (npages > 1) {
                                                    var p = 1;
                                                    var lpage = npages;
                                                    if (
                                                        npages >
                                                        component.nPagination
                                                    ) {
                                                        lpage =
                                                            component.nPagination;
                                                        var l = document.createElement(
                                                            "li"
                                                        );
                                                        var a = document.createElement(
                                                            "a"
                                                        );
                                                        $(a).attr("href", "#");
                                                        $(a).data("page", 1);
                                                        $(a).html("&larr;");
                                                        $(l).append(a);
                                                        $(pagination).append(l);

                                                        if (
                                                            component.page > 3
                                                        ) {
                                                            p =
                                                                component.page -
                                                                2;
                                                            lpage =
                                                                p +
                                                                component.nPagination -
                                                                1;
                                                        }

                                                        if (
                                                            component.page +
                                                                2 >=
                                                            npages
                                                        ) {
                                                            lpage = npages;
                                                            p =
                                                                lpage -
                                                                (component.nPagination -
                                                                    1);
                                                        }

                                                        if (lpage > npages) {
                                                            lpage = npages;
                                                        }
                                                    }

                                                    for (; p <= lpage; p++) {
                                                        var l = document.createElement(
                                                            "li"
                                                        );
                                                        if (
                                                            p == component.page
                                                        ) {
                                                            $(l).addClass(
                                                                "active"
                                                            );
                                                        }
                                                        var a = document.createElement(
                                                            "a"
                                                        );
                                                        $(a).attr("href", "#");
                                                        $(a).data("page", p);
                                                        $(a).html(p);
                                                        $(l).append(a);
                                                        $(pagination).append(l);
                                                    }
                                                    if (
                                                        npages >
                                                        component.nPagination
                                                    ) {
                                                        var l = document.createElement(
                                                            "li"
                                                        );
                                                        var a = document.createElement(
                                                            "a"
                                                        );
                                                        $(a).attr("href", "#");
                                                        $(a).data(
                                                            "page",
                                                            npages
                                                        );
                                                        $(a).html("&rarr;");
                                                        $(l).append(a);
                                                        $(pagination).append(l);
                                                    }
                                                }

                                                $(pagination)
                                                    .find("li>a")
                                                    .each(function (i, e) {
                                                        if (
                                                            !$(e)
                                                                .parent("li")
                                                                .hasClass(
                                                                    "active"
                                                                )
                                                        ) {
                                                            $(e).click(
                                                                function () {
                                                                    $(
                                                                        target
                                                                    ).html("");
                                                                    component.page = $(
                                                                        this
                                                                    ).data().page;
                                                                    component.methods.load_more(
                                                                        true
                                                                    );
                                                                    $(target)
                                                                        .parent()
                                                                        .find(
                                                                            ".pagination"
                                                                        )
                                                                        .remove();
                                                                }
                                                            );
                                                        }
                                                    });

                                                $(target).after(pagination);
                                            }
                                        }
                                    }
                                },
                            });
                        }
                    },
                },
            };
            return component;
        };
    })(jQuery);
