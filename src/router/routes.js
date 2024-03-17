const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "profile",
        component: () => import("pages/UserProfile.vue"),
      },
    ],
  },
  {
    path: "/movie-blog",
    component: () => import("layouts/MovieLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/MovieBlog.vue"),
        name: "MovieBlog",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
