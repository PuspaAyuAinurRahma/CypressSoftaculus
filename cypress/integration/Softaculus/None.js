const test_base_uri = Cypress.env('baseUrl');
const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();
const testname = `cypress${id}`;
let serverUrl;

describe('Softaculus', function () {
    it('Pilihan Aplikasi', function () {
        cy.visit(test_base_uri+'/clientarea.php',{ failOnStatusCode: false });
        cy.get('#inputEmail')
            .type('testbeon2@gmail.com');
        cy.get('#inputPassword')
            .type('jagoan123');
        cy.get('#login')
            .click();

        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('.title > .form-title')
            .contains('Select Application That You Want To Install');

        // Memilih Aplikasi
        cy.get('.col-md-10 > .form-group > .form-control')
            .type(testname);
        cy.get('.col-md-10 > .form-group > .form-control')
            .type('.com');
        cy.get('.col-md-2 > .btn')
            .click();
        cy.wait(3000);
        cy.get('.flex-row > .btn-orange')
            .click();
        cy.get(':nth-child(1) > .template')
            .click();
        cy.get(':nth-child(4) > .sub-title')
            .should('not.visible');
        cy.wait(1000);
        cy.get('#payment-btn')
            .click();
        cy.get('#headingovo > .panel-title > .collapsed > .more-less')
            .click();
        cy.get('#collapseovo > .panel-body > .row > .col-md-12 > .btn')
            .click();
        cy.get('.col-sm-8 > h3')
            .contains('Invoice');

        // Create

        cy.visit(test_base_uri+'/beontop');
        cy.get(':nth-child(4) > .form-control')
            .type('api');
        cy.get(':nth-child(5) > .form-control')
            .type('28ER67fi');
        cy.get('.col-sm-5 > .btn')
            .click();
        cy.get('#intellisearchval')
            .type(testname);
        cy.get('#btnIntelliSearch > .fas')
            .click();
        cy.get('#searchresults > :nth-child(2) > a')
            .click();
        cy.get(':nth-child(3) > :nth-child(2) > .form-control').invoke('text').then(server => {
            serverUrl = server;
            serverUrl = serverUrl.split(' ')[0]+':2087';
        });
        cy.get('#btnCreate')
            .click();
        cy.get('#ModuleCreate-Yes')
            .click();
        cy.wait(50000);
        cy.get('.successbox')
            .should('exist');
    });
    it('Cek Hosting', function () {
        // Cek Cpanel
        if(serverUrl!=undefined){
            cy.visit(serverUrl,{ failOnStatusCode: false });
        }else{
            cy.readFile('message.txt').then((input) =>{
                cy.visit(input.split("<<>>")[0],{ failOnStatusCode: false });
            });
        }
        cy.get('#user')
            .type('root');
        cy.get('#pass')
            .type('Beoncakt0p');
        cy.get('#login_submit')
            .click();
        cy.get('#sectionManageAccounts > .list-unstyled > :nth-child(2) > a')
            .click();
        cy.get('#searchtxttop')
            .type('cypress');
        cy.get('#search-top > .form-horizontal > :nth-child(1) > .col-xs-10 > .btn')
            .click();
        cy.get('.domain-link')
            .should('exist');
        cy.get(':nth-child(3) > form')
            .should('exist');

        //Penghapusan account di WHM
        cy.get('.control-col > img')
            .click();
        cy.get('.button-container > :nth-child(6) > .btn')
            .click();
        cy.get('#deleteConfirm_0')
            .contains('Yes, remove this account')
            .click();
        cy.wait(15000);
        cy.get('#growl_0_1')
            .should('exist');
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
});