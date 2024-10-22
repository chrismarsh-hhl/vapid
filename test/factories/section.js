import faker from 'faker';

const factory = () => ({
  name: faker.lorem.word(),
});

export default factory;
