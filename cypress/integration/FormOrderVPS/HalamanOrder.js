const test_base_uri = Cypress.env('baseUrl');
describe('Halaman Order', function () {
    it('Cek Tampilan', function () {
        cy.visit(test_base_uri+'/orders/products/573');
        cy.get('.header-left-panel > .title')
            .contains('Layanan yang kamu beli - VPS X');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .should('exist');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li > .option > .title')
            .contains('X1');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .contains('X1');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(2)')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li > .option > .title')
            .contains('X2');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .contains('X2');
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(1)')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li')
            .should('exist');
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li > .option > .title')
            .contains('1 Bulan');
        cy.get(':nth-child(3) > .sub-title')
            .contains('Reg. Satu Bulanan');
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(2)')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li > .option > .title')
            .contains('3 Bulan');
        cy.get(':nth-child(3) > .sub-title')
            .contains('Reg. Tiga Bulanan');
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .select_ul > :nth-child(3)')
            .click();
        cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li > .option > .title')
            .contains('6 Bulan');
        cy.get(':nth-child(3) > .sub-title')
            .contains('Reg. Enam Bulanan');

        cy.get('.section-ip > .form-title')
            .contains('IP Server');
        cy.get('.detail-performance > :nth-child(1)')
            .should('exist');
        cy.get(':nth-child(1) > .container-checkbox > .checkmark')
            .should('exist');
        cy.get(':nth-child(1) > .container-checkbox')
            .contains('IP Private');
        cy.get('.ip-public')
            .should('exist');
        cy.get('.ip-public > .container-checkbox > .checkmark')
            .should('exist');
        cy.get('.ip-public > .container-checkbox')
            .contains('IP Public');

        cy.get('.col-md-4 > .form-title')
            .contains('Konfigurasi VPS');
        cy.get('.section-konfigurasi > :nth-child(1) > .col-md-8')
            .should('exist');
        cy.get('.progressbar > .active')
            .should('have.class','active');
        cy.get('#content > h4.form-title')
            .contains('Pilih X-Cube (Konten VPS)');
        cy.get(':nth-child(1) > .active > a')
            .contains('Aplikasi');

        //Wordpress
        cy.get('#content-hostname > .form-title')
            .contains('VPS Kredensial');
        cy.get('#content-hostname > .panel-body > form > :nth-child(1) > .col-md-8 > .form-control')
            .type('admin.coba.com');
        cy.get(':nth-child(2) > .col-md-8 > .form-control')
            .type('Cypress12345;:""');
        cy.get('.text-right > .btn-default')
            .contains('Pilih X-Cube');
        cy.get('.text-right > .btn-default')
            .click();

        cy.get('#aio-0 > .template-container > .row > :nth-child(1) > .template')
            .should('exist');
        cy.get(':nth-child(1) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('wordpress');
        cy.get(':nth-child(1) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get('#aio-0 > .template-container > .row > :nth-child(1) > .template')
            .click();
        cy.get('#aio-0 > .template-container > .row > :nth-child(1) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(1) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/wordpress/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih wordpress
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('wordpress - Centos 7');

        cy.get('.text-right > .btn-default')
            .click();
        cy.get('#content-konfigurasi > .form-title')
            .contains('Pengaturan X-Cube');
        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Openlite
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(2) > .template')
            .should('exist');
        cy.get(':nth-child(2) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('openlitespeed');
        cy.get(':nth-child(2) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get('#aio-0 > .template-container > .row > :nth-child(2) > .template')
            .click();
        cy.get('#aio-0 > .template-container > .row > :nth-child(2) > .template > .col-md-3 > .detail-class')
            .should('not.exist');
        //Cek cart ketika memilih Openlite
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('openlitespeed - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Codeigniter
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.text-right > .btn-default')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(3) > .template')
            .should('exist');
        cy.get(':nth-child(3) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('codeigniter');
        cy.get(':nth-child(3) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get('#aio-0 > .template-container > .row > :nth-child(3) > .template')
            .click();
        cy.get('#aio-0 > .template-container > .row > :nth-child(3) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(3) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/codeigniter/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih codeigniter
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('codeigniter - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Laravel
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.text-right > .btn-default')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(4) > .template')
            .should('exist');
        cy.get(':nth-child(4) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('laravel');
        cy.get(':nth-child(4) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get('#aio-0 > .template-container > .row > :nth-child(4) > .template')
            .click();
        cy.get('#aio-0 > .template-container > .row > :nth-child(4) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(4) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/laravel/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih laravel
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('laravel - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Wordpress Ubuntu
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.text-right > .btn-default')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(5) > .template')
            .should('exist');
        cy.get(':nth-child(5) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('wordpress');
        cy.get(':nth-child(5) > .template > .col-md-7 > .text > p')
            .contains('Ubuntu 18.04');
        cy.get('#aio-0 > .template-container > .row > :nth-child(5) > .template')
            .click();
        cy.get('#aio-0 > .template-container > .row > :nth-child(5) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(5) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/wordpress/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih wordpress ubuntu
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('wordpress - Ubuntu 18.04');

        cy.get('.text-right > .btn-default')
            .click();
        cy.get('#content-konfigurasi > .form-title')
            .contains('Pengaturan X-Cube');
        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Prestashop
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(6) > .template')
            .should('exist');
        cy.get(':nth-child(6) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('prestashop');
        cy.get(':nth-child(6) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get('#aio-0 > .template-container > .row > :nth-child(6) > .template')
            .click();
        cy.get('#aio-0 > .template-container > .row > :nth-child(6) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(6) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/prestashop/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih prestashop
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('prestashop - Centos 7');

        cy.get('.text-right > .btn-default')
            .click();
        cy.get('#content-konfigurasi > .form-title')
            .contains('Pengaturan X-Cube');
        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Joomla
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(7) > .template')
            .should('exist');
        cy.get(':nth-child(7) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('joomla');
        cy.get(':nth-child(7) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get('#aio-0 > .template-container > .row > :nth-child(7) > .template')
            .click();
        cy.get('#aio-0 > .template-container > .row > :nth-child(7) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(7) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/joomla/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih joomla
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('joomla - Centos 7');

        cy.get('.text-right > .btn-default')
            .click();
        cy.get('#content-konfigurasi > .form-title')
            .contains('Pengaturan X-Cube');
        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Drupal
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(8) > .template')
            .should('exist');
        cy.get(':nth-child(8) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('drupal');
        cy.get(':nth-child(8) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get('#aio-0 > .template-container > .row > :nth-child(8) > .template')
            .click();
        cy.get('#aio-0 > .template-container > .row > :nth-child(8) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(8) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/drupal/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih drupal
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('drupal - Centos 7');

        cy.get('.text-right > .btn-default')
            .click();
        cy.get('#content-konfigurasi > .form-title')
            .contains('Pengaturan X-Cube');
        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Nextcloud
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get(':nth-child(9) > .template')
            .should('exist');
        cy.get(':nth-child(9) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('nextcloud');
        cy.get(':nth-child(9) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get(':nth-child(9) > .template')
            .click();
        cy.get(':nth-child(9) > .template > .col-md-3 > .detail-class')
            .should('not.exist');
        //Cek cart ketika memilih nextcloud
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('nextcloud - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Moodle
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.text-right > .btn-default')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get(':nth-child(10) > .template')
            .should('exist');
        cy.get(':nth-child(10) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('moodle');
        cy.get(':nth-child(10) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get(':nth-child(10) > .template')
            .click();
        cy.get(':nth-child(10) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(10) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/moodle/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih moodle
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('moodle - Centos 7');

        cy.get('.text-right > .btn-default')
            .click();
        cy.get('#content-konfigurasi > .form-title')
            .contains('Pengaturan X-Cube');
        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Opencart
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get(':nth-child(11) > .template')
            .should('exist');
        cy.get(':nth-child(11) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('opencart');
        cy.get(':nth-child(11) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get(':nth-child(11) > .template')
            .click();
        cy.get(':nth-child(11) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(11) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/opencart/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih opencart
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('opencart - Centos 7');

        cy.get('.text-right > .btn-default')
            .click();
        cy.get('#content-konfigurasi > .form-title')
            .contains('Pengaturan X-Cube');
        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Coba
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .click();
        cy.get('.section-konfigurasi > :nth-child(3) > :nth-child(1) > .btn')
            .should('exist');
        cy.get(':nth-child(11) > .template')
            .should('exist');
        cy.get(':nth-child(12) > .template')
            .should('exist');
        cy.get(':nth-child(12) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('coba');
        cy.get(':nth-child(12) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get(':nth-child(12) > .template')
            .click();
        cy.get(':nth-child(12) > .template > .col-md-3 > .detail-class')
            .should('not.exist');
        //Cek cart ketika memilih opencart
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('coba - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Lamp Centos
        cy.get(':nth-child(13) > .template')
            .should('exist');
        cy.get(':nth-child(13) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('lamp');
        cy.get(':nth-child(13) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get(':nth-child(13) > .template')
            .click();
        cy.get(':nth-child(13) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(13) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/lamp-centos-7/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih lamp centos 7
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('lamp - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Lamp Ubuntu
        cy.get(':nth-child(14) > .template')
            .should('exist');
        cy.get(':nth-child(14) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('LAMP');
        cy.get(':nth-child(14) > .template > .col-md-7 > .text > p')
            .contains('Ubuntu 18.04');
        cy.get(':nth-child(14) > .template')
            .click();
        cy.get(':nth-child(14) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(14) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/lamp-ubuntu-18/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih lamp ubuntu 18
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('LAMP - Ubuntu 18.04');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Lemp Centos
        cy.get(':nth-child(15) > .template')
            .should('exist');
        cy.get(':nth-child(15) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('LEMP');
        cy.get(':nth-child(15) > .template > .col-md-7 > .text > p')
            .contains('Centos 7');
        cy.get(':nth-child(15) > .template')
            .click();
        cy.get(':nth-child(15) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(15) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/lemp-centos-7/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih lemp centos 7
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('LEMP - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Lemp Ubuntu
        cy.get(':nth-child(16) > .template')
            .should('exist');
        cy.get(':nth-child(16) > .template > .col-md-7 > .text > .text-capitalize')
            .contains('LEMP');
        cy.get(':nth-child(16) > .template > .col-md-7 > .text > p')
            .contains('Ubuntu 18.04');
        cy.get(':nth-child(16) > .template')
            .click();
        cy.get(':nth-child(16) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#aio-0 > .template-container > .row > :nth-child(16) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/vps-apps/lemp-ubuntu-18/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih lemp ubuntu 18
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('LEMP - Ubuntu 18.04');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        cy.get('.panel-body > :nth-child(1) > :nth-child(2) > a')
            .contains('OS + Panel');
        cy.get('.panel-body > :nth-child(1) > :nth-child(2) > a')
            .click();
        // Cpanel
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(1) > .template')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(1) > .template > .col-md-7 > .text > h3')
            .contains('Cpanel');
        cy.get('.row > :nth-child(1) > .template > .form-control')
            .contains('Centos 7');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(1) > .template')
            .click();
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(1) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(1) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/os-panel/cpanel/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih cpanel
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Cpanel - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Plesk
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(2) > .template')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(2) > .template > .col-md-7 > .text > h3')
            .contains('Plesk');
        cy.get('.row > :nth-child(2) > .template > .form-control')
            .contains('CentOS 7');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(2) > .template')
            .click();
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(2) > .template > .col-md-3 > .detail-class')
            .should('not.exist');
        //Cek cart ketika memilih plesk
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Plesk - CentOS 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // VestaCP
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(3) > .template')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(3) > .template > .col-md-7 > .text > h3')
            .contains('VestaCP');
        cy.get('.row > :nth-child(3) > .template > .form-control')
            .contains('CentOS 7');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(3) > .template')
            .click();
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(3) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(3) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/os-panel/vestacp/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih vestacp
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('VestaCP - CentOS 7');
        cy.get('div > .checked')
            .find('select.form-control.dropdown-panel')
            .select('Ubuntu 18.04');
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('VestaCP - Ubuntu 18.04');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Webuzo
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(4) > .template')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(4) > .template > .col-md-7 > .text > h3')
            .contains('Webuzo');
        cy.get('.row > :nth-child(4) > .template > .form-control')
            .contains('CentOS 7');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(4) > .template')
            .click();
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(4) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(4) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/os-panel/webuzo/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih webuzo
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Webuzo - CentOS 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // VestaCP Ubuntu
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(5) > .template')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(5) > .template > .col-md-7 > .text > h3')
            .contains('Vestacp');
        cy.get('.row > :nth-child(5) > .template > .form-control')
            .contains('Ubuntu 18.04');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(5) > .template')
            .click();
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(5) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(5) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/os-panel/vestacp/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih vestacp ubuntu
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Vestacp - Ubuntu 18.04');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // CentOS Web Panel
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(6) > .template')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(6) > .template > .col-md-7 > .text > h3')
            .contains('CentOS Web Panel');
        cy.get('.row > :nth-child(6) > .template > .form-control')
            .contains('Centos 7');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(6) > .template')
            .click();
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(6) > .template > .col-md-3 > .detail-class')
            .should('not.exist');
        //Cek cart ketika memilih web panel
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('CentOS Web Panel - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Webmin
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(7) > .template')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(7) > .template > .col-md-7 > .text > h3')
            .contains('Webmin');
        cy.get('.row > :nth-child(7) > .template > .form-control')
            .contains('Centos 7');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(7) > .template')
            .click();
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(7) > .template > .col-md-3 > .detail-class')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(7) > .template > .col-md-3 > .detail-class > .cursor-pointer')
            .should('have.attr', 'href', 'http://docs.jagoanhosting.com/docs/vps-x/x-cube/os-panel/webmin/?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/')
            .and('have.attr','target','_blank');
        //Cek cart ketika memilih webmin
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Webmin - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        // Interworx
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(8) > .template')
            .should('exist');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(8) > .template > .col-md-7 > .text > h3')
            .contains('Interworx');
        cy.get('.row > :nth-child(8) > .template > .form-control')
            .contains('Centos 7');
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(8) > .template')
            .click();
        cy.get('#ospanel-0 > .template-container > .row > :nth-child(8) > .template > .col-md-3 > .detail-class')
            .should('not.exist');
        //Cek cart ketika memilih Interworx
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Interworx - Centos 7');

        cy.get('.text-right > .btn-orange')
            .should('exist');

        cy.get('.panel-body > :nth-child(1) > :nth-child(3) > a')
            .contains('OS Only');
        cy.get('.panel-body > :nth-child(1) > :nth-child(3) > a')
            .click();
        cy.get('#os-0 > .nav > .active > a')
            .contains('64 bit OS');

        // Debian
        cy.get(':nth-child(1) > .template')
            .should('exist');
        cy.get(':nth-child(1) > .template > .col-md-7 > .text > h3')
            .contains('Debian');
        cy.get(':nth-child(1) > .template > .form-control')
            .contains('10');
        //Cek debian di cart
        cy.get('#64bit-0[data-bit=x64]')
            .find('.template[data-template=Debian]')
            .click();
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Debian 10');
        cy.get('div > .checked')
            .find('select.form-control.dropdown-panel')
            .select('8');
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Debian 8');

        // Centos
        cy.get(':nth-child(2) > .template')
            .should('exist');
        cy.get(':nth-child(2) > .template > .col-md-7 > .text > h3')
            .contains('Centos');
        cy.get(':nth-child(1) > .template > .form-control')
            .contains('7');
        //Cek centos di cart
        cy.get('#64bit-0[data-bit=x64]')
            .find('.template[data-template=Centos]')
            .click();
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Centos 7');
        cy.get('div > .checked')
            .find('select.form-control.dropdown-panel')
            .select('8');
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Centos 8');

        // Ubuntu
        cy.get(':nth-child(3) > .template')
            .should('exist');
        cy.get(':nth-child(3) > .template > .col-md-7 > .text > h3')
            .contains('Ubuntu');
        cy.get(':nth-child(3) > .template > .form-control')
            .contains('16.04');
        //Cek Ubuntu di cart
        cy.get('#64bit-0[data-bit=x64]')
            .find('.template[data-template=Ubuntu]')
            .click();
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Ubuntu 16.04');
        cy.get('div > .checked')
            .find('select.form-control.dropdown-panel')
            .select('14.04');
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Ubuntu 14.04');
        cy.get('div > .checked')
            .find('select.form-control.dropdown-panel')
            .select('18.04');
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Ubuntu 18.04');

        cy.get('#os-0 > .nav > :nth-child(1) > a')
            .contains('32 bit OS');
        cy.get('#os-0 > .nav > :nth-child(1) > a')
            .click();

        // Debian
        cy.get(':nth-child(1) > .template')
            .should('exist');
        cy.get(':nth-child(1) > .template > .col-md-7 > .text > h3')
            .contains('Debian');
        cy.get(':nth-child(1) > .template > .form-control')
            .contains('8');
        //Cek debian di cart
        cy.get('#32bit-0[data-bit=x32]')
            .find('.template[data-template=Debian]')
            .click();
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Debian 8');

        // Ubuntu
        cy.get(':nth-child(2) > .template')
            .should('exist');
        cy.get(':nth-child(2) > .template > .col-md-7 > .text > h3')
            .contains('Ubuntu');
        cy.get(':nth-child(2) > .template > .form-control')
            .contains('14.04');
        //Cek ubuntu di cart
        cy.get('#32bit-0[data-bit=x32]')
            .find('.template[data-template=Ubuntu]')
            .click();
        cy.get('#item-cart > .item > :nth-child(3)')
            .contains('Ubuntu 14.04');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});