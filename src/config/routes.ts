export const routes = {
  index: '/',
  signIn: '/authentication/login',
  account: {
    role: {
      list: '/account/role',
      edit: (id: string) => `/account/role/${id}`,
    },
    user: {
      list: '/account/user',
      edit: (id: string) => `/account/user/${id}`,
    },
  },
};
