import faker from 'faker';
import { Factory } from 'miragejs';

export default {
  product: Factory.extend({
    title() {
      return faker.commerce.productName();
    },
    price() {
      return faker.commerce.price();
    },
    image() {
      return faker.image.imageUrl();
    },
  }),
};
