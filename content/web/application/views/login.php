<?php 
require_once 'header.php';
$PAGE = 'login';
$data['PAGE'] = $PAGE;
if ($has_session) {
	redirect($HOST_URL);
}
?>
<div class="tt-breadcrumb">
	<div class="container">
		<ul>
			<li><a href="<?php echo $HOST_URL ?>">Home</a></li>
			<li>Registro</li>
		</ul>
	</div>
</div>
<div id="tt-pageContent">
	<div class="container-indent">
		<div class="container">
			<h1 class="tt-title-subpages noborder">¿YA ESTÁS REGISTRADO?</h1>
			<div class="tt-login-form">
				<div class="row">
					<div class="col-xs-12 col-md-6">
						<div class="tt-item">
							<h2 class="tt-title">USUARIO NUEVO</h2>
							<p>
								Al crear una cuenta en nuestra tienda, podrá moverse a través del proceso de pago más rápido, almacenar múltiples direcciones de envío, ver y rastrear sus pedidos en su cuenta y más.
							</p>
							<div class="form-group">
								<a href="<?php echo $HOST_URL ?>account<?php echo !empty($_GET['redirect']) ? "?redirect={$_GET['redirect']}" : '';?>" class="btn btn-top btn-border">CREAR CUENTA</a>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-md-6">
						<div class="tt-item">
							<h2 class="tt-title">LOGIN</h2>
							Si tienes una cuenta con nosotros, por favor inicia sesión.
							<div class="form-default form-top">
								<form id="customer_login">
									<div class="form-group">
										<label for="login_email">USUARIO O E-MAIL *</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="login_email" class="form-control" id="login_email" placeholder="Ingresa tu usuario o e-mail">
									</div>
									<div class="error error_login">Campo requerido</div>
									<div class="form-group">
										<label for="login_password">CONTRASEÑA *</label>
										<input type="password" name="login_password" class="form-control" id="login_password" placeholder="Ingresa tu contraseña">
									</div>
									<div class="row">
										<div class="col-auto mr-auto">
											<div class="form-group">
												<button class="btn btn-border login-btn" type="submit">LOGIN</button>
											</div>
										</div>
										<div class="col-auto align-self-end">
											<div class="form-group">
												<ul class="additional-links">
													<li><a href="#">¿No recuerdas tu contraseña?</a></li>
												</ul>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php require_once 'footer.php' ?>