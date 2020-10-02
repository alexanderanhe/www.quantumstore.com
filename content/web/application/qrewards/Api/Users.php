<?php

namespace qrewards\Api;

class Users extends HttpClientAbstract
{
    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Obtiene el perfil basico de un user en api
     *
     * @param  int $userId
     * @return array
     */
    public function basic_perfil($userId)
    {
        $uri = 'kore/user_basic/' . $userId;

        return $this->httpClient->get($uri)->json();
    }
}
