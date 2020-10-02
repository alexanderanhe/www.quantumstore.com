<footer>
	<div class="tt-footer-default tt-color-scheme-02">
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-9">
					<div class="tt-newsletter-layout-01">
						<div class="tt-newsletter">
							<div class="tt-mobile-collapse">
								<h4 class="tt-collapse-title">
									MANTENERME SIEMPRE INFORMADO:
								</h4>
								<div class="tt-collapse-content">
									<form id="newsletterform" class="form-inline form-default" method="post" novalidate="novalidate" action="">
										<div class="form-group">
											<input type="text" name="emailNewsletter" class="form-control" placeholder="Ingresa tu e-mail" id="emailNewsletter">
											<button type="submit" class="btn btnNewsletter">¡SUSCRIBIRME!</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-auto">
					<ul class="tt-social-icon">
						<li><a class="icon-g-64" target="_blank" href="https://www.facebook.com/Quantummex/"></a></li>
						<li><a class="icon-h-58" target="_blank" href="https://twitter.com/quantummx_"></a></li>
						<li><a class="icon-g-67" target="_blank" href="https://www.instagram.com/quantum.mx/"></a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="tt-footer-col tt-color-scheme-01">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-lg-2 col-xl-3">
					<div class="tt-mobile-collapse">
						<h4 class="tt-collapse-title">
							CATEGORÍAS
						</h4>
						<div class="tt-collapse-content">
							<ul class="tt-list">
								<li><a href="<?php echo $HOST_URL ?>categories">Todos</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-lg-2 col-xl-3">
					<div class="tt-mobile-collapse">
						<h4 class="tt-collapse-title">
							Mi Cuenta
						</h4>
						<div class="tt-collapse-content">
							<ul class="tt-list">
								<?php
								if (!$has_session) {
								?>
									<li><a href="<?php echo $HOST_URL ?>login">Iniciar sesión</a></li>
									<li><a href="<?php echo $HOST_URL ?>account">Registrarme</a></li>
								<?php
								}
								?>
								<?php
								if ($has_session) {
								?>
									<li><a href="#" class="close_session">Cerrar sesión</a></li>
									<li><a href="<?php echo $HOST_URL ?>cart">Finalizar compra</a></li>
								<?php
								}
								?>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-lg-4 col-xl-3">
					<div class="tt-mobile-collapse">
						<h4 class="tt-collapse-title">
							ACERCA DE NOSOTROS
						</h4>
						<div class="tt-collapse-content">
							<p>
								Somos una tienda digital en la que puedes adquirir servicios y beneficios individuales o en combos a un costo preferencial en un par de clics.
              </p>
              <ul class="tt-list mt-3">
                <li><a href="/terminos-y-condiciones-qstore" class="">Términos y condiciones</a></li>
                <li><a href="/aviso-de-privacidad" class="">Aviso de Privacidad</a></li>
              </ul>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-lg-4 col-xl-3">
					<div class="tt-newsletter">
						<div class="tt-mobile-collapse">
							<h4 class="tt-collapse-title">
								CONTACTO
							</h4>
							<div class="tt-collapse-content">
								<address>
									<p><span>Dirección:</span> Río Magdalena 326, Col. La Otra Banda C.P. 01090</p>
									<p><span>Teléfono:</span> (55)5540.1313</p>
									<p><span>Horario:</span> Lunes a Jueves de 8:00hrs a 18:00hrs, Viernes de 8:00hrs a 14:00hrs</p>
									<p><span>E-mail:</span> <a href="mailto:contacto@quantummx.com">contacto@quantummx.com</a></p>
								</address>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="tt-footer-custom tt-color-scheme-02">
		<div class="container">
			<div class="tt-row">
				<div class="tt-col-left">
					<div class="tt-col-item tt-logo-col">
						<a class="tt-logo tt-logo-alignment" href=""><img src="<?php echo $RESOURCE_PATH ?>/images/logo-w.svg" alt=""></a>
					</div>
				</div>
				<div class="tt-col-middle">
					<div class="tt-col-item">
						<div class="tt-box-copyright">
							&copy; Todos los derechos reservados Quantum TM Hollywood Movie Magic S de RL de CV.
						</div>
					</div>
				</div>
				<div class="tt-col-right">
					<div class="tt-col-item">
						<div class="tt-col-item tt-logo-col">
							<a class="tt-logo tt-logo-alignment" href=""><img src="<?php echo $RESOURCE_PATH ?>/images/esr.svg" alt=""></a>
						</div>
					</div>
				</div>
			</div>
		</div>
