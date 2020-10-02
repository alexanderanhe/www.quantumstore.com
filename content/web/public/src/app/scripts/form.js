(function ($) {
    OpenPay.setId(openpay_id);
    OpenPay.setApiKey(openpay_public);
    OpenPay.setSandboxMode(!openpay_env);

    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || "");
            } else {
                o[this.name] = this.value || "";
            }
        });
        return o;
    };

    function doContact(data) {
        $.post(
            api_base_url + "notifications/contact",
            data,
            {
                "Content-Type": "application/json",
            },
            "json"
        )
            .done(function (data) {
                $("#newsletterform").each(function () {
                    this.reset();
                });
            })
            .fail(function (error) {
                console.log(error);
            });
    }
    window.doContact = doContact;

    function doSubscription(data) {
        $.post(
            api_base_url + "notifications/subscription",
            data,
            {
                "Content-Type": "application/json",
            },
            "json"
        )
            .done(function (data) {
                $("#newsletterform").each(function () {
                    this.reset();
                });
            })
            .fail(function (error) {
                console.log(error);
            });
    }
    window.doSubscription = doSubscription;

    $("#contactform").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 150,
            },
            email: {
                required: true,
                email: true,
                minlength: 2,
                maxlength: 100,
            },
            subject: {
                required: true,
                minlength: 2,
                maxlength: 100,
            },
            message: {
                required: true,
                minlength: 2,
                maxlength: 300,
            },
        },
        messages: {
            name: {
                required: "Nombre Requerido",
                minlength: "Minimo 2 caracteres",
                maxlength: "Maximo 150 caracteres",
            },
            email: {
                required: "Email Requerido",
                minlength: "Minimo 2 caracteres",
                email: "Email Invalido",
                maxlength: "Maximo 100 caracteres",
            },
            subject: {
                required: "Asunto Requerido",
                minlength: "Minimo 2 caracteres",
                maxlength: "Maximo 100 caracteres",
            },
            message: {
                required: "Mensaje Requerido",
                minlength: "Minimo 2 caracteres",
                maxlength: "Maximo 300 caracteres",
            },
        },
    });

    $("#buyForm").validate({
        rules: {
            socialName: {
                required: false,
                minlength: 6,
            },
            rfc: {
                required: false,
                minlength: 10,
            },
            cardName: {
                required: true,
                maxlength: 100,
            },
            cardNumber: {
                required: true,
                maxlength: 18,
            },
            yearCard: {
                required: true,
                maxlength: 2,
            },
            monthCard: {
                required: true,
                maxlength: 2,
            },
            cvvCard: {
                required: true,
                maxlength: 4,
            },
        },
        messages: {
            socialName: {
                required: "Requerido",
                minlength: "Minimo 6 caracteres",
            },
            rfc: {
                required: "Requerido",
                minlength: "Minimo 6 caracteres",
            },
            cardName: {
                required: "Nombre Requerido",
                maxlength: "Maximo 100 caracteres",
            },
            cardNumber: {
                required: "Numero de tarjeta Requerido",
                maxlength: "Maximo 18 caracteres",
            },
            yearCard: {
                required: "Año Requerido",
                maxlength: "Maximo 2 caracteres",
            },
            monthCard: {
                required: "Mes Requerido",
                maxlength: "Maximo 2 caracteres",
            },
            cvvCard: {
                required: "CVV Requerido",
                maxlength: "Maximo 4 caracteres",
            },
        },
    });

    $("#newsletterform").validate({
        rules: {
            emailNewsletter: {
                required: true,
                email: true,
                minlength: 2,
                maxlength: 100,
            },
        },
        messages: {
            emailNewsletter: {
                required: "Email Requerido",
                minlength: "Minimo 2 caracteres",
                email: "Email Invalido",
                maxlength: "Maximo 100 caracteres",
            },
        },
    });

    $("#newsletterformModal").validate({
        rules: {
            emailModalNewsletter: {
                required: true,
                email: true,
                minlength: 2,
                maxlength: 100,
            },
        },
        messages: {
            emailModalNewsletter: {
                required: "Email Requerido",
                minlength: "Minimo 2 caracteres",
                email: "Email Invalido",
                maxlength: "Maximo 100 caracteres",
            },
        },
    });

    // Click cart botton
    $(".btnDoCart").click((e) => {
        e.preventDefault();
        var deviceSessionId = OpenPay.deviceData.setup();
        if ($("#buyForm").valid()) {
            var dataForm = $("#buyForm").serializeFormJSON();
            var {
                cardName,
                cardNumber,
                yearCard,
                monthCard,
                cvvCard,
                socialName,
                rfc,
            } = dataForm;
            createCard(
                cardName,
                cardNumber,
                yearCard,
                monthCard,
                cvvCard,
                deviceSessionId,
                socialName,
                rfc
            );
        }
    });

    // Click on newsletter button
    $(".btnNewsletter").click((e) => {
        e.preventDefault();
        if ($("#newsletterform").valid()) {
            var data = $("#newsletterform").serializeFormJSON();
            data = { email: data.emailNewsletter };
            doSubscription(data);
        }
    });

    // Click on newsletter button
    $(".btnNewsletterModal").click((e) => {
        e.preventDefault();
        var checked = $("#checkBox1").prop("checked");
        if ($("#newsletterformModal").valid() && checked) {
            var data = $("#newsletterformModal").serializeFormJSON();
            data = { email: data.emailModalNewsletter };
            doSubscription(data);
            $(".Modalnewsletter").modal("hide");
        }
    });

    // Click on contact button
    $(".btnSendContact").click((e) => {
        e.preventDefault();
        if ($("#contactform").valid()) {
            var data = $("#contactform").serializeFormJSON();
            doContact(data);
        }
    });
})(jQuery);
