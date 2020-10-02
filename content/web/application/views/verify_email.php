<?php 
require_once 'header.php';
$PAGE = 'verify-email';
$data['PAGE'] = $PAGE;
?>
<div class="tt-breadcrumb">
    <div class="container">
        <ul>
            <li><a href="<?php echo $HOST_URL ?>">Home</a></li>
            <li>Verificar e-mail</li>
        </ul>
    </div>
</div>
<div id="tt-pageContent">
    <div class="container-indent">
        <div class="container">
            <h1 class="tt-title-subpages noborder">VALIDACIÓN DE E-MAIL</h1>
            <div class="tt-verify-form">
                <div class="row">
                    <div class="col-xs-12 col-12">
                        <div class="tt-item">
                            <h2 class="tt-title">VERIFICACIÓN DE TOKEN</h2>
                            <p>
                                Para la validación del correo dar click en continuar.
                            </p>
                            <div class="form-default form-top">
                                <form id="customer_verify">
                                    <div class="form-group">
                                        <textarea name="verify_token" class="form-control" id="verify_token" placeholder="Pega el código de verificación aquí..."><?php echo isset($_GET['token']) ? $_GET['token'] : ''?></textarea>
                                    </div>
                                    <div class="error error_verify alert alert-danger"></div>
                                    <div class="row">
                                        <div class="col-auto mr-auto">
                                            <div class="form-group">
                                                <button class="btn btn-border verify-btn" type="submit">CONTINUAR</button>
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