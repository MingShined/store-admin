import MenuBean, { MenuType } from 'src/common/menuBean';

const menuData: MenuBean[] = [
  {
    path: '/banner',
    name: '轮播管理',
    type: MenuType.Item
  },
  {
    path: '/sort',
    name: '分类管理',
    type: MenuType.Item
  },
  {
    path: '/good',
    name: '商品管理',
    type: MenuType.Item
  },
  {
    path: '/customer',
    name: '客户管理',
    type: MenuType.Item
  },
  {
    path: '/shopcart',
    name: '购物车管理',
    type: MenuType.Item
  },
];

export default menuData;
