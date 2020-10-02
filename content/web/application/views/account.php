<?php 
require_once 'header.php';
$PAGE = 'account';
$data['PAGE'] = $PAGE;
if ($has_session) {
	redirect($HOST_URL);
}
?>
<div class="tt-breadcrumb">
	<div class="container">
		<ul>
			<li><a href="<?php echo $HOST_URL ?>">Home</a></li>
			<li>Crear Cuenta</li>
		</ul>
	</div>
</div>
<div id="tt-pageContent">
	<div class="container-indent">
		<div class="container">
			<h1 class="tt-title-subpages noborder">CREAR CUENTA</h1>
			<div class="tt-login-form">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6">
						<div class="tt-item">
							<h2 class="tt-title">INFORMACIÓN PERSONAL</h2>
							<div class="form-default">
								<form id="customer_register" method="post" novalidate="novalidate">
									<div class="form-group">
										<label for="loginInputName">USUARIO *</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_username" class="form-control" id="register_username" placeholder="Ingresa tu usuario">
									</div>
									<div class="form-group">
										<label for="loginInputName">NOMBRE(S) *</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_name" class="form-control" id="register_name" placeholder="Ingresa tu nombre">
									</div>
									<div class="form-group">
										<label for="loginLastName">APELLIDO PATERNO*</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_lastname" class="form-control" id="register_lastname" placeholder="Ingresa tu apellido paterno">
									</div>
									<div class="form-group">
										<label for="loginLastName">APELLIDO MATERNO*</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_secondname" class="form-control" id="register_secondname" placeholder="Ingresa tu apellido materno">
									</div>
									<div class="form-group">
										<label for="loginLastName">GÉNERO*</label>
										<div class="tt-required">* Campo requerido</div>
										<fieldset id="register_gender">
											<ul class="list-group mb-0">
												<li class="list-group-item py-1"><label class="p-0" for="register_gender_female"><input type="radio" name="register_gender" id="register_gender_female" value="Female"> Mujer</label></li>
												<li class="list-group-item py-1"><label class="p-0" for="register_gender_male"><input type="radio" name="register_gender" id="register_gender_male" value="Male"> Hombre</label></li>
												<li class="list-group-item py-1"><label class="p-0" for="register_gender_other"><input type="radio" name="register_gender" id="register_gender_other" value="Other"> Otro</label></li>
											</ul>
											<label for="register_gender" class="error" style="display: none;"></label>
										</fieldset>
									</div>
									<div class="form-group">
										<label for="loginLastName">FECHA DE NACIMIENTO*</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_birthdate" class="form-control" id="register_birthdate" placeholder="Ingresa tu fecha de nacimiento YYYY-MM-DD">
									</div>
									<div class="form-group">
										<label for="loginInputEmail">E-MAIL *</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_email" class="form-control" id="register_email" placeholder="Ingresa tu e-mail">
									</div>
									<div class="form-group">
										<label for="loginInputEmail">TELÉFONO *</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_phone" class="form-control" id="register_phone" placeholder="Ingresa tu teléfono">
									</div>
									<div class="form-group">
										<label for="loginInputPassword">CONTRASEÑA *</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_password" class="form-control" id="register_password" placeholder="Ingresa tu contraseña">
									</div>
									<div class="form-group">
										<label for="loginInputPassword">VERIFICA CONTRASEÑA *</label>
										<div class="tt-required">* Campo requerido</div>
										<input type="text" name="register_cpassword" class="form-control" id="register_cpassword" placeholder="Confirma tu contraseña">
									</div>
									<div class="form-group">
										<div class="g-recaptcha gwd-reCAPTCHA_2" data-sitekey="6LfDGagUAAAAAPcsQcZBC3WT23JPsvNXIgUGCleU" data-callback="validateCaptcha" id="gwd-reCAPTCHA_3"></div>
										<input type="hidden" class="hiddenRecaptcha required" name="hiddenRecaptcha" id="hiddenRecaptcha">
									</div>
									<div class="error error_register alert alert-danger"></div>
									<div class="row">
										<div class="col-auto">
											<div class="form-group">
												<button class="btn btn-border register-btn" type="submit">CREAR CUENTA</button>
											</div>
										</div>
										<div class="col-auto align-self-center">
											<div class="form-group">
												<ul class="additional-links">
													<li>o <a href="<?php echo $HOST_URL ?>">Regresar a la tienda</a></li>
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