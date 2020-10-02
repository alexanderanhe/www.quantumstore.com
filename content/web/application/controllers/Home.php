<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Home extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        date_default_timezone_set("America/Mexico_City");
    }

	public function index()
	{
		$this->load->view('home');
	}

    public function categories()
    {
        $this->load->view('categories');
    }

    public function cart()
    {
        $this->load->view('cart');
    }

    public function contact()
    {
        $this->load->view('contact');
    }

    public function view($id = null)
    {
        $data['itemId'] = $id;
        $this->load->view('view', $data);
    }

    public function order($id = null)
    {
        $data['orderId'] = $id;
        $this->load->view('order', $data);
    }

    public function faqs()
    {
        $this->load->view('faqs');
    }

    public function terminosycondiciones()
    {
        $this->load->view('terminos');
    }

    public function terminosycondicionesproductos()
    {
        $this->load->view('terminosproductos');
    }

    public function avisodeprivacidad()
    {
        $this->load->view('avisodeprivacidad');
    }

    public function account()
    {
        $this->load->view('account');
    }

    public function login()
    {
        $this->load->view('login');
    }

    public function verify_email()
    {
        $this->load->view('verify_email');
    }

    public function access_link()
    {
        $this->load->view('access_link');
    }

    public function download()
    {
        $this->load->view('download');
    }

    public function error()
    {
        $this->load->view('errors/html/error_404');
    }
}
