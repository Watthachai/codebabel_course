describe('Lodash', () => {
  it('handles Lodash methids correctly', () => {
    const person = {
      name: 'Somchai',
      age: 24,
      gender: 'male',
    }

    expect(_.omit(person, 'name')).to.deep.equal({ age: 24, gender: 'male' })
    expect(_.omit(person, 'name')).to.deep.equal({ gender: 'male' })
    expect(_.pick(person, 'name')).to.deep.equal({ name: 'Somchai' })
    expect(_.pick(person, 'name', 'age')).to.deep.equal({ name: 'Somchai', age: 24 })
    expect(_.times(5, index => index)).to.deep.equal([0, 1, 2, 3, 4])
  })
})
