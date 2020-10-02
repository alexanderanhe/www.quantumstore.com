$(function () {
    if (this_page === "login") {
        $(".error_login").hide();
        $("#login_email").focus(() => {
            $(".error_login").hide();
        });
        $("#login_password").focus(() => {
            $(".error_login").hide();
        });
        $("#customer_login").validate({
            rules: {
                login_email: {
                    required: true,
                },
                login_password: {
                    required: true,
                },
            },
            messages: {
                login_email: {
                    required: "Email Requerido",
                },
                login_password: {
                    required: "Contraseña requerida",
                },
            },
        });
        // Click on login button
        $(".login-btn").click((e) => {
            e.preventDefault();
            if ($("#customer_login").valid()) {
                var username = $("#login_email").val(),
                    password = $("#login_password").val();
                doLogin(username, password);
            }
        });
    } else if (this_page === "account") {
        $(".error_register").hide();
        $("#register_username").focus(() => {
            $(".error_register").hide();
        });
        $("#register_email").focus(() => {
            $(".error_register").hide();
        });

        function validateCaptcha() {
            $('#hiddenRecaptcha').valid();
          };

        // Add Methods
        $.validator.addMethod(
            "regex",
            function(value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );

        $("#customer_register").validate({
            ignore: ".ignore",
            rules: {
                register_username: {
                    required: true,
                    minlength: 6,
                },
                register_name: {
                    required: true,
                },
                register_lastname: {
                    required: true,
                },
                register_secondname: {
                    required: true,
                },
                register_gender: {
                    required: true,
                },
                register_birthdate: {
                    required: true,
                    regex: "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$"
                },
                register_email: {
                    required: true,
                    email: true
                },
                register_phone: {
                    required: true,
                },
                register_password: {
                    required: true,
                    minlength: 8,
                    maxlength: 20,
                    regex: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
                },
                register_cpassword: {
                    required: true,
                    minlength: 8,
                    maxlength: 20,
                    equalTo: '#register_password'
                },
                hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() == '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
            },
            messages: {
                register_username: {
                    required: "Nombre de usuario requerido",
                    minlength: "El usuario debe ser de al menos 6 caracteres",
                },
                register_name: {
                    required: "Nombre requerido",
                },
                register_lastname: {
                    required: "Apellido paterno requerido",
                },
                register_secondname: {
                    required: "Apellido materno requerido",
                },
                register_gender: {
                    required: "Debe escoger un sector de género obligatoriamente.",
                },
                register_birthdate: {
                    required: "Indique su fecha de nacimiento",
                    regex: "Formato incorrecto YYYY-MM-DD"
                },
                register_email: {
                    required: "Correo requerido",
                },
                register_phone: {
                    required: " Teléfono requerido",
                },
                register_password: {
                    required: "Por favor indique una contraseña",
                    minlength: "La contraseña debe ser de 8 a 20 caracteres y tener mayúsculas, minúsculas y digitos",
                    regex: "La contraseña debe ser de 8 a 20 caracteres y tener mayúsculas, minúsculas y digitos"
                },
                register_cpassword: {
                    required: "Por favor indique una contraseña",
                    minlength: "La contraseña debe ser de 8 a 20 caracteres y tener mayúsculas, minúsculas y digitos",
                    equalTo: "Las contraseñas no coinciden",
                },
                hiddenRecaptcha: {
                    required: "reCaptcha no verificado"
                }
            },
        });
        // Click on login button
        $(".register-btn").click((e) => {
            e.preventDefault();
            if ($("#customer_register").valid()) {
                doRegister({
                    username: $('#register_username').val(),
                    name: $('#register_name').val(),
                    lastName: [$('#register_lastname').val(), $('#register_secondname').val()].join(),
                    birthdate: $('#register_birthdate').val(),
                    gender: $('#register_gender input:checked').val(),
                    email: $('#register_email').val(),
                    phone: $('#register_phone').val(),
                    password: $('#register_password').val(),
                    'g-recaptcha-response': grecaptcha.getResponse()
                });
            }
        });
    } else if (this_page === "verify-email") {
        $(".error_verify").hide();
        $("#verify_token").focus(() => {
            $(".error_verify").hide();
        });

        $("#customer_verify").validate({
            ignore: ".ignore",
            rules: {
                verify_token: {
                    required: true,
                },
            },
            messages: {
                verify_token: {
                    required: "Nombre de usuario requerido",
                },
            },
        });
        $( document ).ready(function() {
            if ($("#customer_verify").valid()) {
                doVerify( $('#verify_token').val());
            }
        });

        // Click on login button
        $(".verify-btn").click((e) => {
            e.preventDefault();
            if ($("#customer_verify").valid()) {
                doVerify( $('#verify_token').val());
            }
        });
    }
});