</footer>
<a href="#" class="tt-back-to-top">Subir</a>
<div class="modal  fade" id="ModalquickView" tabindex="-1" role="dialog" aria-label="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content ">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="icon icon-clear"></span></button>
			</div>
			<div class="modal-body">
				<div class="tt-modal-quickview desctope">
					<div class="row addToModal">
					
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal  fade" id="Modalnewsletter" tabindex="-1" role="dialog" aria-label="myModalLabel" aria-hidden="true" data-pause=3000>
	<div class="modal-dialog modal-sm">
		<div class="modal-content ">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="icon icon-clear"></span></button>
			</div>
			<form action="" id="newsletterformModal" method="POST">
				<div class="modal-body bb-backround">
					<div class="tt-modal-newsletter">
						<div class="tt-modal-newsletter-promo">
							<div class="tt-title-small">SE EL PRIMERO EN<br> RECIBIR INFORMACIÓN</div>
							<a class="tt-logo tt-logo-alignment" href=""><img src="<?php echo $RESOURCE_PATH ?>/images/logo.svg" alt=""></a>
						</div>
						<p>
							Para tu suscripcion, es necesario aceptar nuestros términos &amp; condiciones<br>
						</p>
						<div class="subscribe-form form-default">
							<div class="row-subscibe">
								<div class="input-group">
									<input type="text" class="form-control" placeholder="Ingresa tu e-mail" id="emailModalNewsletter" name="emailModalNewsletter">
									<button type="submit" class="btn btnNewsletterModal">SUSCRIBIRME</button>
								</div>
							</div>
							<div class="checkbox-group">
								<input type="checkbox" id="checkBox1" name="checkBox1">
								<label for="checkBox1">
									<span class="check"></span>
									<span class="box"></span>
									Acepto términos y condiciones.
								</label>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal  fade" id="modalAddToCartProduct" tabindex="-1" role="dialog" aria-label="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content ">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="icon icon-clear"></span></button>
			</div>
			<div class="modal-body">
				<div class="tt-modal-addtocart mobile">
					<div class="tt-modal-messages">
						<i class="icon-g-82"></i>¡Producto agregado con éxito!
					</div>
					<a href="#" class="btn-link btn-close-popup">CONTINUAR COMPRANDO</a>
					<a href="<?php echo $HOST_URL ?>cart" class="btn-link">VER MI CARRITO</a>
					<a href="" class="btn-link">REALIZAR CHECKOUT</a>
				</div>
				<div class="tt-modal-addtocart desctope">
					<div class="row">
						<div class="col-12 col-lg-6">
							<div class="tt-modal-messages">
								<i class="icon-g-82"></i> ¡Producto agregado con éxito!
							</div>
							<div class="tt-modal-product">
								<div class="tt-img">
									<img src="images/loader.svg" data-src="images/product/sb-back.jpg" alt="">
								</div>
								<h2 class="tt-title"><a href="<?php echo $HOST_URL ?>view">STARBUCKS</a></h2>
								<div class="tt-qty">
									CANTIDAD: <span>200</span>
								</div>
							</div>
							<div class="tt-product-total">
								<div class="tt-total">
									TOTAL: <span class="tt-price">$38,00.00</span>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-6">
							<a href="#" class="tt-cart-total">
								Tienes 2 productos en tu carrito
								<div class="tt-total">
									TOTAL: <span class="tt-price">$90,000.00</span>
								</div>
							</a>
							<a href="#" class="btn btn-border btn-close-popup">CONTINUAR COMPRANDO</a>
							<a href="<?php echo $HOST_URL ?>cart" class="btn btn-border">VER MI CARRITO</a>
							<a href="#" class="btn">REALIZAR CHECKOUT</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php
  $idItem = !empty($itemId)? intval($itemId): 0;
  $idOrder = !empty($orderId)? intval($orderId): 0;
?>

<script>
	var api_base_url = "<?php echo $API_BASE_URI ?>",
		resourse_url = "<?php echo $RESOURCE_PATH ?>",
		this_page = "<?php echo $PAGE ?>",
		cat_id = "<?php echo $CAT_ID ?>",
		item_id = <?php echo $idItem ?>,
		order_id = <?php echo $idOrder ?>,
		user_data = <?php echo json_encode($user_data); ?>;
		openpay_id = "<?php echo $OPENPAY_ID ?>",
		openpay_public = "<?php echo $OPENPAY_PUBLIC ?>",
		openpay_env = "<?php echo $OPENPAY_ENV ?>",
		env = <?php echo json_encode($ENV) ?>,
		host_url = "<?php echo $HOST_URL ?>";
		redirect_page = "<?php echo !empty($_GET['redirect']) ? $_GET['redirect'] : '' ?>";
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js"></script>
<script type="text/javascript" src="https://js.openpay.mx/openpay.v1.min.js"></script>
<script type='text/javascript' src="https://js.openpay.mx/openpay-data.v1.min.js"></script>
<script type='text/javascript' src="https://www.google.com/recaptcha/api.js"></script>
<script src="<?php echo $CONTENT_PATH ?>scripts/qrewards.js?v=<?php echo $version ?>">
	new WOW().init();
</script>
<?php if (!$ENV) { ?>
	<script type="text/javascript" id="__bs_script__">
		//<![CDATA[
		document.write('<script async src="http://HOST:3005/browser-sync/browser-sync-client.js?v=2.18.12"><\/script>'.replace(
			'HOST', location.hostname));
		//]]>
	</script>
<?php }  ?>
</body>

</html>