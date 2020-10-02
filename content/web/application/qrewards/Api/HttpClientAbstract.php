<?php

namespace qrewards\Api;

use qrewards\Api\GuzzleClient as HttpClient;
use qrewards\Api\HttpClientInterface;

abstract class HttpClientAbstract
{
    /**
     * Cliente http para realizar las llamadas a la API
     *
     * @var \qrewards\Api\HttpClientInterface
     */
    protected $httpClient;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->initClientInstance(new HttpClient);
    }

    /**
     * Inicializa el cliente http
     *
     * @param  \qrewards\Api\HttpClientInterface $httpClient
     * @return void
     */
    public function initClientInstance(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }
}
