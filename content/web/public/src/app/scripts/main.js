$(function () {
    if (user_data.id) {
        setShoppingCart();
    } else {
        getShoppingCart();
    }
    $(".close_session").click((e) => {
        e.preventDefault();
        eraseCookie("jwt");
        window.location.href = host_url;
    });
    switch (this_page) {
        case "home":
            var $grid = $(".rapidBuy");
            $grid.GridProdukts({
                page: 1,
                limit: 10,
                type: "home",
            });
            break;
        case "categories":
          var $grid = $(".tt-product-listing");
          if (cat_id > 0) {
              $grid.GridProdukts({
                  page: 1,
                  limit: 10,
                  cat_id,
                  type: "items",
              });
          } else {
              $grid.GridProdukts({
                  page: 1,
                  limit: 10,
                  type: "items",
              });
          }
          break;
        case "cart":
          if (user_data.id) {
              getShoppingCart();
          } else {
              window.location.replace('/login?redirect=/cart');
          }
          break;
        case "order":
          if (user_data.id) {
              getOrders();
          } else {
              window.location.replace('/login?redirect=/orders');
          }
          break;
        case "detail":
            getDetail();
            break;
        case "download":
          getDownloadRewards();
          break;
    }
});
