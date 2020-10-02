<?php 
require_once 'header.php';
$PAGE = 'detail';
$data['PAGE'] = $PAGE; 

$API_QREWARDS_URI = $this->config->item('API_QREWARDS_URI');
$SLUG_APP = $this->config->item('SLUG_APP');

$session = trim($_GET['_s']);
$record_id = intval($_GET['rid']);

if (!empty($session) && !empty($record_id)) {

  $curl = curl_init();
  
  curl_setopt_array($curl, array(
    CURLOPT_URL => "$API_QREWARDS_URI/sites/auth/session",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "client=$SLUG_APP&session=$session&rid=$record_id&site_webservice=1",
    CURLOPT_HTTPHEADER => array(
      "Content-Type: application/x-www-form-urlencoded",
      "Postman-Token: 0a1ef0bf-a90b-4eed-abb5-53ae6b93640e",
      "cache-control: no-cache"
    ),
  ));
  
  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    echo "cURL Error #:" . $err;
  } else if($json = json_decode($response)) {
    if (isset($json->data)) {
      $token = $json->data->token;
      $user = json_encode($json->data->user);
      $token_label = "s:$SLUG_APP:token";
      $user_label = "s:$SLUG_APP:user";
      $redirect = './descarga';

      echo "
      <script>
          localStorage.setItem('$token_label', '$token');
          localStorage.setItem('$user_label', '$user');
          window.location.replace('$redirect');
      </script>
      ";
    } else {
        echo "
        <script>
            alert('{$json->error->description}: La URL a vencido!');
            window.location.replace('./');
        </script>
        ";
    }
    require_once 'footer.php';
    exit;
  }
  echo '<div>Something is wrong!</div>';

} else die('<br><br><br><h5><center>URL incorrecta!</center></h5>');
require_once 'footer.php';
exit;
