<?php 
require_once 'header.php';
$PAGE = 'order';
$data['PAGE'] = $PAGE; 
?>
<div class="tt-breadcrumb">
	<div class="container">
		<ul>
			<li><a href="<?php echo $HOST_URL ?>">Home</a></li>
			<li><a href="#">Orden</a></li>
			<li><?php echo !empty($orderId)? str_pad(intval($orderId), 7, "0", STR_PAD_LEFT ) : '---'?></li>
		</ul>
	</div>
</div>
<div id="tt-pageContent">
	<div class="container-indent">
		<!-- mobile product slider  -->
		<div class="tt-mobile-product-layout visible-xs">
			<div class="tt-mobile-product-detail-slider arrow-location-center slick-animated-show-js"></div>
		</div>
		<!-- /mobile product slider  -->
		<div class="container container-fluid-mobile">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="text-center order_complete">
              <i class="" id="icon-process" style="font-size: 65px;color: #e52721;"></i>
              <div class="heading_s1"><h3 id="header-process"></h3></div>
              <div class="tt-shopcart-box tt-boredr-large">
                <table class="tt-shopcart-table01 orderDetail"></table>
              </div>  
              <p id="text-process"></p>
              <a href="<?php echo $HOST_URL ?>" class="btn btn-fill-out mt-3">Continuar Comprando</a>
            </div>
        </div>
      </div>
		</div>
	</div>
</div>
<?php require_once 'footer.php' ?>