<?php
$jwt = !empty($_COOKIE['jwt']) ? $_COOKIE['jwt'] : '';
$ENV = $this->config->item('PRODUCTION');
$RESOURCE_PATH = $this->config->item('RESOURCE_PATH');
$CONTENT_PATH = $this->config->item('CONTENT_PATH');
$API_BASE_URI = $this->config->item('API_BASE_URI');
$OPENPAY_ID = $this->config->item('OPENPAY_ID');
$OPENPAY_PUBLIC = $this->config->item('OPENPAY_PUBLIC');
$OPENPAY_ENV = $this->config->item('OPENPAY_ENV');
$HOST_URL = $this->config->item('HOST_URI');
if ($ENV) {
	$RESOURCE_PATH = $this->config->item('RESOURCE_PATH_PROD');
	$CONTENT_PATH = $this->config->item('CONTENT_PATH_PROD');
}
$CAT_ID = !empty($this->uri->segment(2)) ? $this->uri->segment(2) : '0';
$version =  date('YmdHis');
$has_session = false;
$user_data = [];
$headers[] = 'Content-Type: application/json';
$headers[] = 'Authorization: Bearer ' . $jwt;
$url = $API_BASE_URI . 'users/users/me';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$content = curl_exec($ch);
$info = curl_getinfo($ch);
$err = curl_error($ch);
curl_close($ch);
$response = [];
if ($info['http_code'] == 200) {
	$response = json_decode($content, true);
	$user_data = $response['data'];
	$has_session = true;
}
$data['RESOURCE_PATH'] = $RESOURCE_PATH;
$data['CONTENT_PATH'] = $CONTENT_PATH;
$data['OPENPAY_ID'] = $OPENPAY_ID;
$data['OPENPAY_PUBLIC'] = $OPENPAY_PUBLIC;
$data['OPENPAY_ENV'] = $OPENPAY_ENV;
$data['ENV'] = $ENV;
$data['version'] = $version;
$data['API_BASE_URI'] = $API_BASE_URI;
$data['HOST_URL'] = $HOST_URL;
$data['CAT_ID'] = floatval($CAT_ID);
$data['user_data'] = $user_data;
$data['has_session'] = $has_session;
?>
<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="utf-8">
	<title>Quantum Store | ¡Compra en solo dos clics!</title>
	<meta name="keywords" content="">
	<meta name="description" content="">
	<meta name="author" content="Quantum Rewards">
	<?php /*
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="google-site-verification" content="-sfkR8eMmoGb43DJkkE9v8ez2jQPI5Mx2b_b64bp8JU" />
        <link href="https://www.deldesfile.com/" rel="canonical">
        <meta itemprop="name" content="<?php echo $og_title ?>">
        <meta itemprop="description" content="<?php echo $og_description ?>">
        <meta itemprop="image" content="<?php echo $og_images ?>">
        <meta name="twitter:card" value="summary_large_image">
        <meta name="twitter:site" content="@deldesfile">
        <meta name="twitter:title" content="<?php echo $og_title ?>">
        <meta name="twitter:description" content="<?php echo $og_description ?>">
        <meta name="twitter:image" content="<?php echo $og_images ?>">
        <meta property="og:title" content="<?php echo $og_title ?>">
        <meta property="og:type" content="website">
        <meta property="og:description" content="<?php echo $og_description ?>">
        <meta property="og:url" content="<?php echo $og_url ?>">
        <meta property="og:image" content="<?php echo $og_images ?>">
        <meta property="fb:app_id" content="357987004560089">
        <meta property="fb:admins" content="100000159384095"> -->

		<title><?php echo $og_title ?></title>
		<meta name="description" content="<?php echo $og_description ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
	*/ ?>
	<link href="<?php echo $RESOURCE_PATH ?>/images/favicon.png" rel="shortcut icon">
	<link href="<?php echo $RESOURCE_PATH ?>/images/touch.png" rel="apple-touch-icon-precomposed">

	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="<?php echo $CONTENT_PATH ?>styles/qrewards.css?v=<?php echo $version ?>">
