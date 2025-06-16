/* eslint-disable no-console */
// Tset Suite: Mocha Tests
describe('Number', () => {
  before(() => {
    console.log('Before all tests in Number suite')
  })

  beforeEach(() => {
    console.log('Before each test in Number suite')
  })

  afterEach(() => {
    console.log('After each test in Number suite')
  })

  after(() => {
    console.log('After all tests in Number suite')
  })

  // Test Case: Check if 1 is equal to 1
  it('calculates 1 + 1 correctly', () => {
    console.log('Running test: 1 + 1 should equal 2')
    expect(1 + 1).to.equal(2)
  })

  it('calculates 2 * 2 correctly', () => {
    console.log('Running test: 2 * 2 should equal 4')
    expect(2 * 2).to.equal(4)
  })
})

describe('Chai Assertions', () => {
  it('handles assertions correctly', () => {
    expect('hello').to.be.a('string')
    expect(42).to.be.a('number')
    expect([1, 2, 3]).to.be.an('array')
    expect({ key: 'value' }).to.be.an('object')
    expect({ age: 24 }).to.deep.equal({ age: 24 })

    cy.wrap(1 + 1).should('equal', 2)
    cy.wrap('hello').should('be.a', 'string')
    cy.wrap({ name: 'Somchai' }).should('have.property', 'name')
    cy.wrap([]).should('be.empty')
  })
})
