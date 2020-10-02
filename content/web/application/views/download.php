<?php 
require_once 'header.php';
$PAGE = 'download';
$data['PAGE'] = $PAGE;

$API_QREWARDS_URI = $this->config->item('API_QREWARDS_URI');
$SLUG_APP = $this->config->item('SLUG_APP');

?>
<div class="tt-breadcrumb">
	<div class="container">
		<ul>
			<li><a href="<?php echo $HOST_URL ?>">Home</a></li>
			<li><a href="#">Descarga tu recompensa</a></li>
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
              <i class="icon-e-33" style="font-size: 65px;color: #e52721;"></i>
              <div class="heading_s1"><h3>Descargar tus archivos:</h3></div>
              <p></p>
              <a href="#" class="btn btn-fill-out mt-3 btn-download">Descargar PDF</a>
              <a href="<?php echo $HOST_URL ?>" class="btn btn-fill-out btn-logout btn-white ml-3 mt-3">Continuar Comprando</a>
            </div>
        </div>
        <iframe id="container-iframe" style="display: none;"></iframe>
      </div>
		</div>
	</div>
</div>
<script>
    const whost = window.location.host;
    const API_QREWARDS_URL = '<?php echo $API_QREWARDS_URI?>';
    const slug_site = '<?php echo $SLUG_APP?>';
</script>
<?php require_once 'footer.php';