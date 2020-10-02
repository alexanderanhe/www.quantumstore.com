<?php
require_once 'header.php';
$PAGE = 'categories';
$data['PAGE'] = $PAGE;
?>
<div class="tt-breadcrumb">
	<div class="container">
		<ul>
			<li><a href="<?php echo $HOST_URL ?>">Home</a></li>
			<li>Nombre Categoría</li>
		</ul>
	</div>
</div>
<div id="tt-pageContent">
	<div class="container-indent">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-lg-12 col-xl-12">
					<div class="content-indent container-fluid-custom-mobile-padding-02">
						<div class="tt-filters-options">
							<h1 class="tt-title">
								CATEGORÍA
							</h1>
							<div class="tt-btn-toggle">
								<a href="#">FILTRO</a>
							</div>
							<div class="tt-quantity">
								<a href="#" class="tt-col-three" data-value="tt-col-three"></a>
								<a href="#" class="tt-col-four" data-value="tt-col-four"></a>
							</div>

						</div>
						<div class="tt-product-listing row">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php require_once 'footer.php' ?>