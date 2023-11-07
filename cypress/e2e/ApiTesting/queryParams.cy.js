///<reference types = "cypress"/>
// query parameter is passed after the question mark like:url/?page=2
describe('API Testing', () => {
    it('Passing Query Parameters', () => {
       cy.request({
           method : 'GET',
           url : 'https://reqres.in/api/users',
           qs : {page : 2}
       }).then(response => {
        return response.json
       }).then(data => {
        console.log(data)
        for(let i = 0; i < data.body.data.length; i++){
            const id = data.body.data[i].id
            // Verifiying the object keys
            expect(data.body.data[i]).have.keys('avatar', 'email', 'first_name', 'id', 'last_name')
            // Verifying the user Id
            expect(data.body.data[i].id).to.eq(id)
        }
        // Verifiying the pqge number
        expect(data.body.page).to.eq(2)
        // Verifying the result on per page
        expect(data.body.per_page).to.eq(6)
       })
    })
})