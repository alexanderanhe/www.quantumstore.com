<?php

namespace qrewards\Api;

use GuzzleHttp\Client;

class GuzzleClient implements HttpClientInterface
{

    /**
     * Url base
     *
     * @var string
     */
    protected $baseUri;

    /**
     * Respuesta
     *
     * @var \GuzzleHttp\Psr7\Response
     */
    protected $response;

    /**
     * Constructor
     */
    public function __construct()
    {
        $ci = &get_instance();
        $this->baseUri = $ci->config->item('API_BASE_URI');

        $ci = &get_instance();

        $this->guzzle = new Client([
            'base_uri' => $this->baseUri,
            'verify' => false
        ]);
    }

    /**
     * Envia una peticion GET a la URI especificada
     *
     * @param  string $uri
     * @param  array  $query
     * @return \qrewards\Api\GuzzleClient
     */
    public function get($uri, $query = [], $headers = [])
    {
        $this->response = $this->guzzle->request('GET', $uri, [
            'headers' => $headers,
            'query' => $query,
        ]);

        return $this;
    }

    public function post()
    {
        //
    }

    /**
     * Regresa el objeto respuesta con toda su informacion
     *
     * @return \GuzzleHttp\Psr7\Response
     */
    public function response()
    {
        return $this->response;
    }

    /**
     * Regresa el body del request
     *
     * @return \GuzzleHttp\Psr7\Stream
     */
    public function body()
    {
        return $this->response->getBody();
    }

    /**
     * Regresa el contenido de la respuesta en su formato original
     *
     * @return string
     */
    public function content()
    {
        return $this->body()->getContents();
    }

    /**
     * Toma la respuesta en JSON string y la convierte en
     * array
     *
     * @return array
     */
    public function json()
    {
        return json_decode($this->content(), true);
    }
}
