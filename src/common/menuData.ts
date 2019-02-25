import MenuBean, { MenuType } from 'src/common/menuBean';

const menuData: MenuBean[] = [
  {
    name: '主页',
    path: '/home',
    type: MenuType.SubMenu,
    children: [
      {
        path: '/home/banner',
        name: '轮播管理',
        type: MenuType.Item
      },
      {
        path: '/home/sort',
        name: '分类管理',
        type: MenuType.Item
      },
      {
        path: '/home/good',
        name: '商品管理',
        type: MenuType.Item
      }
    ]
  }
];

export default menuData;
