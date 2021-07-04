const test_base_uri = Cypress.env('baseUrl');
describe('Config Option', function () {
    it('Layanan Espresso', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#tambahLayanan')
            .click()
            .should(() => {
                expect('#myModal > .modal-dialog > .modal-content > .modal-body').to.exist;
            });
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(3) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="3"]')
            .click()
            .should(() => {
                expect('[data-index="1"]').to.exist;
            })
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(1) > .section-pilihpaket > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(1) > .section-pilihpaket > .dropdown_select_wrapper > .select_ul > :nth-child(4)')
            .click();
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(6) > .section-configoptions > .counter > .input-group > :nth-child(3) > .btn')
            .click();
        cy.get(':nth-child(2) > :nth-child(4) > .sub-title')
            .should('to.contain', 'Jumlah Akun: 2 x Akun');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(6) > .section-configoptions > .counter > .input-group > :nth-child(3) > .btn')
            .click();
        cy.get(':nth-child(2) > :nth-child(4) > .sub-title')
            .should('to.contain', 'Jumlah Akun: 3 x Akun');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(6) > .section-configoptions > .counter > .input-group > :nth-child(1) > .btn')
            .click();
        cy.get(':nth-child(2) > :nth-child(4) > .sub-title')
            .should('to.contain', 'Jumlah Akun: 2 x Akun');
        cy.get('#panel1 > .panel-body > .maximize-panel > :nth-child(6) > .section-configoptions > .counter > .input-group > :nth-child(1) > .btn')
            .click();
        cy.get(':nth-child(2) > :nth-child(4) > .sub-title')
            .should('to.contain', 'Jumlah Akun: 1 x Akun');
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .type("cypress-espresso-domain.com");
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .click()
            .should(() => {
                expect('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .name > .domain-name').to.exist;
                expect('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-col > .harga-asli').to.exist;
                expect('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .form-control').to.exist;
                expect('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange').to.exist;
            });
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.cart-summary-wrapper > .panel > .panel-body > :nth-child(2)')
            .should(() => {
                expect('.panel-body > :nth-child(2) > .title').to.exist;
                expect('.panel-body > :nth-child(2) > .flex > :nth-child(1)').to.exist;
                expect('.panel-body > :nth-child(2) > .flex > :nth-child(2)').to.exist;
                expect('.panel-body > :nth-child(2) > :nth-child(3) > :nth-child(1)').to.exist;
                expect('.panel-body > :nth-child(2) > :nth-child(3) > :nth-child(2)').to.exist;
            });
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)').should('to.contain', 'ESPRESSO');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)').should('to.contain','Rp. 40.000');
        cy.get('#item-cart > :nth-child(2) > :nth-child(5) > :nth-child(1)').should('to.contain', 'cypress-espresso-domain.com');
        cy.get('#item-cart > :nth-child(2) > :nth-child(5) > :nth-child(2)').should('to.contain', 'Rp. 142.000');
        cy.get('.price').should('to.contain','Rp. 358.600');
        //Tambah Kuota
        cy.get('.input-group > :nth-child(3) > .btn').click();
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)').should('to.contain','Rp. 80.000');
        cy.get('.price').should('to.contain','Rp. 402.600');
        //Kurang Kuota
        cy.get('.input-group > :nth-child(1) > .btn').click();
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)').should('to.contain','Rp. 40.000');
        cy.get('.price').should('to.contain','Rp. 358.600');

        cy.get('.input-group > .form-control')
            .type('!@#$%^&*()_+{}|:"?></.,;][=-')
            .should('to.contain', '');
        cy.get('.input-group > .form-control')
            .type('1000000');
        cy.get('.counter')
            .click();
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
            .should('to.contain', 'Rp. 3.960.000');
        cy.get('.input-group > .form-control')
            .clear();
        cy.get('.counter')
            .click();
        cy.get('.tooltip-inner')
            .should('to.contain', 'Isian tidak boleh kosong.');
        cy.get('.price')
            .should('to.contain','Rp. 358.600');
    });
    it('Layanan License Cpanel', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.remove-panel > .fas')
            .click();
        cy.get('.swal2-confirm')
            .click();
        cy.get('.item')
            .find('span > .fa');
        cy.get('.swal2-confirm')
            .click();
        cy.get('#tambahLayanan')
            .click()
            .should(() => {
                expect('#myModal > .modal-dialog > .modal-content > .modal-body').to.exist;
            });
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(4) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="16"]')
            .click()
            .should(() => {
                expect('[data-index="1"]').to.exist;
            })

        //Validasi kolom ip
        cy.get('.form-title > .form-group > .form-control')
            .type('!@#$%^&*()_+}{|":?><,/;[]\=-qwertyuiopasdfgghjklzxcvbnm');
        cy.get('.form-title > .form-group > .form-control')
            .should('to.contain', '');
        cy.get('#panel0 > .panel-body')
            .click();
        cy.get('.alert')
            .should('to.contain','Form di bawah ini harus format IP sob');
        cy.get('.form-title > .form-group > .form-control')
            .clear();
        cy.get('.form-title > .form-group > .form-control')
            .type('192.168.1.1');
        cy.get('.form-title > .form-group > .form-control')
            .should('have.value', '192.168.1.1');

        //cek alert
        cy.get('.form-title > .form-group > .form-control')
            .clear();
        cy.get('#payment-btn')
            .click();
        cy.get('.alert')
            .should('to.contain','Form harus diisi sob');
    });
    it('Layanan Cloud Mail', function () {
        cy.get('#tambahLayanan')
            .click()
            .should(() => {
                expect('#myModal > .modal-dialog > .modal-content > .modal-body').to.exist;
            });
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(3) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="10"]')
            .click()
            .should(() => {
                expect('[data-index="2"]').to.exist;
            })
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .should('to.contain','Cloud Mail');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .should('to.contain','Rp. 264.000');
        cy.get('.input-group > :nth-child(3) > .btn')
            .click();
        cy.get(':nth-child(4) > .sub-title')
            .should('to.contain', 'Jumlah Akun: 2 x Akun');
        cy.get('.input-group > :nth-child(3) > .btn')
            .click();
        cy.get(':nth-child(4) > .sub-title')
            .should('to.contain', 'Jumlah Akun: 3 x Akun');
        cy.get('.input-group > :nth-child(1) > .btn')
            .click();
        cy.get(':nth-child(4) > .sub-title')
            .should('to.contain', 'Jumlah Akun: 2 x Akun');
        cy.get('.input-group > :nth-child(1) > .btn')
            .click();
        cy.get(':nth-child(4) > .sub-title')
            .should('to.contain', 'Jumlah Akun: 1 x Akun');
        cy.get('.input-group > .form-control')
            .type('!@#$%^&*()_+{}|:"?></.,;][=-')
            .should('to.contain', '');
        cy.get('.input-group > .form-control')
            .type('1000000');
        cy.get('.counter')
            .click();
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .should('to.contain', 'Rp. 26.400.000');
        cy.get('.input-group > .form-control')
            .clear();
        cy.get('.counter')
            .click();
        cy.get('.tooltip-inner')
            .should('to.contain', 'Isian tidak boleh kosong.');

        cy.get('.input-group > :nth-child(4) > .btn')
            .click();
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .should('to.contain','Rp. 528.000');
        cy.get('.input-group > :nth-child(1) > .btn')
            .click();
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(2)')
            .should('to.contain','Rp. 264.000');
        cy.get('.price')
            .should('to.contain','Rp. 290.400');
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('cobaaa.com');
        cy.get('.col-md-2 > .btn')
            .click();
        cy.get('.section-domain-serupa')
            .should('not.be.visible');
        cy.get('.btn-transfer-domain')
            .should('not.be.visible');
        cy.get('.btn-gunakan-domain')
            .should('be.visible');

    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});