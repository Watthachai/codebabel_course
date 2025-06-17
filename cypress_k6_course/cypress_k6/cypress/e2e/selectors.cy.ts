describe('Selectors', () => {
  beforeEach(() => {
    cy.visit('/cy/selectors')
  })

  it('selects elements correctly', () => {
    cy.contains('All Articles')
    cy.get('#title').should('have.text', ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. ')
    cy.get('#title')
      .parent()
      .parent()
      .find('img')
      .should('have.attr', 'src')

    cy.get('#title')
      .parent()
      .parent()
      .find('button')
      .should('contain', 'Explore')
  })

  it.only('selects elements with data-cy correctly', () => {
    cy.dataCy('article-item-title').should('contain', 'Contrary to popular belief, Lorem Ipsum is not simply random text')
    cy.dataCy('article-item-image').should('have.attr', 'src')
    cy.dataCy('article-item-explore').should('contain', 'Explore')
  })

  it('verifies data in table correctly', () => {
    const people = [
      {
        id: 1,
        name: 'Lindsay',
        title: 'Software Engineer',
        email: 'lindsay@example.com',
        role: 'Admin',
      },
      {
        id: 2,
        name: 'somchai',
        title: 'Software Engineer',
        email: 'somchai@example.com',
        role: 'Admin',
      },
      {
        id: 3,
        name: 'ying',
        title: 'Software Engineer',
        email: 'ying@example.com',
        role: 'Member',
      },
    ]

    cy.get('tbody > tr').each(($element, index) => {
      const person = people[index]

      cy.wrap($element).within(() => {
        cy.get('td:nth-child(1)').should('have.text', person.id)
        cy.get('td:nth-child(2)').should('have.text', person.name)
        cy.get('td:nth-child(3)').should('have.text', person.title)
        cy.get('td:nth-child(4)').should('have.text', person.email)
        cy.get('td:nth-child(5)').should('have.text', person.role)
      })
    })
  })
})
