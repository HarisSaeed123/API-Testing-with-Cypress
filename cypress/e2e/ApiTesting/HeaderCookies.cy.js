///<reference types = "cypress"/>

const randomNumber = Math.random() * 100
let authToken = null;
let orderId = null;
describe('API Query Params', () => {
    before('Get Token', () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                clientName: "Test User1",
                clientEmail: `testuser${randomNumber}@gmail.com`
            }
        }).then(resposne => {
            return resposne.json
        }).then(data => {
            authToken = data.body.accessToken
        })
    })


    before('Create New Order', () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: {
                bookId: 1,
                customerName: "Test User1"
            }
        }).then(resposne => {
            return resposne.json
        }).then(data => {
            orderId = data.body.orderId
            expect(data.status).to.eq(201)
            expect(data.body.created).to.eq(true)
        })
    })

    it('Getting New Order', () => {
        cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            cookies: {
                'cookieName': 'myCookie'
            }
        }).then(resposne => {
            return resposne.json
        }).then(data => {
            expect(data.status).to.eq(200)
            expect(data.body).to.have.length(1)
            for (let i = 0; i < data.body.length; i++) {
                let id = data.body[i].id;
                expect(data.body[i].id).to.eq(id)
            }
        })
    })
})