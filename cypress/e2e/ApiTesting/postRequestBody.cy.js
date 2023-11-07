///<reference types = "cypress"/>
describe('API Testing', () => {
  it('Approach1 Hard Code JSON Object', () => {
    const reqBody = {
      title: `Post call approach 1 `,
      body: 'test body',
      userId: 1
    }
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      body: reqBody
    }).then(response => {
      return response.json
    }).then(data => {
      expect(data.statusText).to.equal('Created')
      expect(data.status).to.equal(201)
      expect(data.body.id).to.equal(101)
    })
  })

  it('Approach2-Dynamically generated the json object', () => {
    const reqBody = {
      title: `Post Request ${Math.random(10)}`,
      body: "Randomly generate json object",
      userId: 2
    }
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      body: reqBody
    }).then(request => {
      return request.json
    }).then(data => {
      expect(data.body.id).to.eq(101)
      expect(data.body.title).to.eq(reqBody.title)
    })
  })

  it.only('Approach3-Getting Data From Fixture File', () => {
    cy.fixture('postData').then(fixtureData => {
      const requestBody = fixtureData
      cy.request({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        body: requestBody
      }).then(response => {
        return response.json
      }).then(actualData => {
        expect(actualData.body.title).to.eq(requestBody.title)
        expect(actualData.body).has.property('userId', requestBody.userId)
      })
    })
  })
})