<?php

namespace qrewards\Api;

class Session extends HttpClientAbstract
{
    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Determina si existe una sesion se usuario
     *
     * @param  string $token
     * @return array
     */
    public function getSession($token)
    {
        $uri = '/users/users/me';

        $ci = &get_instance();

        return $this->httpClient->get($uri, [], [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $token,
        ])->json();
    }
}
