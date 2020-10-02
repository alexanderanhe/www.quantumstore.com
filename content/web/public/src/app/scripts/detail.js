$(function () {
    (function () {
        function getDetail() {
            $.get(
                api_base_url + "items/" + item_id,
                {},
                {
                    "Content-Type": "application/json",
                }
            )
                .done(function (data) {
                    $target = $(".detail");
                    var item = data.data;
                    let image_src = item.images.length > 1 ? item.images.map(img => {return img.src} )
                        : ['/images/product/default-front.jpg', '/images/product/default-back.jpg'];
                    let disabled_add_btn = "";
                    let price_description = '';
                    let purchase_desc = '';

                    var $mobileImages = $(".tt-mobile-product-detail-slider");

                    var $detailPart = $("<div>", {
                            class: "col-6 hidden-xs",
                        }),
                        $detailSecond = $("<div>", {
                            class: "col-6",
                        }),
                        htmlDetailContent = "",
                        htmlDetailImg = "";
                    htmlDetailImg += '<div class="tt-product-vertical-layout">';
                    htmlDetailImg += '<div class="tt-product-single-img">';
                    htmlDetailImg += "<div>";
                    htmlDetailImg +=
                        '<button class="tt-btn-zomm tt-top-right"><i class="icon-h-06"></i></button>';
                    htmlDetailImg += `<img class="zoom-product" src='${resourse_url}${image_src[0]}' data-zoom-image="${resourse_url}${image_src[0]}" alt="">`;
                    htmlDetailImg += "</div>";
                    htmlDetailImg += "</div>";
                    htmlDetailImg +=
                        '<div class="tt-product-single-carousel-vertical">';
                    htmlDetailImg +=
                        '<ul id="smallGallery" class="tt-slick-button-vertical  slick-animated-show-js">';
                    for (var img in image_src) {
                        var zoomGalleryActive = !img ? 'zoomGalleryActive' : '';
                        htmlDetailImg += `<li><a class="${zoomGalleryActive}" href="#" data-image="${resourse_url}${image_src[img]}" data-zoom-image="${resourse_url}${image_src[img]}"><img src="${resourse_url}${image_src[img]}" alt=""></a></li>`;
                        $mobileImages.append(
                            $('<div></div>').append($('<img>', {
                                src: `${resourse_url}${image_src[img]}`,
                                alt: `${item.name}`
                            }))
                        );
                    }
                    htmlDetailImg += "</ul>";
                    htmlDetailImg += "</div>";
                    htmlDetailImg += "</div>";
                    $detailPart.append(htmlDetailImg);

                    htmlDetailContent += '<div class="tt-product-single-info">';
                    htmlDetailContent += `<h1 class="tt-title">${item.name}</h1>`;
                    htmlDetailContent += '<div class="tt-price">';
                    htmlDetailContent += "</div>";
                    htmlDetailContent += '<div class="tt-wrapper">';
                    htmlDetailContent += "</div>";
                    htmlDetailContent += '<div class="tt-wrapper">';
                    htmlDetailContent +=
                        '<div class="tt-title-options">SELECCIONA:</div>';
                    htmlDetailContent +=
                        '<ul class="tt-options-swatch options-large">';
                    for (var price in item.prices) {
                        var active = !parseInt(price) ? "active" : "";
                        price_description = active && item.prices[price].description ? item.prices[price].description : price_description;
                        htmlDetailContent += `<li class="price_p ${active}" data-price="${item.prices[price].price}" data-has_options="${item.prices[price].purchase_options.length}" data-description="${item.prices[price].description}"><a href="#">${item.prices[price].label} <br/>$${item.prices[price].price}</a></li>`;
                    }
                    htmlDetailContent += "</ul>";

                    if (item.prices.filter(price => price.purchase_options.length).length) {

                        htmlDetailContent +=
                            '<div class="tt-title-options mt-3 mb-2">OPCIONES DE COMPRA:</div>';
                        htmlDetailContent +=
                            '<ul class="tt-options-swatch options-large">';
                        for (var price in item.prices) {
                            var hidden = parseInt(price) ? "hidden" : "";
                            for (var option in item.prices[price].purchase_options) {
                                var active = !parseInt(price) && !parseInt(option) ? "active" : "";
                                purchase_desc = active ? `<p>${item.prices[price].purchase_options[option].description}</p>` : purchase_desc;
                                htmlDetailContent += `<li class="purchase_option_p ${active} ${hidden}" data-price="${item.prices[price].price}" data-option="${item.prices[price].purchase_options[option].sku}" data-description="${item.prices[price].purchase_options[option].description}"><a href="#">${item.prices[price].purchase_options[option].label}</a></li>`;
                            }
                        }
                        htmlDetailContent += "</ul>";
                    }
                    htmlDetailContent += "</div>";
                    htmlDetailContent += '<div class="tt-wrapper">';
                    htmlDetailContent +=
                        '<div class="tt-row-custom-01 tt-responsive-lg">';
                    if (!item.external_purchase) {
                        htmlDetailContent += '<div class="col-item">';
                        htmlDetailContent +=
                            '<div class="tt-input-counter style-01">';
                        htmlDetailContent += '<span class="minus-btn"></span>';
                        htmlDetailContent +=
                            '<input type="text" value="1" size="50" class="quanty">';
                        htmlDetailContent += '<span class="plus-btn"></span>';
                        htmlDetailContent += "</div>";
                        htmlDetailContent += "</div>";
                    }
                    htmlDetailContent += '<div class="col-item btn-add-button">';
                    if (!item.external_purchase) {
                        htmlDetailContent += `<a href="#" class="btn btn-lg ${disabled_add_btn}" data-id="${item.id}" id="add-button"><i class="icon-g-46"></i>AGREGAR A CARRITO</a>`;
                    } else {
                        htmlDetailContent += `<a href="${item.external_purchase}" target="_blank" class="btn btn-lg"><i class="icon-g-46"></i>COMPRAR</a>`;
                    }
                    htmlDetailContent += "</div>";
                    htmlDetailContent += "</div>";
                    htmlDetailContent += "</div>";

                    htmlDetailContent += '<div class="tt-collapse-block">';

                    if (item.description) {
                        htmlDetailContent += '<div class="tt-item active" id="item-description">';
                        htmlDetailContent +=
                            `<div class="tt-collapse-title">${item.name}</div>`;
                        htmlDetailContent += '<div class="tt-collapse-content" style="display: block;">';
                        htmlDetailContent += `<p>${item.description}</p>`;
                        htmlDetailContent += "</div>";
                        htmlDetailContent += "</div>";
                    }
                    const show_price_desc = !price_description ? "hidden" : "";
                    htmlDetailContent += `<div class="tt-item active ${show_price_desc}" id="price-description">`;
                    htmlDetailContent += `<div class="tt-collapse-title">INFORMACIÓN</div>`;
                    htmlDetailContent += '<div class="tt-collapse-content" style="display: block;">';
                    htmlDetailContent += `<p>${price_description}</p>`;
                    htmlDetailContent += "</div>";
                    htmlDetailContent += "</div>";

                    let hidden_purchase_desc = purchase_desc ? '' : 'hidden';
                    htmlDetailContent += `<div class="tt-item active ${hidden_purchase_desc}" id="purchase-description">`;
                    htmlDetailContent += `<div class="tt-collapse-title">DETALLE DEL PRODUCTO</div>`;
                    htmlDetailContent += `<div class="tt-collapse-content" style="display: block;">${purchase_desc}</div>`;
                    htmlDetailContent += "</div>";

                    htmlDetailContent += "</div>";
                    htmlDetailContent += "</div>";
                    $detailSecond.append(htmlDetailContent);

                    $target.append($detailPart);
                    $target.append($detailSecond);
                    $ttOptionsSwatch = $target.find(".tt-options-swatch");
                    $ttInputCounter = $target.find(".tt-input-counter");

                    if ($ttOptionsSwatch.length) {
                        initSwatch($ttOptionsSwatch);
                    }

                    if ($ttInputCounter.length) {
                        ttInputCounter($ttInputCounter);
                    }
                    ttProductSingleBtnZomm();
                    elevateZoomWidget.thumb_parent = $target.find(
                        "#smallGallery"
                    );
                    elevateZoomWidget.init();

                    $mobileImages.slick({
                        dots: false,
                        arrows: true,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        adaptiveHeight: true,
                        lazyLoad: "progressive",
                    });

                    $target.find("#add-button").on("click", function (e) {
                        e.preventDefault();
                        var id = $(this).data("id");
                        var quanty = $(".quanty").val();
                        quanty = parseInt(quanty);
                        quanty = isNaN(quanty) ? 1 : quanty;
                        var $price = $(".tt-options-swatch").find(".price_p.active");
                        var $options = $(".tt-options-swatch").find(".purchase_option_p.active");
                        var price = 0;
                        var purchase_option = '';
                        var has_options = false;
                        if ($price.length) {
                            price = parseFloat($price.data("price"));
                            has_options = !!$price.data("has_options");
                        }
                        if ($options.length) {
                            purchase_option = $options.data("option");
                        }
                        if (!price) {
                            $('.price_p').addClass('rounded border border-danger');
                            swal("¡Ups!", "El precio es requerido");
                            return false;
                        } else if (has_options && !purchase_option) {
                            $('.purchase_option_p').addClass('rounded border border-danger');
                            swal("¡Ups!", "Debes de seleccionar al menos una opción de compra");
                            return false;
                        } else if (!quanty) {
                            $('.tt-input-counter').addClass('rounded border border-danger');
                            swal("¡Ups!", "La cantidad es requerida");
                            return false;
                        } else {
                            addToShoppingCart(id, quanty, price, purchase_option);
                            $(".quanty").val(1);
                            $('.tt-input-counter, .price_p').removeClass('rounded border border-danger');
                            if (!$('.tt-cart').hasClass('active')) {
                                $('.tt-cart').addClass('active').find('.tt-dropdown-menu').show();
                            }
                            $('.price_p.active').removeClass('active');
                        }
                    });
                })
                .fail(function (error) {
                    console.log(error);
                });
        }
        window.getDetail = getDetail;

        //ttOptionsSwatch
        function initSwatch($obj) {
            $obj.each(function () {
                var $this = $(this),
                    jsChangeImg = $this.hasClass("js-change-img"),
                    optionsColorImg = $this.find(".options-color-img");

                $this.on("click", "li", function (e) {
                    var $this = $(this);
                    if (!$this.hasClass('active')) {
                        $obj.find('li').removeClass('rounded border border-danger');
                        $this.addClass("active").siblings().removeClass("active");
                        if (jsChangeImg) {
                            addImg($this);
                        }
                        const desc = unescape($this.data('description'));
                        if ($this.hasClass('price_p')) {
                            $obj.find('li.purchase_option_p').removeClass("active");
                            $obj.find(`li.purchase_option_p[data-price="${$this.data('price')}"]`).removeClass("hidden");
                            $obj.find(`li.purchase_option_p[data-price!="${$this.data('price')}"]`).addClass("hidden");
                            $('#purchase-description').addClass('hidden').removeClass('active');
                            if (desc) {
                                $('#price-description').removeClass('hidden').addClass('active').find('.tt-collapse-content').html($('<p></p>').html(desc)).show();
                            } else {
                                $('#price-description').addClass('hidden').removeClass('active');
                            }
                        } else if ($this.hasClass('purchase_option_p')) {
                            if (desc) {
                                $('#purchase-description').removeClass('hidden').addClass('active').find('.tt-collapse-content').html($('<p></p>').html(desc)).show();
                            } else {
                                $('#purchase-description').addClass('hidden').removeClass('active');
                            }
                        }
                    }
                    return false;
                });
                if (optionsColorImg.length) {
                    addBg(optionsColorImg);
                }
            });
        }

        window.initSwatch = initSwatch;

        function ttInputCounter($obj) {
            $obj.find(".minus-btn, .plus-btn").on("click", function (e) {
                var $input = $(this).parent().find("input");
                var count =
                    parseInt($input.val(), 10) +
                    parseInt(
                        e.currentTarget.className === "plus-btn" ? 1 : -1,
                        10
                    );
                $input.val(count).change();
            });
            $obj.find("input")
                .change(function () {
                    var _ = $(this);
                    var min = 1;
                    var val = parseInt(_.val(), 10);
                    var max = parseInt(_.attr("size"), 10);
                    val = Math.min(val, max);
                    val = Math.max(val, min);
                    _.val(val);
                })
                .on("keypress", function (e) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                    }
                });
        }

        window.ttInputCounter = ttInputCounter;
    })();
});
