const routes = [{ path: '/', component: () => import('pages/Index.vue')}]
routes.push({
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '/servico/buscar', component: () => import('pages/servico/buscar.vue') },
    { path: '/servico/listagem', component: () => import('pages/servico/listagem.vue') },
    { path: '/categoria/principais', component: () => import('pages/categoria/principais.vue') }
  ]
})
routes.push({ path: '/login', component: () => import('pages/entrar/login.vue') })
routes.push({ path: '/categoria/pesquisar', component: () => import('pages/categoria/pesquisar.vue') })
routes.push({ path: '/servico/cadastrar', component: () => import('pages/servico/cadastrar.vue') })
routes.push({ path: '/servico/detalhe', component: () => import('pages/servico/detalhe.vue') })
routes.push({ path: '/servico', component: () => import('pages/servico/servico.vue') })
routes.push({ path: '/pessoa/prestador', component: () => import('pages/pessoa/verPrestador.vue') })
routes.push({ path: '/pessoa/perfil', component: () => import('pages/pessoa/perfil.vue') })
routes.push({ path: '/pessoa/cadastro', component: () => import('pages/pessoa/cadastro.vue') })
routes.push({ path: '/pessoa/alterar', component: () => import('pages/pessoa/alterar.vue') })
routes.push({ path: '/problema/relatar', component: () => import('pages/problema/relatar.vue') })
routes.push({ path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') })

export default routes
