type ObjectId = symbol;

interface Customer {
  name: string;
  features: string[];
}

interface Establishment {
  name: string;
  cn: string;
}

interface User<T extends Record<'customer' | 'establishment', unknown> = Record<string, never>> {
  email: string;
  customer: T extends { customer: infer C } ? C : ObjectId;
  establishment: T extends { establishment: infer E } ? E : ObjectId;
}

type UserSerialized = User<{ customer: string; establishment: string }>;

type UserPopulatedA = User<{ customer: Customer; establishment: string }>;
type UserPopulatedB = User<{ establishment: Establishment; customer: string }>;
type UserPopulatedC = User<{ customer: Customer; establishment: Establishment }>;

describe('base entity', () => {
  const u: User = {
    customer: Symbol('customer ID'),
    email: '',
    establishment: Symbol('estab. ID'),
  };

  const { email }: { email: string } = u;
  const { customer }: { customer: ObjectId } = u;
  const { establishment }: { establishment: ObjectId } = u;
});

describe('serialized', () => {
  const userSerialized: UserSerialized = {
    email: '',
    customer: '',
    establishment: '',
  };

  const { email, customer, establishment }: { email: string; customer: string; establishment: string } = userSerialized;
});

describe('populated case A', () => {
  const userPopulatedA: UserPopulatedA = {
    email: '',
    customer: {
      features: [],
      name: '',
    },
    establishment: '',
  };
});

describe('populated case B', () => {
  const userPopulatedB: UserPopulatedB = {
    email: '',
    customer: '',
    establishment: {
      name: '',
      cn: '',
    },
  };
});

describe('populated case C', () => {
  const userPopulatedC: UserPopulatedC = {
    email: '',
    customer: {
      features: [],
      name: '',
    },
    establishment: {
      name: '',
      cn: '',
    },
  };
});
