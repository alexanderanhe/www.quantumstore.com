 <?php

 function checkSSL(){
    if (isset($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
        $server_name = $_SERVER['SERVER_NAME'];

        if ( $server_name == 'quantumstore.com.mx' ) {
            $server_name = 'www.quantumstore.com.mx';
        }

        if ( $_SERVER['HTTP_X_FORWARDED_PROTO'] != "https" AND
        ($server_name == 'www.quantumstore.com.mx') ) {
            $url = "https://". $server_name . $_SERVER['REQUEST_URI'];
            redirect($url);
            exit;
        }
    }
}

checkSSL();
