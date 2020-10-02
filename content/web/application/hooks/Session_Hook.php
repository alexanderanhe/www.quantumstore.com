<?php
defined('BASEPATH') or exit('No direct script access allowed');

use qrewards\Api\Session as SessionApi;

class Session_Hook
{
    private $CI;

    /**
     * Metodo para el checkeo del token almacenado en la cookie
     */
    public function check_session()
    {
        $data = [];
        $this->CI = &get_instance();
        $this->CI->load->helper('cookie');
        $token = $this->CI->input->cookie('jwt', true);
        $validate = $this->validate_session($token);

        if ((!empty($token) && $validate) && empty($this->CI->session->userdata['token'])) {
            $data = $validate;
            $data['token'] = $token;
            $this->CI->session->set_userdata($data);
            $redirect = true;
        }

        if ((empty($token) || !$validate) && !empty($this->CI->session->userdata)) {
            $delete_data = [];
            $this->CI->session->set_userdata($delete_data);
        }

        if (!$this->CI->input->is_ajax_request()) {
            $this->CI->session->set_userdata($data);
            if (isset($redirect)) {
                redirect(current_url());
            }
        }
    }

    private function validate_session($token)
    {
        $token = (!empty($token)) ? $token : '';
        if (empty($token)) {
            return false;
        }
        $check_Session = new SessionApi;
        $session = $check_Session->getSession($token);
        if (!empty($session['data'])) {
            return $session['data'];
        }
        return false;
    }
}
