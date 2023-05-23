import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import CartItem from '@/components/cart-item.vue';
import { makeServer } from '~/miragejs/server';

Vue.use(Vuetify);

let localVue: any;
let vuetify: any;
let server: any;

describe('CartItem', () => {
  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });
  test('should mount the component', () => {
    const wrapper = mount(CartItem, {
      localVue,
      vuetify,
      propsData: {
        product: server.create('product', {
          image:
            'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
          title: 'Relógio bonito',
          price: '45.00',
        }),
      },
    });

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.$props.product).toBeTruthy();
    expect(wrapper.vm.$data.itemTitle).toBeTruthy();
    expect(wrapper.vm.$data.itemPrice).toBeTruthy();
    expect(wrapper.vm.$data.itemImage).toBeTruthy();
    expect(wrapper.vm.$data.itemQuantity).toBeTruthy();
    expect(wrapper.vm.$data.itemQuantity).toBe(1);
    expect(wrapper.text()).toContain('Relógio bonito');
    expect(wrapper.text()).toContain('45.00');
  });

  test('should increase product quantity when plus button is clicked', async () => {
    const wrapper = mount(CartItem, {
      localVue,
      vuetify,
      propsData: {
        product: server.create('product', {
          image:
            'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
          title: 'Relógio bonito',
          price: '45.00',
        }),
      },
    });

    await wrapper.find('[data-testid="plusButton"]').trigger('click');

    expect(wrapper.vm.$data.itemQuantity).toBe(2);
  });
  test('should decrease product quantity when minus button is clicked', async () => {
    const wrapper = mount(CartItem, {
      localVue,
      vuetify,
      propsData: {
        product: server.create('product', {
          image:
            'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
          title: 'Relógio bonito',
          price: '45.00',
        }),
      },
    });

    await wrapper.find('[data-testid="plusButton"]').trigger('click');
    await wrapper.find('[data-testid="minusButton"]').trigger('click');

    expect(wrapper.vm.$data.itemQuantity).toBe(1);
  });
  test('should remove product from cart when quantity is 1 and minus button is clicked', async () => {
    const wrapper = mount(CartItem, {
      localVue,
      vuetify,
      propsData: {
        product: server.create('product', {
          image:
            'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
          title: 'Relógio bonito',
          price: '45.55',
        }),
      },
    });
    const button = wrapper.find('[data-testid="minusButton"]');
    // expect(wrapper.exists()).toBe(true);
    await button.trigger('click');
    await button.trigger('click');
    expect(wrapper.vm.$data.itemQuantity).toBe(0);
  });
});
