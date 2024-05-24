<template>
  <q-page padding style="padding-top: 8px;">
    <div class="row justify-center">
      <span class="text-body1">Aqui estão as categorias mais procuradas</span>

      <div class="row" style="padding-top: 8px;">
        <div class="row q-col-gutter-sm">
          <div class="col-6" v-for="categoria in categorias" :key="categoria._id" >
            <div
              class="card text-center text-primary"
              flat
              style="border:1px solid rgba(0, 0, 0, 0.12); height: 140px; margin-right: 15px; border-radius: 5px"
              @click="abrirPesquisar(categoria._id)"
            >
              <div style="padding-top: 25px">
                <q-icon :name="categoria.icone" size="3.5em"/>
                <p class="q-body-1 text-weight-medium">{{ categoria.nome }}</p>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
  </q-page>
</template>

<script>
import {
  SessionStorage,
  LocalStorage
} from 'quasar'
import {
  API,
  request
} from '../../uteis/request'
import { ordernarCategorias } from 'src/uteis/ordenarCategorias'

export default {
  data() {
    return {
      tipoLogin: SessionStorage.getItem("tipoLogin"),
      categorias: LocalStorage.getItem('categorias'),
      pesquisar: ''
    }
  },
  mounted() {
    if(!!this.categorias === false)
      this.buscarCategorias()
  },
  methods: {
    abrirPesquisar(parametro)
    {
      this.$router.push(`/categoria/pesquisar/?categoria=${parametro}`)
    },
    async buscarCategorias()
    {
      const retornoCategorias = await request(API, 'GET', 'categorias')
                                  .then(retorno => retorno?.data)

      if(!!retornoCategorias)
      {
        //Organiza as categorias e subcategorias por ordem alfabética
        this.categorias = ordernarCategorias(retornoCategorias)
        LocalStorage.set('categorias', this.categorias)
      }
      else
      {
        this.$q.notify({
            icon: 'close',
            color: 'negative',
            message: `Problemas ao listar as categorias.`,
            position: 'top'
        })
      }
    }
  }
}
</script>
