<?php
namespace qrewards\Api;

interface HttpClientInterface
{
    /**
     *  Get Request
     *
     * @param $uri
     * @param $query
     * @param $headers
     */
    public function get($uri, $query = [], $headers = []);

    /**
     * Post Request
     */
    public function post();

}
