const test_base_uri = Cypress.env('baseUrl');
describe('Access the Order Service Page Testing', function () {
    it('Access the Order Service Page', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.request(test_base_uri+'/orders/products/421')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        cy.get('.pull-right')
            .should('exist');
        cy.get('#order-forms-wrapper > .panel')
            .should('exist')
            .then(() => {
            cy.get('#order-forms-wrapper > .panel > .panel-heading')
                .should('to.contain', 'Layanan yang kamu beli');
            cy.get('.minimize-icon > .fas')
                .should('exist');
            cy.get('.remove-panel > .fas')
                .should('exist');
        });
        cy.get('.section-pilihpaket')
            .should('exist')
            .then(() => {
                cy.get('.section-pilihpaket > .form-title').should('to.contain', 'Pilih paket');
                cy.get('.section-pilihpaket > .dropdown_select_wrapper > .default_option > li').should('exist');
            });
        cy.get('.section-billingcycle')
            .should('exist')
            .then(() => {
                cy.get('.section-billingcycle > .form-title').should('to.contain','Durasi Berlangganan');
                cy.get('.section-billingcycle > .dropdown_select_wrapper > .default_option > li').should('exist');
            });
        cy.get('.section-tambah-domain')
            .should('exist')
            .then(() => {
                cy.get('.section-tambah-domain > .form-title').should('to.contain', 'Tambah domain untuk layanan ini');
                cy.get('.form-control').should('exist');
                cy.get('.col-md-2 > .btn').should('exist').and('to.contain', 'Cari');
            });
        //Cek step order
        cy.get('.pull-right')
            .should('exist');
        cy.get(':nth-child(1) > .step')
            .should('have.class', 'active');

        //Cek title
        cy.get(':nth-child(1) > .pull-left')
            .should('exist')
            .and('to.contain', 'Selesaikan orderanmu, Sob!');

        //Cek section tambah layanan
        cy.get('#tambah-layanan-baru > .align-items-center')
            .contains('Tambah Layanan Baru');
        cy.get('#tambahLayanan')
            .contains('Tambah Layanan');

        //Cek cart
        cy.get('#item-cart > .item')
            .should('exist');
        cy.get('.item > :nth-child(1) > .title')
            .contains('Cloud Hosting');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .contains('ID FAME');

        //Akses halaman form order domain
        cy.visit(test_base_uri+'/orders/domains');
        cy.get('#section-add-domain > .align-items-center')
            .should('exist');
        cy.get('#section-add-domain > .align-items-center > .form-title')
            .contains('Tambah Domain');
        cy.get('.col-md-10 > .form-group > .form-control')
            .should('exist')
            .and('have.attr','placeholder','Enter domain');
        cy.get('.col-md-2 > .btn')
            .should('exist')
            .and('to.contain','Cari');
        cy.get('#tambah-layanan-baru > .align-items-center')
            .should('exist');
        cy.get('#tambahLayanan')
            .should('exist')
            .and('to.contain','Tambah Layanan');
        //cart
        cy.get('#item-cart > .item')
            .should('exist');
        cy.get('.item > :nth-child(1) > .title')
            .contains('Cloud Hosting');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .contains('ID FAME');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});