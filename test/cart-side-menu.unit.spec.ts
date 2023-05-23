import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import CartSideMenu from '@/components/cart-side-menu.vue';
import CartItem from '@/components/cart-item.vue';
import DefaultLayout from '@/layouts/default.vue';
import { makeServer } from '~/miragejs/server';

Vue.use(Vuetify);

let localVue: any;
let vuetify: any;
let server: any;

describe('Cart', () => {
  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });
  test('should mount the component', () => {
    const wrapper = mount(CartSideMenu, { localVue, vuetify });

    expect(wrapper.vm).toBeDefined();
  });
  test('should emit close event button gets clicked', async () => {
    const wrapper = mount(CartSideMenu, { localVue, vuetify });

    await wrapper.find('[data-testid="closeButton"]').trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close).toHaveLength(1);
  });
  test('should hide the cart when variable cartIsVisible is not true', () => {
    const wrapper = mount(DefaultLayout, {
      localVue,
      vuetify,
      stubs: { Nuxt: true },
      computed: {
        cartIsVisible(): boolean {
          return false;
        },
      },
    });
    const cartMenu = wrapper.findComponent(CartSideMenu);

    expect(cartMenu.classes()).toContain('v-navigation-drawer--close');
  });
  test('should display the cart when variable cartIsVisible is true', () => {
    const wrapper = mount(DefaultLayout, {
      localVue,
      vuetify,
      stubs: { Nuxt: true },
      computed: {
        cartIsVisible(): boolean {
          return true;
        },
      },
    });

    const cartMenu = wrapper.findComponent(CartSideMenu);

    expect(cartMenu.classes()).toContain('v-navigation-drawer--open');
  });
  test('should display "Cart is empty" when there are no products', () => {
    const wrapper = mount(CartSideMenu, {
      localVue,
      vuetify,
    });

    expect(wrapper.text()).toContain('Cart is empty');
  });
  test('should display 2 instances of CartItem when 2 products are provided', () => {
    const productList = server.createList('product', 2);
    const wrapper = mount(CartSideMenu, {
      localVue,
      vuetify,
      propsData: {
        productList,
      },
    });

    expect(wrapper.findAllComponents(CartItem)).toHaveLength(2);
    expect(wrapper.text()).not.toContain('Cart is empty');
  });
});
