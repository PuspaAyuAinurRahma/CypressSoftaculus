const test_base_uri = Cypress.env('baseUrl');
describe('Kode Promo', function () {
    it('Cek tampilam kode promo', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#gunakan-kupon')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
        cy.get('#alert_error')
            .should('to.contain','Kamu harus login dulu sob! Baru bisa gunakan kode promo');
        cy.get('.btn-login > .btn')
            .should('be.disabled');
        cy.wait(2000);
        cy.get(':nth-child(2) > label')
            .should('to.contain', 'Email');
        cy.get(':nth-child(2) > .form-control')
            .type('mala@jagoanhosting.com');
        cy.get(':nth-child(3) > label')
            .should('to.contain', 'Password');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('#Lupa_Password')
            .should('to.contain', 'Lupa Password?');
        cy.get('.modal-footer > .row > .col-md-12')
            .should('to.contain', 'Belum punya akun?');
        cy.get('#register-btn')
            .should('to.contain', 'Daftar Akun Baru');
        cy.get('.btn-login > .btn')
            .click();

        cy.get('.col-md-8 > .form-group > .form-control')
            .should('exist');
        cy.get('[name="cek-kupon"]')
            .should('to.contain','Gunakan')
            .should('be.disabled');
        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000DISCIDFAME');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-popup')
            .should('to.contain','Kode promo berhasil digunakan');
        cy.get('.swal2-confirm')
            .click();
        cy.get('[name="cek-kupon"]')
            .should('not.to','exist');
        cy.get('.show-promo')
            .should('exist');
        cy.get('.show-promo > :nth-child(1) > .title')
            .should('to.contain','Voucher Diskon');
        cy.get('.show-promo > :nth-child(2) > :nth-child(1)')
            .should('to.contain','000DISCIDFAME');
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 50.000');

        cy.get('.subtotal > :nth-child(1) > :nth-child(2)')
            .should('to.contain','Rp. 94.000');
        cy.get('.subtotal > :nth-child(2) > :nth-child(2)')
            .should('to.contain','Rp. 9.400');
        cy.get('.price')
            .should('to.contain','Rp. 103.400');

        //Ganti billing cycle
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li')
            .click()
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 0');

        cy.get('.remove-promo > .fas')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('#item-cart > :nth-child(2)')
            .should('not.to','exist');

        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000-DISC-VPS-KECE');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-popup')
            .should('to.contain','Kode promo berhasil digunakan');
        cy.get('.swal2-confirm')
            .click();
    });
    it('Cek kode promo requires percentage', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#gunakan-kupon')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
        cy.get('#alert_error')
            .should('to.contain','Kamu harus login dulu sob! Baru bisa gunakan kode promo');
        cy.get('.btn-login > .btn')
            .should('be.disabled');
        cy.wait(2000);
        cy.get(':nth-child(2) > label')
            .should('to.contain', 'Email');
        cy.get(':nth-child(2) > .form-control')
            .type('mala@jagoanhosting.com');
        cy.get(':nth-child(3) > label')
            .should('to.contain', 'Password');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('#Lupa_Password')
            .should('to.contain', 'Lupa Password?');
        cy.get('.modal-footer > .row > .col-md-12')
            .should('to.contain', 'Belum punya akun?');
        cy.get('#register-btn')
            .should('to.contain', 'Daftar Akun Baru');
        cy.get('.btn-login > .btn')
            .click();

        cy.get('.col-md-8 > .form-group > .form-control')
            .should('exist');
        cy.get('[name="cek-kupon"]')
            .should('to.contain','Gunakan')
            .should('be.disabled');
        cy.get('.col-md-8 > .form-group > .form-control')
            .type('01-FAMETEST');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-popup')
            .should('to.contain','Kode promo berhasil digunakan');
        cy.get('.swal2-confirm')
            .click();
        cy.get('[name="cek-kupon"]')
            .should('not.to','exist');
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 0');
        cy.get('.show-promo > :nth-child(1) > .title')
            .should('to.contain','Voucher Diskon');

        //Tambah layanan superstar
        cy.get('#tambahLayanan')
            .click()
            .should(() => {
                expect('#myModal > .modal-dialog > .modal-content > .modal-body').to.exist;
            });
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
            .click();
        cy.get('#item-cart > :nth-child(2) > .justify-space-between > :nth-child(2)')
            .should('to.contain','Rp. 600.000');

        cy.get('.show-promo > :nth-child(3) > .sub-title')
            .should('to.contain','Diskon Potongan 50 % x 1');
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 72.000');
        cy.get('.price')
            .should('to.contain','Rp. 739.200');

        cy.get('#panel0 > .panel-heading > .flex-row > .header-right-panel > .flex > .maximize-icon > .fas')
            .click();
        cy.get('#panel0 > .panel-body > .maximize-panel > :nth-child(2) > .section-billingcycle > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('#panel0 > .panel-body > .maximize-panel > :nth-child(2) > .section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 0');
        cy.get('.price')
            .should('to.contain','Rp. 676.500');

    });
    it('Cek kode promo apply once', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress-apply-once.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#gunakan-kupon')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
        cy.get('#alert_error')
            .should('to.contain','Kamu harus login dulu sob! Baru bisa gunakan kode promo');
        cy.get('.btn-login > .btn')
            .should('be.disabled');
        cy.wait(2000);
        cy.get(':nth-child(2) > label')
            .should('to.contain', 'Email');
        cy.get(':nth-child(2) > .form-control')
            .type('mala@jagoanhosting.com');
        cy.get(':nth-child(3) > label')
            .should('to.contain', 'Password');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('#Lupa_Password')
            .should('to.contain', 'Lupa Password?');
        cy.get('.modal-footer > .row > .col-md-12')
            .should('to.contain', 'Belum punya akun?');
        cy.get('#register-btn')
            .should('to.contain', 'Daftar Akun Baru');
        cy.get('.btn-login > .btn')
            .click();

        cy.get('.col-md-8 > .form-group > .form-control')
            .should('exist');
        cy.get('[name="cek-kupon"]')
            .should('to.contain','Gunakan')
            .should('be.disabled');
        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000DISCIDFAME104B3E72');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-popup')
            .should('to.contain','Kode promo berhasil digunakan');
        cy.get('.swal2-confirm')
            .click();
        cy.get('[name="cek-kupon"]')
            .should('not.to','exist');
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 0');
        cy.get('.show-promo > :nth-child(1) > .title')
            .should('to.contain','Voucher Diskon');

        //Tambah layanan superstar
        cy.get('#tambahLayanan')
            .click()
            .should(() => {
                expect('#myModal > .modal-dialog > .modal-content > .modal-body').to.exist;
            });
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('#panel2 > .panel-body > .maximize-panel > :nth-child(1) > .section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
            .click();
        cy.get('#item-cart > :nth-child(2) > .justify-space-between > :nth-child(2)')
            .should('to.contain','Rp. 600.000');

        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 50.000');
        cy.get('.price')
            .should('to.contain','Rp. 1.075.800');

        //Tambah layanan id fame
        cy.get('#tambahLayanan')
            .click()
            .should(() => {
                expect('#myModal > .modal-dialog > .modal-content > .modal-body').to.exist;
            });
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 50.000');
        cy.get('.price')
            .should('to.contain','Rp. 1.234.200');

        cy.get('#panel0 > .panel-heading > .flex-row > .header-right-panel > .flex > .maximize-icon > .fas')
            .click();
        cy.get('#panel0 > .panel-body > .maximize-panel > :nth-child(2) > .section-billingcycle > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('#panel0 > .panel-body > .maximize-panel > :nth-child(2) > .section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 0');
        cy.get('.price')
            .should('to.contain','Rp. 1.147.300');

    });
    it('Cek kode promo existing client and new sign up', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress-apply-once.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#gunakan-kupon')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
        cy.get('#alert_error')
            .should('to.contain','Kamu harus login dulu sob! Baru bisa gunakan kode promo');
        cy.get('.btn-login > .btn')
            .should('be.disabled');
        cy.wait(2000);
        cy.get(':nth-child(2) > label')
            .should('to.contain', 'Email');
        cy.get(':nth-child(2) > .form-control')
            .type('mala@jagoanhosting.com');
        cy.get(':nth-child(3) > label')
            .should('to.contain', 'Password');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('#Lupa_Password')
            .should('to.contain', 'Lupa Password?');
        cy.get('.modal-footer > .row > .col-md-12')
            .should('to.contain', 'Belum punya akun?');
        cy.get('#register-btn')
            .should('to.contain', 'Daftar Akun Baru');
        cy.get('.btn-login > .btn')
            .click();

        cy.get('.col-md-8 > .form-group > .form-control')
            .should('exist');
        cy.get('[name="cek-kupon"]')
            .should('to.contain','Gunakan')
            .should('be.disabled');
        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000IDFAMELA');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-popup')
            .should('to.contain','Kode promo berhasil digunakan');
        cy.get('.swal2-confirm')
            .click();
        cy.get('[name="cek-kupon"]')
            .should('not.to','exist');
        cy.get('.show-promo > :nth-child(2) > :nth-child(2)')
            .should('to.contain','- Rp. 50.000');
        cy.get('.show-promo > :nth-child(1) > .title')
            .should('to.contain','Voucher Diskon');

        cy.get('.remove-promo > .fas')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('#item-cart > :nth-child(2)')
            .should('not.to','exist');

        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000FAMENEWSIGNUP');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-popup')
            .should('to.contain','Promosi hanya untuk Pengguna Baru');
        cy.get('.swal2-confirm')
            .click();

        //Logout
        cy.get('#Secondary_Navbar-Account > .dropdown-toggle')
            .click();
        cy.get('#Secondary_Navbar-Account-Logout > a')
            .click();

        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#gunakan-kupon')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
        cy.get('#alert_error')
            .should('to.contain','Kamu harus login dulu sob! Baru bisa gunakan kode promo');
        cy.get('.btn-login > .btn')
            .should('be.disabled');
        cy.wait(2000);
        cy.get(':nth-child(2) > label')
            .should('to.contain', 'Email');
        cy.get(':nth-child(2) > .form-control')
            .type('puspaayurahma62@gmail.com');
        cy.get(':nth-child(3) > label')
            .should('to.contain', 'Password');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('Jagoan123');
        cy.get('.btn-login > .btn')
            .click();

        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000IDFAMELA');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('#swal2-content')
            .should('exist');
        cy.get('.swal2-confirm')
            .click();

        cy.get('.col-md-8 > .form-group > .form-control').clear();
        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000FAMENEWSIGNUP');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-popup')
            .should('to.contain','Kode promo berhasil digunakan');

    });
    it('Cek kode promo aplly once per client', function () {
            cy.visit(test_base_uri+'/orders/products/421');
            cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
                .type('cypress-apply-once.com');
            cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
                .click();
            cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
                .select('2 Tahun');
            cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
                .click();
            cy.get('#gunakan-kupon')
                .click();
            cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
                .should('to.contain', 'Masuk Akun');
            cy.get('#alert_error')
                .should('to.contain','Kamu harus login dulu sob! Baru bisa gunakan kode promo');
            cy.get('.btn-login > .btn')
                .should('be.disabled');
            cy.wait(2000);
            cy.get(':nth-child(2) > label')
                .should('to.contain', 'Email');
            cy.get(':nth-child(2) > .form-control')
                .type('mala@jagoanhosting.com');
            cy.get(':nth-child(3) > label')
                .should('to.contain', 'Password');
            cy.get('#login-form > :nth-child(3) > .form-control')
                .type('jagoan123');
            cy.get('#Lupa_Password')
                .should('to.contain', 'Lupa Password?');
            cy.get('.modal-footer > .row > .col-md-12')
                .should('to.contain', 'Belum punya akun?');
            cy.get('#register-btn')
                .should('to.contain', 'Daftar Akun Baru');
            cy.get('.btn-login > .btn')
                .click();

            cy.get('.col-md-8 > .form-group > .form-control')
                .should('exist');
            cy.get('[name="cek-kupon"]')
                .should('to.contain','Gunakan')
                .should('be.disabled');
            cy.get('.col-md-8 > .form-group > .form-control')
                .type('000FAMELALALA');
            cy.get('[name="cek-kupon"]')
                .click();
            cy.get('.swal2-popup')
                .should('to.contain','Kode Promo Hanya Bisa Digunakan 1 kali');

        });
    it('Cek kode promo maximum uses', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress-apply-once.com');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control')
            .select('2 Tahun');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#gunakan-kupon')
            .click();
        cy.get('#login-modals > .modal-dialog > .modal-content > .modal-header')
            .should('to.contain', 'Masuk Akun');
        cy.get('#alert_error')
            .should('to.contain','Kamu harus login dulu sob! Baru bisa gunakan kode promo');
        cy.get('.btn-login > .btn')
            .should('be.disabled');
        cy.wait(2000);
        cy.get(':nth-child(2) > label')
            .should('to.contain', 'Email');
        cy.get(':nth-child(2) > .form-control')
            .type('mala@jagoanhosting.com');
        cy.get(':nth-child(3) > label')
            .should('to.contain', 'Password');
        cy.get('#login-form > :nth-child(3) > .form-control')
            .type('jagoan123');
        cy.get('#Lupa_Password')
            .should('to.contain', 'Lupa Password?');
        cy.get('.modal-footer > .row > .col-md-12')
            .should('to.contain', 'Belum punya akun?');
        cy.get('#register-btn')
            .should('to.contain', 'Daftar Akun Baru');
        cy.get('.btn-login > .btn')
            .click();

        cy.get('.col-md-8 > .form-group > .form-control')
            .should('exist');
        cy.get('[name="cek-kupon"]')
            .should('to.contain','Gunakan')
            .should('be.disabled');
        cy.get('.col-md-8 > .form-group > .form-control')
            .type('000FAMELAL');
        cy.get('[name="cek-kupon"]')
            .click();
        cy.get('.swal2-popup')
            .should('to.contain','Kode promo sudah habis');

    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
});