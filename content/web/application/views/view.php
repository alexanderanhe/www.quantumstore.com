<?php 
require_once 'header.php';
$PAGE = 'detail';
$data['PAGE'] = $PAGE; 
?>
<div class="tt-breadcrumb">
	<div class="container">
		<ul>
			<li><a href="<?php echo $HOST_URL ?>">Home</a></li>
			<li><a href="<?php echo $HOST_URL ?>categories">Tienda</a></li>
			<li>Producto</li>
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
			<div class="row">
				<div class="col-12 col-lg-9">
					<div class="row detail">
					
					</div>
				</div>
				<div class="col-12 col-lg-3">
					<div class="tt-product-single-aside">
						<div class="tt-services-aside">
							<a href="#" class="tt-services-block">
								<div class="tt-col-icon">
									<i class="icon-f-48"></i>
								</div>
								<div class="tt-col-description">
									<h4 class="tt-title">COMPRA INMEDIATA</h4>
									<p>Todas nuestras recompensas al alcance de un Clic</p>
								</div>
							</a>
							<a href="#" class="tt-services-block">
								<div class="tt-col-icon">
									<i class="icon-f-35"></i>
								</div>
								<div class="tt-col-description">
									<h4 class="tt-title">SOPORTE 24/7</h4>
									<p>Contáctenos las 24hrs del día, los 7 días de la semana</p>
								</div>
							</a>
							<a href="#" class="tt-services-block">
								<div class="tt-col-icon">
									<i class="icon-e-09"></i>
								</div>
								<div class="tt-col-description">
									<h4 class="tt-title">PAGOS 100% SEGUROS</h4>
							<p>Prevención de fraude que protege a tu comercio y a tus clientes.</p>
								</div>
							</a>
						</div>
						<div class="tt-promo-brand">
							<img src="<?php echo $RESOURCE_PATH ?>/images/custom/tt-promo-brand-desctop.png" class="visible-lg visible-md visible-sm visible-xl" alt="">
							<img src="<?php echo $RESOURCE_PATH ?>/images/custom/tt-promo-brand-mobile.png" class="visible-xs" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php require_once 'footer.php' ?>