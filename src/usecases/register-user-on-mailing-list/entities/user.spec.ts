import { left } from '../shared/either'
import { User } from './user'
import { InvalidEmailError } from './errors/invalid-email-error'

describe('User domain class', () => {
  test('should not create user with invalid email adress', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
})
