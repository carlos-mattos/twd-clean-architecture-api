type Either<L, A> = Left<L, A> | Right<L, A>;

class Left<L, A> {
  constructor(public readonly value: L) {}

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

class Right<L, A> {
  constructor(public readonly value: A) {}

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

const left = <L, A>(value: L): Either<L, A> => new Left(value);
const right = <L, A>(value: A): Either<L, A> => new Right(value);

export { left, right, Right, Left, Either };
