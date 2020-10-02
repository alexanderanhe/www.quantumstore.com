<?php
	require_once 'header.php';
	$PAGE = 'contact';
	$data['PAGE'] = $PAGE;
?>
<div class="tt-breadcrumb">
	<div class="container">
		<ul>
			<li><a href="<?php echo $HOST_URL ?>">Home</a></li>
			<li>Contacto</li>
		</ul>
	</div>
</div>
<div id="tt-pageContent">
<?php /*
	<div class="container-indent">
		<div class="container">
			<div class="contact-map">
				<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3764.750683721988!2d-99.198941!3d19.336622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20007902230c9%3A0xeab0e06a8a62d076!2sRio+de+la+Magdalena+326%2C+Loreto+y+Campamento%2C+01090+Ciudad+de+M%C3%A9xico%2C+CDMX!5e0!3m2!1ses-419!2smx!4v1549574497030" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
			</div>
		</div>
  </div>
*/ ?>
	<div class="container-indent">
		<div class="container container-fluid-custom-mobile-padding">
			<form id="contactform" class="contact-form form-default" method="post" novalidate="novalidate" action="">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<input type="text" name="name" class="form-control" id="name" placeholder="Nombre (requerido)" value="<?php echo isset($user_data['name'], $user_data['lastName']) && !empty($user_data['name']) && !empty($user_data['lastName'])  ? ($user_data['name'] . ' ' . $user_data['lastName']) : ''; ?>" required>
						</div>
						<div class="form-group">
							<input type="text" name="email" class="form-control" id="email" placeholder="Email (requerido)" value="<?php echo isset($user_data['email']) && !empty($user_data['email']) ? $user_data['email'] : ''; ?>" required>
						</div>
						<div class="form-group">
							<input type="text" name="subject" class="form-control" id="subject" placeholder="Asunto (requerido)" required>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<textarea  name="message" class="form-control" rows="7" placeholder="Escribe tu mensaje (requerido)"  id="message" required></textarea>
						</div>
					</div>
				</div>
				<div class="text-center">
					<button type="submit" class="btn btnSendContact">ENVIAR MENSAJE</button>
				</div>
			</form>
		</div>
	</div>
	<div class="container-indent">
		<div class="container container-fluid-custom-mobile-padding">
			<div class="tt-contact02-col-list">
				<div class="row">
					<div class="col-sm-12 col-md-4 ml-sm-auto">
						<div class="tt-contact-info">
							<i class="tt-icon icon-f-93"></i>
							<h6 class="tt-title">COMUNÍCATE CON NOSOTROS</h6>
							<address>
								Conmutador: (55)5540.1313:<br>
								Del interior de la República: 01800.830.3888
							</address>
						</div>
          </div>
      <?php /*
					<div class="col-sm-6 col-md-4">
						<div class="tt-contact-info">
							<i class="tt-icon icon-f-24"></i>
							<h6 class="tt-title">VISITANOS</h6>
							<address>
								Río Magdalena 326, Col. La Otra Banda,<br>
								CDMX,  C.P. 01090,<br>
								México
							</address>
						</div>
          </div>
      */ ?>
					<div class="col-sm-12 col-md-4 mr-sm-auto">
						<div class="tt-contact-info">
							<i class="tt-icon icon-f-92"></i>
							<h6 class="tt-title">HORARIO DE ATENCIÓN</h6>
							<address>
								Lunes a Jueves de 8:00hrs a 18:00hrs.<br>
								Viernes de 8:00hrs a 14:00hrs
							</address>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php require_once 'footer.php' ?>