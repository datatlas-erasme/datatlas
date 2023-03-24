describe('DATASET ACTIONS', () => {
    const test_dataset = {
        url: 'dataset_test',
        updatedAt: 'date',
        checksum: 'checksum',
        warning: 'warning',
    };
    const modified_test_dataset = {
        url: 'modified_dataset_test',
        updatedAt: 'updated_date',
        checksum: 'modified_checksum',
        warning: 'modified_warning',
    };
    let id_test_dataset = null;
    it('Dataset -> creation of new dataset (should return new dataset id)', () => {
        cy.request({
        method: 'POST',
        url: '/api/dataset',
        body: test_dataset,
        failOnStatusCode: false,
        }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.id).to.be.a('number').greaterThan(0);
        id_test_dataset = response.body.id;
        });
    });
    it('Dataset -> Get info about dataset using id', () => {
        cy.request({
        method: 'GET',
        url: '/api/dataset/' + id_test_dataset,
        failOnStatusCode: false,
        }).then((response) => {
        expect(response.status).to.eq(200);
        // should return a object with the dataset info
        expect(response.body).to.be.an('object');
        });
    });
    it('Dataset -> Get all datasets', () => {
        cy.request({
        method: 'GET',
        url: '/api/dataset',
        failOnStatusCode: false,
        }).then((response) => {
        expect(response.status).to.eq(200);
        // should return an array of datasets
        expect(response.body).to.be.an('array');
        });
    });
    it('Dataset -> Modification', () => {
        cy.request({
        method: 'PUT',
        url: '/api/dataset/' + id_test_dataset,
        body: modified_test_dataset,
        failOnStatusCode: false,
        }).then((response) => {
        expect(response.status).to.eq(200);
        // should return a object with the dataset info
        expect(response.body).to.be.an('object');
        });
    });
    it('Dataset -> Delete', () => {
        cy.request({
        method: 'DELETE',
        url: '/api/dataset/' + id_test_dataset,
        failOnStatusCode: false,
        }).then((response) => {
        expect(response.status).to.eq(200);
        });
    }
    );
});