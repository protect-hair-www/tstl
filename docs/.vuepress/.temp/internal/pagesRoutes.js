import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-3706649a","/404.html",{"title":""},["/404"]],
  ["v-8daa1a0e","/",{"title":"功能概述"},["/index.html","/README.md"]],
  ["v-fb0f0066","/guide/getting-started.html",{"title":""},["/guide/getting-started","/guide/getting-started.md"]],
  ["v-fffb8e28","/guide/",{"title":""},["/guide/index.html","/guide/README.md"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
