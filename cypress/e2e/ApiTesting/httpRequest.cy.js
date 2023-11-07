///<reference types = "cypress"/>

describe('HTTP Requests Testing', () => {
   it.skip('Get Call', () => {
       cy.request('GET', 'https://jsonplaceholder.typicode.com/posts').then(response => {
        return response.json
       }).then(data => {
        console.log(data.body)
       })
   })
   it.only('Post Call', () => {
       cy.request(
        { 
         method: 'POST', 
         url: 'https://jsonplaceholder.typicode.com/posts/',  
         title : 'Test Post',
         body : {
         title : "This is the title",
         body : "This is the post call",
         userId : 1
         }
       }).then(response => {
        return response.json
       }).then(data => {
        console.log(data.body)
       })
   })
   
   it.only('PUT Call', () => {
     cy.request({
        method : 'PUT',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        body: {
            id: 101,
            userId: 1,
            title : "This is put call",
            body: 'Update record'
        }
     }).then(response => {
        return response.json
     }).then(data => {
        console.log(data.body)
     })
   })

   it.only('Delete Call', () => {
    cy.request({
        method : 'DELETE',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        body: {
            id: 1,
            userId: 1,
            title : "This is put call",
            body: 'Update record'
        }
    }).then(response => {
        return response.json
       }).then(data => {
          expect(data.status).equal(200)
       })
   })
})