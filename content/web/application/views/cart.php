<?php 
require_once 'header.php';
$PAGE = 'cart';
$data['PAGE'] = $PAGE;
$not_email_verificated = $has_session && empty($user_data['emailVerificated']);
?>
<div class="form-group process-request">
  <div class="loader"></div>
  <h5> Espere un momento . . .</h5>
</div>
<div class="tt-breadcrumb">
	<div class="container">
		<ul>
			<li><a href="<?php echo $HOST_URL ?>">Home</a></li>
			<li>Mi carrito</li>
		</ul>
	</div>
</div>
<div id="tt-pageContent">
	<div class="container-indent">
		<div class="container">
			<h1 class="tt-title-subpages noborder">MI CARRITO DE COMPRAS</h1>
			<div class="tt-shopcart-table-02">
				<table>
					<tbody class="table-cart">
					</tbody>
				</table>
				<div class="tt-shopcart-btn">
					<div class="col-left">
						<a class="btn-link" href="<?php echo $HOST_URL ?>categories"><i class="icon-e-19"></i>CONTINUAR COMPRANDO</a>
					</div>
					<!-- <div class="col-right">
						<a class="btn-link" href="<?php echo $HOST_URL ?>cart"><i class="icon-h-02"></i>LIMPIAR CARRITO</a>
						<a class="btn-link" href="#"><i class="icon-h-48"></i>ACTUALIZAR</a>
					</div> -->
				</div>
			</div>
			<div class="tt-shopcart-col">
				<div class="row">
				<div class="col-md-6 col-lg-6">
						<div class="tt-shopcart-box tt-boredr-large">
							<table class="tt-shopcart-table01">
								<h5>
								ESTAS POR PAGAR
								</h5>
								<tbody>
									<tr>
										<th>SUBTOTAL</th>
										<td class="subtotalCart">$0</td>
									</tr>
								</tbody>
								<tbody class="hidden">
									<tr>
										<th>I.V.A</th>
										<td>$0</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<th>TOTAL</th>
										<td class="totalCart">$0</td>
									</tr>
								</tfoot>
							</table>					
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="tt-shopcart-box">
							<?php if ($not_email_verificated) { ?>
							<div class="form-group">
								<div class="alert alert-danger" role="alert">
									<h4 class="alert-heading pb-0">PARA CONFIRMAR TUS DATOS...</h4>
									<p>Para seguir con tu compra debes verificar tu correo, por favor, revisa tu bandeja de entrada y sigue las instrucciones, posteriormente <a href="<?php echo $HOST_URL.uri_string(); ?>">actualiza esta página</a>.</p>
								</div>
							</div>
							<?php } else { ?>
							<h5>
								FAVOR DE CONFIRMAR TUS DATOS
							</h5>
							<?php } ?>
							<form class="form-default" method="POST" id="buyForm">
								<fieldset <?php echo $not_email_verificated ? 'disabled title="Debe primero verificar su correo"' : '';?>>
									<div class="form-group d-none">
										<label for="socialName" class="control-label">RAZON SOCIAL</label>
										<input type="text" class="form-control" id="socialName" name="socialName" placeholder="Hollywood Movie Magic S de RL de CV." value="" required>
									</div>
									<div class="form-group d-none">
										<label for="rfc" class="control-label">RFC</label>
										<input type="text" class="form-control" id="rfc" name="rfc" placeholder="HMMO8199109L9" value="" required>
									</div>
									<div class="form-group">
										<label for="cardName" class="control-label">Nombre *</label>
										<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Nombre" value="" required>
                  </div>
									<div class="form-group">
                    <label for="cardNumber" class="control-label">Número de Tarjeta *</label>
                    <input type="text" class="form-control" name="cardNumber" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" max-length="16" value="" required>
                  </div>
                  <div class="form-group col-sm-4 col-xs-12">
										<label for="monthCard" class="control-label">Mes de vencimiento *</label>
										<input type="text" class="form-control" name="monthCard" id="monthCard" placeholder="MM" max-length="2" value="" required>
									</div>
									<div class="form-group col-sm-4 col-xs-12">
										<label for="yearCard" class="control-label">Año de vencimiento *</label>
										<input type="text" class="form-control" name="yearCard" id="yearCard" placeholder="AA" max-length="2" value="" required>
									</div>
									<div class="form-group col-sm-4 col-xs-12">
										<label for="cvvCard" class="control-label">CVV *</label>
										<input type="text" placeholder="***" class="form-control" name="cvvCard" id="cvvCard" placeholder="CVV" max-length="4" value="" required>
									</div>
									<button class="btn btn-lg do btnDoCart" <?php echo $not_email_verificated ? 'disabled title="Debe primero verificar su correo"' : '';?> type="submit"><span class="icon icon-check_circle"></span>PROCEDER COMPRA</button>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php require_once 'footer.php' ?>