</head>

<body>
	<div id="loader-wrapper">
		<div id="loader">
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
		</div>
	</div>
	<header>
		<nav class="panel-menu mobile-main-menu">
			<ul>
				<li>
					<a href="<?php echo $HOST_URL ?>">HOME</a>
				</li>
    <?php /*
				<li>
					<a href="<?php echo $HOST_URL ?>categories">RECOMPENSAS</a>
					<ul>
						<li><a href="<?php echo $HOST_URL ?>categories">Todos</a></li>
					</ul>
				</li>
				<li>
					<a href="">NOSOTROS</a>
				</li>
				<li>
					<a href="<?php echo $HOST_URL ?>faqs">PREGUNTAS FRECUENTES</a>
        </li>
    */ ?>
				<li>
					<a href="<?php echo $HOST_URL ?>contact">CONTACTO</a>
				</li>
			</ul>
			<div class="mm-navbtn-names">
				<div class="mm-closebtn">Cerrar</div>
				<div class="mm-backbtn">Atrás</div>
			</div>
		</nav>
		<div class="tt-mobile-header">
			<div class="container-fluid">
				<div class="tt-header-row">
					<div class="tt-mobile-parent-menu">
						<div class="tt-menu-toggle">
							<i class="icon-03"></i>
						</div>
					</div>
					<div class="tt-mobile-parent-search tt-parent-box"></div>
					<div class="tt-mobile-parent-cart tt-parent-box"></div>
					<div class="tt-mobile-parent-account tt-parent-box"></div>
				</div>
			</div>
			<div class="container-fluid tt-top-line">
				<div class="row">
					<div class="tt-logo-container">
						<a class="tt-logo tt-logo-alignment" href="<?php echo $HOST_URL ?>"><img src="<?php echo $RESOURCE_PATH ?>/images/logo.svg" alt=""></a>
					</div>
				</div>
			</div>
		</div>
		<div class="tt-desktop-header">
			<div class="container">
				<div class="tt-header-holder">
					<div class="tt-col-obj tt-obj-logo">
						<a class="tt-logo tt-logo-alignment" href="<?php echo $HOST_URL ?>"><img src="<?php echo $RESOURCE_PATH ?>/images/logo.svg" alt=""></a>
					</div>
					<div class="tt-col-obj tt-obj-menu">
						<div class="tt-desctop-parent-menu tt-parent-box">
							<div class="tt-desctop-menu">
								<nav>
									<ul>
										<li class="dropdown tt-megamenu-col-02 selected">
											<a href="<?php echo $HOST_URL ?>">HOME</a>
                    </li>
          <?php /*
										<li class="dropdown tt-megamenu-col-01">
											<a href="<?php echo $HOST_URL ?>categories">RECOMPENSAS</a>
											<div class="dropdown-menu animated jackInTheBox">
												<div class="row tt-col-list">
													<div class="col">
														<ul class="tt-megamenu-submenu">
															<li><a href="/categories/">Todos</a></li>
														</ul>
													</div>
												</div>
											</div>
										</li>
										<!-- <li class="dropdown tt-megamenu-col-01">
											<a href="#">NOSOTROS</a>
										</li> -->
										<li class="dropdown tt-megamenu-col-01">
											<a href="<?php echo $HOST_URL ?>faqs">PREGUNTAS FRECUENTES</a>
                    </li>
            */ ?>
										<li class="dropdown megamenu">
											<a href="<?php echo $HOST_URL ?>contact">CONTACTO</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
					<div class="tt-col-obj tt-obj-options obj-move-right">
						<div class="tt-desctop-parent-search tt-parent-box">
							<div class="tt-search tt-dropdown-obj">
								<!-- <button class="tt-dropdown-toggle" data-tooltip="Buscar" data-tposition="bottom">
									<i class="icon-f-85"></i>
								</button> -->
								<div class="tt-dropdown-menu">
									<div class="container">
										<form>
											<div class="tt-col">
												<input type="text" class="tt-search-input" placeholder="Ingresa palabra clave...">
												<button class="tt-btn-search" type="submit"></button>
											</div>
											<div class="tt-col">
												<button class="tt-btn-close icon-g-80"></button>
											</div>
											<div class="tt-info-text">
												¿Qué estás buscando?
											</div>
											<div class="search-results">
												<!<ul>
													<li>
														<a href="<?php echo $HOST_URL ?>view">
															<div class="thumbnail"><img src="<?php echo $RESOURCE_PATH ?>/images/loader.svg" data-src="<?php echo $RESOURCE_PATH ?>/images/product/sb-front.jpg" alt=""></div>
															<div class="tt-description">
																<div class="tt-title">Producto 1</div>
																<div class="tt-price">
																	<span class="new-price">$50</span>
																	<span class="old-price">$50</span>
																</div>
															</div>
														</a>
													</li>
													</ul>
													<button type="button" class="tt-view-all">Ver todos los productos</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						<div class="tt-desctop-parent-cart tt-parent-box">
							<div class="tt-cart tt-dropdown-obj" data-tooltip="Carrito" data-tposition="bottom">
								<button class="tt-dropdown-toggle">
									<i class="icon-f-39"></i>
									<span class="tt-badge-cart">0</span>
								</button>
								<div class="tt-dropdown-menu">
									<div class="tt-mobile-add">
										<h6 class="tt-title">MI CARRITO</h6>
										<button class="tt-close">Cerrar</button>
									</div>
									<div class="tt-dropdown-inner">
										<div class="tt-cart-layout">
											<!-- layout emty cart -->
											<a href="" class="tt-cart-empty">
												<i class="icon-f-39"></i>
												<p>No hay productos disponibles</p>
											</a>									
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="tt-desctop-parent-account tt-parent-box">
							<div class="tt-account tt-dropdown-obj">
								<button class="tt-dropdown-toggle" data-tooltip="Mi cuenta" data-tposition="bottom"><i class="icon-f-94"></i></button>
								<div class="tt-dropdown-menu">
									<div class="tt-mobile-add">
										<button class="tt-close">Cerrar</button>
									</div>
									<div class="tt-dropdown-inner">
										<ul>
											<!-- <li><a href="<?php echo $HOST_URL ?>login"><i class="icon-f-94"></i>Mi Cuenta</a></li> -->
											<?php
											if (!$has_session) {
											?>
												<li><a href="<?php echo $HOST_URL ?>login"><i class="icon-f-76"></i>Iniciar Sesión</a></li>
												<li><a href="<?php echo $HOST_URL ?>account"><i class="icon-f-94"></i>Registrarme</a></li>
											<?php
											}
											?>
											<?php
											if ($has_session) {
											?>
												<li><a href="#" class="close_session"><i class="icon-f-77"></i>Cerrar Sesión</a></li>
											<?php
											}
											?>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tt-stuck-nav">
			<div class="container">
				<div class="tt-header-row ">
					<div class="tt-stuck-parent-menu"></div>
					<div class="tt-stuck-parent-search tt-parent-box"></div>
					<div class="tt-stuck-parent-cart tt-parent-box"></div>
					<div class="tt-stuck-parent-account tt-parent-box"></div>
					<div class="tt-stuck-parent-multi tt-parent-box"></div>
				</div>
			</div>
		</div>
	</header>
	<?php
	if ($has_session && empty($user_data['emailVerificated'])) {
	?>
	<div class="container-fluid">
		<div class="row">
			<div class="alert alert-warning mb-0 col-12" role="alert">
				<h4 class="alert-heading pb-0">¡Tu correo no ha sido verificado!</h4>
				<p>Por favor, revisa tu bandeja de entrada y sigue las instrucciones para verificar tu correo, posteriormente <a href="<?php echo $HOST_URL.uri_string(); ?>">actualiza esta página</a>.</p>
			</div>
		</div>
	</div>
	<?php
	}
	?>