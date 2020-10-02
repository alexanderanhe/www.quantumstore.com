var fingerprint2,
    options = {};

Fingerprint2.get(options, function (components) {
    var values = components.map(function (component) {
        return component.value;
    });
    fingerprint2 = Fingerprint2.x64hash128(values.join(""), 31);
});

$(function () {
    (function () {
        function doLogin(username, password) {
            $.post(
                api_base_url + "users/oauth/login",
                { username, password },
                {
                    "Content-Type": "application/json",
                },
                "json"
            )
                .done(function (data) {
                    var userData = data.data;
                    var jwt = userData.oauth.token;
                    setCookie("jwt", jwt, 1);
                    createCustomerId(
                        userData.name,
                        userData.lastName,
                        userData.email,
                        jwt
                    );
                })
                .fail(function (error) {
                    console.log(error);
                    $(".error_login").show();
                    $(".error_login").html("Usuario y contraseña incorrectas");
                });
        }
        window.doLogin = doLogin;

        function doRegister(user) {
            $.post(
                api_base_url + "users/oauth/register",
                user,
                {
                    "Content-Type": "application/json",
                },
                "json"
            )
                .done(function (data) {
                    var userData = data.data;
                    var jwt = userData.oauth.token;
                    setCookie("jwt", jwt, 1);
                    createCustomerId(
                        userData.name,
                        userData.lastName,
                        userData.email,
                        jwt
                    );
                })
                .fail(function (error) {
                    if (grecaptcha) grecaptcha.reset();
                    $(".error_register").show();
                    $(".error_register").html(error.responseJSON.message);
                });
        }
        window.doRegister = doRegister;
        
        function doVerify(token) {
            $.get(
                api_base_url + "users/oauth/verify",
                { token },
                {
                    "Content-Type": "application/json",
                },
                "json"
            )
                .done(function (data) {
                    var userData = data.data;
                    var jwt = userData.oauth.token;
                    setCookie("jwt", jwt, 1);
                    createCustomerId(
                        userData.name,
                        userData.lastName,
                        userData.email,
                        jwt
                    );
                })
                .fail(function (error) {
                    if (grecaptcha) grecaptcha.reset();
                    $(".error_verify").show();
                    $(".error_verify").html(error.responseJSON.message);
                });
        }
        window.doVerify = doVerify;

        function getFingerPrint() {
            var fingerprint = localStorage.getItem("fingerprint");
            if (!fingerprint || fingerprint === "undefined") {
                fingerprint = fingerprint2;
                localStorage.setItem("fingerprint", fingerprint);
            }
            return fingerprint;
        }
        window.getFingerPrint = getFingerPrint;

        function getShoppingCart() {
            var fingerPrint = getFingerPrint();
            var idUser = user_data.id || 0;

            $.get(
                api_base_url + "shopping/find",
                { idUser, fingerPrint },
                {
                    "Content-Type": "application/json",
                }
            )
                .done(function (data) {
                    var shoppingCart = data.data;
                    updateShoppingCart(shoppingCart);
                    if (this_page === "cart") {
                        getCartPage(shoppingCart);
                    }
                })
                .fail(function (error) {
                    if (this_page === "cart") {
                        getCartPage([]);
                        updateShoppingCart([]);
                    }
                });
        }
        window.getShoppingCart = getShoppingCart;

        function getOrders() {
          var jwt = getCookie("jwt");

          $.ajax({
            url: `${api_base_url}users/orders/find`,
            type: "get",
            dataType: "json",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            data: {
              orderId: order_id
            },
            success: function (data) {
              createOrderDetail(data.data);
            },
            error: function (error) {
              console.error(error);
            }
        });
      }
      window.getOrders = getOrders;

        function setShoppingCart() {
            var fingerPrint = getFingerPrint(),
                idUser = user_data.id || 0,
                jwt = getCookie("jwt");
            $.ajax({
                url: `${api_base_url}shopping/set`,
                type: "post",
                dataType: "json",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    idUser,
                    fingerPrint,
                }),
                success: function (data) {
                    getShoppingCart();
                },
                error: function (error) {
                    getShoppingCart();
                    console.log(error);
                },
            });
        }
        window.setShoppingCart = setShoppingCart;

        function addToShoppingCart(idItem, amount, price, purchase_option) {
            var fingerPrint = getFingerPrint();
            var idUser = user_data.id || 0;

            $.post(
                api_base_url + "shopping/add",
                {
                    idUser,
                    fingerPrint,
                    idItem,
                    amount,
                    price,
                    purchase_option
                },
                {
                    "Content-Type": "application/json",
                },
                "json"
            )
                .done(function (data) {
                    var shoppingCart = data.data;
                    updateShoppingCart(shoppingCart);
                })
                .fail(function (error) {
                    console.log(error);
                });
        }
        window.addToShoppingCart = addToShoppingCart;

        function createCustomerId(name, lastName, email, jwt) {
            $.ajax({
                url: `${api_base_url}users/customers/create`,
                type: "post",
                dataType: "json",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    name,
                    lastName,
                    email,
                }),
                success: function (_data) {
                    console.log("User Created");
                    if (redirect_page) {
                        window.location.replace(redirect_page);
                    } else {
                        window.location.href = host_url;
                    }
                },
                error: function (error) {
                    console.log(error);
                    if (redirect_page) {
                        window.location.replace(redirect_page);
                    } else {
                        window.location.href = host_url;
                    }
                },
            });
        }
        window.createCustomerId = createCustomerId;

        function createCard(
            holderName,
            cardNumber,
            expiredYear,
            expiredMonth,
            cvv,
            deviceSesionId,
            socialName,
            rfc
        ) {
            var jwt = getCookie("jwt");
            $('.process-request').show();
            $('#buyForm fieldset').prop('disabled', true);
            $.ajax({
                url: `${api_base_url}users/cards/create`,
                type: "post",
                dataType: "json",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    holderName,
                    cardNumber,
                    expiredYear,
                    expiredMonth,
                    cvv,
                    deviceSesionId,
                }),
                success: function (data) {
                    console.log(data.data.id);
                    const cardData = data.data;
                    createOrder(rfc, socialName, cardData.id, deviceSesionId);
                },
                error: function (error) {
                  $('.process-request').hide();
                    $('#buyForm fieldset').prop('disabled', false);
                    console.log(error);
                },
            });
        }
        window.createCard = createCard;

        function createOrder(rfc, social, cardId, deviceSesionId) {
            var jwt = getCookie("jwt");
            var fingerprint = localStorage.getItem("fingerprint");
            $.ajax({
                url: `${api_base_url}orders/create`,
                type: "post",
                dataType: "json",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    rfc,
                    social,
                    cardId,
                    fingerprint,
                    deviceSesionId,
                }),
                success: function (data) {
                  $('.process-request').hide();
                  $('#buyForm fieldset').prop('disabled', false);
                  window.location.href = host_url + "order/" + data.data.id;
                },
                error: function (error) {
                  swal("Error procesar tu pago!", error.responseJSON.message, "error");
                  $('.process-request').hide();
                  $('#buyForm fieldset').prop('disabled', false);
                  console.error(error);
                }
            });
        }
        window.createOrder = createOrder;

        function updateShoppingCart(shoppingCart) {
            $(".tt-cart-empty").show();
            $(".tt-badge-cart").hide();
            var $content = $(".tt-cart-content");
            if ($content.length) {
                $content.hide();
                $content.html("");
            } else {
                $content = $("<div>", {
                    class: "tt-cart-content",
                });
            }
            var items = shoppingCart.data.items;
            if (items.length) {
                var $list = $("<div>", {
                        class: "tt-cart-list",
                    }),
                    htmlContent = "";
                for (var item in items) {
                    const imgThumb = items[item].imgThumbnail ? items[item].imgThumbnail : '/images/product/default-thumb.jpg';
                    const purchase_opt_label = items[item].purchaseOptions ? ` (${items[item].purchaseOptions})` : '';
                    var html = "",
                        $article = $("<div>", {
                            class: "tt-item",
                        });
                    html += `<a href="${host_url}view">`;
                    html += '<div class="tt-item-img">';
                    html += `<img src="${resourse_url}${imgThumb}"  alt="Imagen Item">`;
                    html += "</div>";
                    html += '<div class="tt-item-descriptions">';
                    html += `<h2 class="tt-title"><b>${items[item].name} - ${items[item].priceLabel}</b>${purchase_opt_label}</h2>`;
                    html += `<div class="tt-quantity">${items[item].amount}</div>`;
                    html += `<div class="tt-price">X$${items[item].price}</div>`;
                    html += "</div>";
                    html += "</a>";
                    html += '<div class="tt-item-close">';
                    html += `<a href="#" class="tt-btn-close deleteItemCart" data-id="${items[item].id}" onclick="deleteItem(event)"></a>`;
                    html += "</div>";
                    $article.html(html);
                    $article.appendTo($list);
                }
                $list.appendTo($content);
                htmlContent += '<div class="tt-cart-total-row">';
                htmlContent +=
                    '<div class="tt-cart-total-title">SUBTOTAL:</div>';
                htmlContent += `<div class="tt-cart-total-price">$${shoppingCart.total}</div>`;
                htmlContent += "</div>";
                htmlContent += '<div class="tt-cart-btn">';
                htmlContent += '<div class="tt-item">';
                htmlContent += `<a href="${host_url}cart" class="btn">FINALIZAR COMPRA</a>`;
                htmlContent += "</div>";
                htmlContent += '<div class="tt-item">';
                htmlContent += `<a href="${host_url}" class="btn-link-02 tt-hidden-mobile">Seguir comprando</a>`;
                htmlContent += `<a href="${host_url}" class="btn btn-border tt-hidden-desctope">SEGUIR COMPRANDO</a>`;
                htmlContent += "</div>";
                htmlContent += "</div>";
                $content.append(htmlContent);
                $content.show();
                $(".tt-cart-layout").append($content);
                $(".tt-cart-empty").hide();
                $(".tt-badge-cart").html(shoppingCart.data.items.length);
                $(".tt-badge-cart").show();
            }
        }
        window.updateShoppingCart = updateShoppingCart;

        function deleteItemShoppingCart(idItem) {
            var fingerPrint = getFingerPrint();
            var idUser = user_data.id || 0;

            $.post(
                api_base_url + "shopping/delete",
                { idUser, fingerPrint, idItem },
                {
                    "Content-Type": "application/json",
                },
                "json"
            )
                .done(function (data) {
                    var shoppingCart = data.data;
                    updateShoppingCart(shoppingCart);
                    if (this_page === "cart") {
                        getCartPage(shoppingCart);
                    }
                })
                .fail(function (error) {
                    console.log(error);
                });
        }

        window.deleteItemShoppingCart = deleteItemShoppingCart;

        function deleteItem(e) {
            e.preventDefault();
            var idItem = $(".deleteItemCart").data("id");
            deleteItemShoppingCart(idItem);
        }
        window.deleteItem = deleteItem;

        function getCartPage(shoppingCart) {
            $target = $(".table-cart");
            $target.html("");
            var items = shoppingCart.data.items;
            $(".subtotalCart").html(`$${formatMoney(0)}`);
            $(".totalCart").html(`$${formatMoney(0)}`);
            if (items.length) {
              var i = 0;
              for (var item in items) {
                  var html = "",
                      li_id = `item-${i++}`,
                      $tr = $("<tr>"),
                      purchaseOptions = items[item].purchaseOptions ? `- ${items[item].purchaseOptions}` : '';
                  html += "<td>";
                  html += '<div class="tt-product-img">';
                  html += `<img src="${resourse_url}${items[item].imgThumbnail}" alt="img-pro">`;
                  html += "</div>";
                  html += "</td>";
                  html += "<td>";
                  html += '<h2 class="tt-title">';
                  html += `${items[item].name}`;
                  html += "</h2>";
                  html += '<ul class="tt-list-description">';
                  html += `<li>TIPO: ${items[item].priceLabel} ${purchaseOptions}</li>`;
                  html += `<li>MONTO: $${formatMoney(
                      items[item].price
                  )}</li>`;
                  html += "</ul>";
                  html += '<ul class="tt-list-parameters">';
                  html += "<li>";
                  html += '<div class="tt-price">';
                  html += `C/U: $${formatMoney(items[item].price)}`;
                  html += "</div>";
                  html += "</li>";
                  html += "<li>";
                  html += `<div class="detach-quantity-mobile"><div class="tt-input-counter style-01">${items[item].amount}</div></div>`;
                  html += "</li>";
                  html += "<li>";
                  html += `<div class="tt-price subtotal">SUBTOTAL: $${formatMoney(
                      items[item].total
                  )} </div>`;
                  html += "</li>";
                  html += "</ul>";
                  html += "</td>";
                  html += "<td>";
                  html += `<div class="tt-price"> C/U: $${formatMoney(
                      items[item].price
                  )}</div>`;
                  html += "</td>";
                  html += "<td>";
                  html += '<div class="detach-quantity-desctope">';
                  html += `<div class="tt-input-counter style-01">${items[item].amount}</div>`;
                  html += "</div>";
                  html += "</td>";
                  html += "<td>";
                  html += `<div class="tt-price subtotal"> SUBTOTAL: $${formatMoney(
                      items[item].total
                  )}</div>`;
                  html += "</td>";
                  html += "<td>";
                  html +=
                      '<a href="#" class="tt-btn-close deleteItemCart" data-id="${items[item].id}" onclick="deleteItem(event)" ></a>';
                  html += "</td>";

                  $tr.attr("id", li_id);
                  $tr.html(html);

                  if ($("#" + li_id).length < 1) {
                      $tr.appendTo($target);
                  }
                }
                $(".subtotalCart").html(`$${formatMoney(shoppingCart.total)}`);
                $(".totalCart").html(`$${formatMoney(shoppingCart.total)}`);
            }
        }
        window.getCartPage = getCartPage;

        function openModalView(itemId) {
            $.get(
                api_base_url + "items/" + itemId,
                {},
                {
                    "Content-Type": "application/json",
                }
            )
                .done(function (data) {
                    $target = $(".addToModal");
                    $target.html("");
                    var item = data.data,
                        $imagePart = $("<div>", {
                            class: "col-12 col-md-5 col-lg-6",
                        }),
                        $detailPart = $("<div>", {
                            class: "col-12 col-md-7 col-lg-6",
                        }),
                        htmlImagepart = "",
                        htmlDetailPart = "";
                    var image_src =
                        item.images.length > 1
                            ? item.images.map((img) => {
                                  return img.src;
                              })
                            : [
                                  "/images/product/default-front.jpg",
                                  "/images/product/default-back.jpg",
                              ];
                    let price_description = '';
                    let purchase_desc = '';
                    htmlImagepart +=
                        '<div class="tt-mobile-product-slider arrow-location-center">';
                    htmlImagepart += `<div><img src="${resourse_url}${image_src[0]}"  alt=""></div>`;
                    htmlImagepart += `<div><img src="${resourse_url}${image_src[1]}" alt=""></div>`;
                    htmlImagepart += "</div>";
                    $imagePart.append(htmlImagepart);

                    htmlDetailPart += '<div class="tt-product-single-info">';
                    htmlDetailPart += `<h2 class="tt-title">${item.name}</h2>`;
                    htmlDetailPart += '<div class="tt-wrapper">';
                    htmlDetailPart += '<form class="form-default">';
                    htmlDetailPart +=
                        '<div class="tt-title-options">SELECCIONA</div>';
                    htmlDetailPart += '<div class="form-group">';
                    htmlDetailPart +=
                        '<select class="form-control price-select">';
                    for (var price in item.prices) {
                        price_description = !price && item.prices[price].description ? item.prices[price].description : price_description;
                        htmlDetailPart += `<option value="${item.prices[price].price}" data-has_options="${item.prices[price].purchase_options.length}" data-description="${escape(item.prices[price].description)}">${item.prices[price].label} - $${item.prices[price].price}</option>`;
                    }
                    htmlDetailPart += "</select>";
                    htmlDetailPart += "</div>";

                    // Opciones de compra
                    if (item.prices.length) {
                        if (item.prices[0].purchase_options.length) {
                            htmlDetailPart +=
                                '<div class="tt-title-options">OPCIONES DE COMPRA</div>';
                            htmlDetailPart += '<div class="form-group">';
                            htmlDetailPart +=
                                '<select class="form-control purchase_option-select">';
                            for (var option in item.prices[0].purchase_options) {
                                purchase_desc = !option ? `<p>${item.prices[price].purchase_options[option].description}</p>` : purchase_desc;
                                htmlDetailPart += `<option value="${item.prices[0].purchase_options[option].sku}" data-description="${escape(item.prices[price].purchase_options[option].description)}">${item.prices[0].label}-${item.prices[0].purchase_options[option].sku}</option>`;
                            }
                            htmlDetailPart += "</select>";
                            htmlDetailPart += "</div>";
                        }
                    }
                    
                    htmlDetailPart += "</form>";
                    htmlDetailPart += "</div>";
                    htmlDetailPart += '<div class="tt-wrapper">';
                    htmlDetailPart += '<div class="tt-row-custom-01">';

                    htmlDetailPart += '<div class="col-item">';
                    htmlDetailPart += '<div class="tt-input-counter style-01">';
                    htmlDetailPart += '<span class="minus-btn"></span>';
                    htmlDetailPart +=
                        '<input type="text" value="1" size="500" class="quanty">';
                    htmlDetailPart += '<span class="plus-btn"></span>';
                    htmlDetailPart += "</div>";
                    htmlDetailPart += "</div>";
                    htmlDetailPart += '<div class="col-item">';
                    htmlDetailPart += `<a class="btn btn-lg" data-id="${item.id}" id="add-button"><i class="icon-f-39"></i>Comprar Ahora</a>`;
                    htmlDetailPart += "</div>";
                    htmlDetailPart += "</div>";
                    htmlDetailPart += "</div>";

                    // Descripciones
                    htmlDetailPart += '<div class="tt-collapse-block">';

                    if (item.description) {
                        htmlDetailPart += '<div class="tt-item active" id="modal-item-description">';
                        htmlDetailPart +=
                            `<div class="tt-collapse-title">${item.name}</div>`;
                        htmlDetailPart += '<div class="tt-collapse-content" style="display: block;">';
                        htmlDetailPart += `<p>${item.description}</p>`;
                        htmlDetailPart += "</div>";
                        htmlDetailPart += "</div>";
                    }
                    const show_price_desc = !price_description ? "hidden" : "";
                    htmlDetailPart += `<div class="tt-item active ${show_price_desc}" id="modal-price-description">`;
                    htmlDetailPart += `<div class="tt-collapse-title">INFORMACIÓN</div>`;
                    htmlDetailPart += '<div class="tt-collapse-content" style="display: block;">';
                    htmlDetailPart += `<p>${price_description}</p>`;
                    htmlDetailPart += "</div>";
                    htmlDetailPart += "</div>";

                    let hidden_purchase_desc = purchase_desc ? '' : 'hidden';
                    htmlDetailPart += `<div class="tt-item active ${hidden_purchase_desc}" id="modal-purchase-description">`;
                    htmlDetailPart += `<div class="tt-collapse-title">DETALLE DEL PRODUCTO</div>`;
                    htmlDetailPart += `<div class="tt-collapse-content" style="display: block;">${purchase_desc}</div>`;
                    htmlDetailPart += "</div>";

                    htmlDetailPart += "</div>";
                    // Termina Descripciones

                    htmlDetailPart += "</div>";
                    $detailPart.append(htmlDetailPart);

                    $target.append($imagePart);
                    $target.append($detailPart);
                    $("#ModalquickView").modal("show");

                    $target.find(".tt-mobile-product-slider").slick({
                        dots: false,
                        arrows: true,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        adaptiveHeight: true,
                        lazyLoad: "progressive",
                    });

                    $ttInputCounter = $target.find(".tt-input-counter");

                    if ($ttInputCounter.length) {
                        ttInputCounter($ttInputCounter);
                    }

                    $target.find("#add-button").on("click", function (e) {
                        e.preventDefault();
                        var id = $(this).data("id");
                        var quanty = $(".quanty").val();
                        quanty = parseInt(quanty);
                        quanty = isNaN(quanty) ? 1 : quanty;
                        var price = $(".price-select").val();
                        var purchase_option = $(".purchase_option-select").val();
                        price = parseFloat(price);
                        if (!price) {
                            $(".price_p").addClass(
                                "rounded border border-danger"
                            );
                            swal("¡Ups!", "El precio es requerido");
                            return false;
                        } else if (!quanty) {
                            $(".tt-input-counter").addClass(
                                "rounded border border-danger"
                            );
                            swal("¡Ups!", "La cantidad es requerida");
                            return false;
                        } else {
                            addToShoppingCart(id, quanty, price, purchase_option);
                            $(".tt-input-counter, .price_p").removeClass(
                                "rounded border border-danger"
                            );
                            $("#ModalquickView").modal("hide");
                            if (!$(".tt-cart").hasClass("active")) {
                                $(".tt-cart")
                                    .addClass("active")
                                    .find(".tt-dropdown-menu")
                                    .show();
                            }
                            $(".price_p.active").removeClass("active");
                        }
                    });

                    function putDescription(id, description) {
                        if (description) {
                            $(id).removeClass('hidden').addClass('active').find('.tt-collapse-content').html($('<p></p>').html(unescape(description))).show();
                        } else {
                            $(id).addClass('hidden').removeClass('active');
                        }
                    }

                    $target.find(".price-select, .purchase_option-select").on("change", function (e) {
                        var $this = $(this);
                        const $option = $this.children("option:selected");
                        const desc = $option.data('description');
                        if ($this.hasClass('price-select')) {
                            // Buscar purchase options
                            if ($option.data('has_options')) {
                                var price = parseFloat($option.val());
                                // console.log('init data', price, item.prices);
                                var price_obj = item.prices.filter(function(p) {
                                    return parseFloat(p.price) == price;
                                });
                                if (price_obj.length) {
                                    console.log('filter data', price_obj);
                                    $('select.purchase_option-select').find('option').remove();
                                    for (var o in price_obj[0].purchase_options) {
                                        const sku = price_obj[0].purchase_options[o].sku;
                                        $('select.purchase_option-select').append(
                                            $('<option></option>', {
                                                'data-description': escape( price_obj[0].purchase_options[o].description )
                                            }).val(sku).html(price_obj[0].label + '-' + sku).on('change', function(e) {
                                                putDescription('#modal-purchase-description', price_obj[0].purchase_options[o].description);
                                            })
                                        );
                                    }
                                }
                            }
                            $('#modal-purchase-description').addClass('hidden');
                            putDescription('#modal-price-description', desc);
                        } else if ($this.hasClass('purchase_option-select')) {
                            putDescription('#modal-purchase-description', desc);
                        }
                        return false;
                    });
                })
                .fail(function (error) {
                    console.log(error);
                });
        }
        window.openModalView = openModalView;

        function formatMoney(number, decPlaces, decSep, thouSep) {
            (decPlaces = isNaN((decPlaces = Math.abs(decPlaces)))
                ? 2
                : decPlaces),
                (decSep = typeof decSep === "undefined" ? "." : decSep);
            thouSep = typeof thouSep === "undefined" ? "," : thouSep;
            var sign = number < 0 ? "-" : "";
            var i = String(
                parseInt(
                    (number = Math.abs(Number(number) || 0).toFixed(decPlaces))
                )
            );
            var j = (j = i.length) > 3 ? j % 3 : 0;

            return (
                sign +
                (j ? i.substr(0, j) + thouSep : "") +
                i
                    .substr(j)
                    .replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
                (decPlaces
                    ? decSep +
                      Math.abs(number - i)
                          .toFixed(decPlaces)
                          .slice(2)
                    : "")
            );
        }
        window.formatMoney = formatMoney;

        function createOrderDetail(order) {
          $target = $(".orderDetail");
          $target.html("").append(
            $('<h5></h5>', { class: 'text-left mt-5' }).html(`${order.social} <small>${order.rfc}</small>`)
          );

          if (order.status === 'payed') {
            $('#icon-process').addClass('icon-g-82');
            $('#header-process').html('¡Tu orden está completa!');
            $('#text-process').html('¡Gracias por tu orden! Tu orden está siendo procesada y estará lista en 3-6 horas. Recibirás un correo de confirmación cuando tu orden este completa.');
          } else {
            $('#icon-process').addClass('icon-g-80');
            $('#header-process').html('Hubo un error en tu orden de compra');
          }

          let html = '';
          for (var i in order.shoppingCart.data.items) {
            const item = 
            html += '<tbody>';
            html += '<th class="text-left row">';
            html += '<div class="col-auto">';
            html += `<img class="mr-2" src="${resourse_url}${order.shoppingCart.data.items[i].imgThumbnail}">`;
            html += '</div>';
            html += '<div class="col">';
            html += `${order.shoppingCart.data.items[i].name} <br/><small class="text-muted">${order.shoppingCart.data.items[i].priceLabel} x ${order.shoppingCart.data.items[i].amount}</small>`;
            html += '</div>';
            html += `</th><td>$${order.shoppingCart.data.items[i].total}</td>`;
            html += '</tbody>';
          }
          $target.append(html);
          
          $target.append(
            $('<tfoot></tfoot>').append(
              $('<tr></tr>')
              .append($('<th></th>').html("TOTAL"))
              .append($('<td></td>').html('$' + order.total))
            )
          );
        }
        window.createOrderDetail = createOrderDetail;

        function getDownloadRewards() {

          const init = function(site) {
            const token_label = ['s', site.slug, "token"].join(':');
            const user_label = ['s', site.slug, "user"].join(':');
            const pathname = window.location.pathname,
                home = '/';
  
            const getToken = function() {
              return localStorage.getItem(token_label);
            },
            getUser = function() {
                var user = localStorage.getItem(user_label);
                return user ? JSON.parse(user) : false;
            },
            logout = function() {
                localStorage.removeItem(token_label);
                localStorage.removeItem(user_label);
                window.location.href = home;
            },
            errorAlerts = function(error) {
              if (error) {
                  if (error.error) {
                      if (typeof error.error === 'string') {
                          if (error.error.indexOf('Invalid API key') >= 0) {
                              invalidApiKey(error.error);
                          } else {
                              swal({
                                  title: "Error!",
                                  text: error.error,
                                  icon: "error"
                              });
                          }
                      } else {
                          swal({
                              title: "Error!",
                              text: [error.error.error_code,
                                  error.error.description
                              ].join(':'),
                              icon: "error"
                          });
                      }
                  }
              }
            },
            invalidApiKey = function(error) {
                swal({
                    title: "Atención!",
                    text: 'Su session a finalizado, por favor intente nuevamente [' + error + ']',
                    icon: "info"
                }).then(() => {
                    logout();
                });
            },
            descargar = function(callback) {
              var token = getToken();
              if (token) {
                $.ajax({
                  url: [API_QREWARDS_URL, 'sites', site.slug, 'download?site_webservice=1'].join('/'),
                  method: 'GET',
                  headers: {
                    'X-API-KEY': token
                    }
                  })
                    .done(function(data) {
                        var req = data.data;
                        if (req) {
                          callback(req);
                        } else {
                            swal({
                                title: "Algo está mal!",
                                icon: "error"
                            });
                        }
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        if (jqXHR.responseJSON.error) {
                            if (typeof jqXHR.responseJSON.error.error_code === 'undefined') {
                                invalidApiKey(jqXHR.responseJSON.error);
                            } else if (jqXHR.responseJSON.error.error_code < 2000) {
                                swal({
                                    title: "Error!",
                                    text: [jqXHR.responseJSON.error.error_code,
                                        jqXHR.responseJSON.error.description
                                    ].join(':'),
                                    icon: "error"
                                });
                            } else {
                                swal({
                                    title: "Atención!",
                                    text: jqXHR.responseJSON.error.description + '.',
                                    icon: "info"
                                }).then(() => {
                                    logout();
                                });
                            }
                        } else {
                            swal({
                                title: "Algo está mal!",
                                icon: "error"
                            });
                        }
                    })
                    .always(function() {});
              }
            };

            $(".btn-download").click(function(event) {
              event.preventDefault();
              $btn = $(this);
              $btn.prop('disabled', true).html('Cargando...');
              descargar(function (req) {
                  $btn.prop('disabled', false).html('Descargar PDF');
                  var url_coupon = API_QREWARDS_URL + '/public/pdf/dompdf.php?i[]=' + req.sources.media.join('&i[]=');
                  if (req.device_os_mobile) {
                      window.location.replace(url_coupon);
                  } else {
                      $('#container-iframe').attr('src', url_coupon);
                  }
                  console.log(url_coupon);
              });
            });

            $(".btn-logout").click(function(event) {
                event.preventDefault();
                logout();
                window.location.replace($(this).attr('href'));
            });
          }

          $(document).ready(function() {
            $.get(API_QREWARDS_URL + '/sites/' + slug_site + '/info?site_webservice=1', function(data) {
              init(data.data);
            });
          });

        }
        window.getDownloadRewards = getDownloadRewards;
    })();
});
