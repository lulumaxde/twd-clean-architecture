import { InvalidEmailError } from './entities/errors/invalid-email-error'
import { InvalidNameError } from './entities/errors/invalid-name-error'
import { User } from './entities/user'
import { UserData } from './entities/user-data'
import { UserRepository } from './ports/user.repository'
import { Either, left, right } from './shared/either'

export class RegisterUserOnMailingList {
    private readonly UserRepo: UserRepository

    constructor (userRepo: UserRepository) {
      this.UserRepo = userRepo
    }

    public async RegisterUserOnMailingList (request: UserData):
        Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
      const UserOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
      if (UserOrError.isLeft()) {
        return left(UserOrError.value)
      }

      if (!await this.UserRepo.exists(request)) {
        await this.UserRepo.add(request)
      }
      return right(request)
    }
}
