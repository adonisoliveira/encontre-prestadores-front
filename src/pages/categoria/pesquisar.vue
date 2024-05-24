<template>
  <q-layout>
      <q-page-container>
          <q-page>
              <div class="row justify-center">
                  <div style="width: 800px; max-width: 100vw;">
                      <q-card class="no-shadow">
                          <div class="row q-gutter-sm bg-primary text-white" style="padding-left: 12px; padding-right: 10px; padding-top: 9px; padding-bottom: 2px;">
                              <div class="col-1">
                                  <q-btn
                                      icon="mdi-arrow-left"
                                      dense
                                      flat
                                      color="white"
                                      @click="voltar()"
                                  />
                              </div>
                              <div class="col-10">
                                  <q-input
                                      v-model="pesquisar"
                                      ref="pesquisar"
                                      dark
                                      dense
                                      placeholder="Qual profissional você procura?"
                                      input-class="text-center"
                                      class="q-ml-md full-width"
                                      :input-style="{ fontSize: '18px' }"
                                      @input="filtrar()"
                                  >
                                      <template v-slot:append>
                                          <q-icon name="mdi-magnify" @click="filtrar()" />
                                      </template>
                                  </q-input>
                              </div>
                          </div>
                          <div class="row scroll" style="max-height: 82vh;">
                              <q-list class="full-width" v-if="listaCategoria.length > 0">
                                  <template v-for="categoria in listaCategoria" :key="categoria._id">
                                      <q-item class="list-item" style="padding-left: 16px; padding-right: 16px;">
                                          <q-item-section avatar>
                                              <q-icon color="grey-9" :name="categoria.icone" />
                                          </q-item-section>
                                          <q-item-section>
                                              <q-item-label class="text-subtitle1 text-weight-bold text-grey-9">{{categoria.nome}}</q-item-label>
                                          </q-item-section>
                                      </q-item>

                                      <q-separator />

                                      <q-list class="full-width">
                                          <template v-for="subcategoria in categoria.subCategorias" :key="subcategoria._id">
                                              <q-item
                                                  clickable
                                                  v-ripple
                                                  class="list-item"
                                                  style="padding-left: 16px; padding-right: 16px;"
                                                  @click="novoServico(categoria._id, categoria.nome, categoria.icone, subcategoria)"
                                              >
                                                  <q-item-section>
                                                      <q-item-label class="text-subtitle1">{{subcategoria.nome}}</q-item-label>
                                                  </q-item-section>
                                              </q-item>
                                          </template>
                                      </q-list>
                                  </template>
                              </q-list>
                              <div class="row full-width" style="padding-top: 50%" v-else>
                                  <div class="row full-width justify-center">
                                      <q-icon name="mdi-emoticon-sad-outline" size="50px" color="negative" />
                                  </div>
                                  <div class="row full-width justify-center">
                                      <span class="text-subtitle1 text-weight-medium">Nenhuma categoria encontrada </span>
                                  </div>
                              </div>
                          </div>
                      </q-card>
                  </div>
              </div>
          </q-page>
      </q-page-container>
  </q-layout>
</template>


<script>
import {
  SessionStorage,
  LocalStorage
} from 'quasar'

export default {
  data() {
    return {
        tipoLogin: SessionStorage.getItem("tipoLogin"),
        pesquisar: '',
        categorias: [],
        listaCategoria: []
    }
  },
  mounted() {
    //Se alguma categoria foi informada via parâmetro, realiza o filtro nas categorias
    //Caso contratio, lista todas
    if(!!this.$route.query.categoria)
    {
        LocalStorage.getItem('categorias').forEach(item => {
            if(item._id === this.$route.query.categoria)
              this.categorias.push(item)
        })
    }
    else
      this.categorias = LocalStorage.getItem('categorias')

    this.listaCategoria = this.categorias
    this.$refs.pesquisar.focus()
  },
  methods: {
    voltar()
    {
      this.$router.go(-1)
    },
    filtrar()
    {
      if(!!this.pesquisar)
      {
        const filtro = this.pesquisar.toLowerCase()
        let arrCategorias = []

        this.categorias.forEach(item => {
            let categoriaFiltrada = {
              _id: item._id,
              nome: item.nome,
              icone: item.icone,
              subCategorias: []
            }

            item.subCategorias.forEach(subitem => {
                if(subitem.nome.toLowerCase().indexOf(filtro) !== -1)
                {
                  categoriaFiltrada.subCategorias.push({
                    _id: subitem._id,
                    nome: subitem.nome,
                    podeSerVirtual: subitem.podeSerVirtual,
                    requerEndereco: subitem.requerEndereco,
                    detalhes1: subitem.detalhes1,
                    detalhes2: subitem.detalhes2,
                    detalhes3: subitem.detalhes3,
                    detalhes4: subitem.detalhes4,
                    detalhes5: subitem.detalhes5,
                    detalhes6: subitem.detalhes6
                  })
                }
            })

            if(categoriaFiltrada.subCategorias.length > 0)
            {
              categoriaFiltrada.nome = item.nome
              arrCategorias.push(categoriaFiltrada)
            }
            else
            {
                if(item.nome.toLowerCase().indexOf(filtro) !== -1)
                {
                  categoriaFiltrada.subCategorias = item.subCategorias
                  arrCategorias.push(categoriaFiltrada)
                }
            }
        })

        this.listaCategoria = arrCategorias
      }
      else
        this.listaCategoria = this.categorias
    },
    novoServico(id, nome, icone, subcategoria)
    {
      let categoria = {
        _id: id,
        nome: nome,
        icone: icone,
        subcategoria: subcategoria
      }

      LocalStorage.set("categoriaNovoServico", categoria)
      this.$router.push('/servico/detalhe')
    }
  }
}
</script>
