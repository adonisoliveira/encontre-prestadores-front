<template>
  <q-layout>
      <q-page-container>
          <q-footer >
              <q-btn
                  :label="labelBtn"
                  flat
                  text-color="white"
                  class="full-width bg-primary"
                  size="22px"
                  no-caps
                  @click="confirmar(false)"
              />
          </q-footer>
          <q-page>

              <div class="row justify-center">
                  <div style="width: 800px; max-width: 100vw;">
                      <q-card class="no-shadow">
                          <div class="row q-gutter-sm bg-primary text-white" style="padding-left: 12px; padding-right: 10px; padding-top: 9px; padding-bottom: 9px;">
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
                                  <span class="text-h6 text-weight-regular"> {{titulo}} </span>
                              </div>
                          </div>

                          <div class="row" v-if="finaliza === false">
                              <div class="row" style="padding-left: 25px; padding-top: 5px;">
                                  <span class="text-subtitle1 text-primary text-weight-regular">
                                      <q-icon name="mdi-information-outline" size="25px" color="primary" />
                                      {{descricaoSelecao}}
                                  </span>
                              </div>
                              <q-list dense class="full-width" style="padding-top: 5px" v-if="itens.length > 0">
                                  <template v-for="(item, index) in itens" :key="index">
                                      <q-item tag="label" clickable v-ripple class="list-item">
                                          <q-item-section avatar style="padding-right: 10px !important; min-width: 0px !important;" v-if="!multiselecao">
                                              <q-radio
                                                  v-model="itemSelecionado"
                                                  :val="item"
                                              />
                                          </q-item-section>
                                          <q-item-section avatar style="padding-right: 10px !important; min-width: 0px !important;" v-else>
                                              <q-checkbox
                                                  v-model="itensSelecionados"
                                                  :val="item"
                                              />
                                          </q-item-section>
                                          <q-item-section>
                                              <q-item-label class="text-subtitle1 text-grey-9">{{item.descricao}}</q-item-label>
                                          </q-item-section>
                                      </q-item>

                                  </template>
                              </q-list>
                          </div>

                          <div class="row" v-else>
                              <q-card elevation class="bg-white full-width no-shadow" Style="border-radius: 3px; padding: 0px;">
                                  <q-card-section style="padding-top: 15px">
                                      <div>
                                          <span class="text-subtitle1 text-weight-regular">Existe mais alguma informação que o profissional deva saber?</span>
                                      </div>
                                      <q-input
                                          v-model="descricao"
                                          type="textarea"
                                          ref="descricao"
                                          placeholder="Informe os dados extras aqui."
                                          autogrow
                                          :input-style="{ fontSize: '16px' }"
                                          outlined
                                      />

                                      <q-toggle
                                          v-model="orcamento"
                                          label="Quero somente um orçamento"
                                          checked-icon="mdi-check"
                                          color="primary"
                                          icon-color="white"
                                          size="xl"
                                          left-label
                                      />

                                      <div class="row">
                                          <span class="text-subtitle1 text-weight-bold">Resumo do pedido</span>
                                      </div>

                                      <div class="row bg-grey-3" style="padding: 10px; border-radius: 5px;">
                                          <div class="row">
                                              <span class="text-subtitle2 text-weight-bold">Qual profissional você procura?</span>
                                              <div class="row full-width" style="padding-bottom: 10px">
                                                  <span class="text-body2">{{categoria.subcategoria.nome}}</span>
                                              </div>
                                          </div>
                                          <div class="row" v-if="servico.detalhes1.descricao !== undefined">
                                              <span class="text-subtitle2 text-weight-bold">{{servico.detalhes1.descricao}}</span>
                                              <div class="row full-width" style="padding-bottom: 10px; text-align: justify;">
                                                  <template v-for="(item, index) in servico.detalhes1.itens" :key="index">
                                                      <div class="row">
                                                          <span class="text-body2">
                                                              {{item.descricao}}<span v-if="servico.detalhes1.itens.length > 1 && ((index + 1) < servico.detalhes1.itens.length)">, </span>
                                                          </span>
                                                      </div>
                                                  </template>
                                              </div>
                                          </div>
                                          <div class="row" v-if="servico.detalhes2.descricao !== undefined">
                                              <span class="text-subtitle2 text-weight-bold">{{servico.detalhes2.descricao}}</span>
                                              <div class="row full-width" style="padding-bottom: 10px; text-align: justify;">
                                                  <template v-for="(item, index) in servico.detalhes2.itens" :key="index">
                                                      <div class="row">
                                                          <span class="text-body2">
                                                              {{item.descricao}}<span v-if="servico.detalhes2.itens.length > 1 && ((index + 1) < servico.detalhes2.itens.length)">, </span>
                                                          </span>
                                                      </div>
                                                  </template>
                                              </div>
                                          </div>
                                          <div class="row" v-if="servico.detalhes3.descricao !== undefined">
                                              <span class="text-subtitle2 text-weight-bold">{{servico.detalhes3.descricao}}</span>
                                              <div class="row full-width" style="padding-bottom: 10px; text-align: justify;">
                                                  <template v-for="(item, index) in servico.detalhes3.itens" :key="index">
                                                      <div class="row">
                                                          <span class="text-body2">
                                                              {{item.descricao}}<span v-if="servico.detalhes3.itens.length > 1 && ((index + 1) < servico.detalhes3.itens.length)">, </span>
                                                          </span>
                                                      </div>
                                                  </template>
                                              </div>
                                          </div>
                                          <div class="row" v-if="servico.detalhes4.descricao !== undefined">
                                              <span class="text-subtitle2 text-weight-bold">{{servico.detalhes4.descricao}}</span>
                                              <div class="row full-width" style="padding-bottom: 10px; text-align: justify;">
                                                  <template v-for="(item, index) in servico.detalhes4.itens" :key="index">
                                                      <div class="row">
                                                          <span class="text-body2">
                                                              {{item.descricao}}<span v-if="servico.detalhes4.itens.length > 1 && ((index + 1) < servico.detalhes4.itens.length)">, </span>
                                                          </span>
                                                      </div>
                                                  </template>
                                              </div>
                                          </div>
                                          <div class="row" v-if="servico.detalhes5.descricao !== undefined">
                                              <span class="text-subtitle2 text-weight-bold">{{servico.detalhes5.descricao}}</span>
                                              <div class="row full-width" style="padding-bottom: 10px; text-align: justify;">
                                                  <template v-for="(item, index) in servico.detalhes5.itens" :key="index">
                                                      <div class="row">
                                                          <span class="text-body2">
                                                              {{item.descricao}}<span v-if="servico.detalhes5.itens.length > 1 && ((index + 1) < servico.detalhes5.itens.length)">, </span>
                                                          </span>
                                                      </div>
                                                  </template>
                                              </div>
                                          </div>
                                          <div class="row" v-if="servico.detalhes6.descricao !== undefined">
                                              <span class="text-subtitle2 text-weight-bold">{{servico.detalhes6.descricao}}</span>
                                              <div class="row full-width" style="padding-bottom: 10px; text-align: justify;">
                                                  <template v-for="(item, index) in servico.detalhes6.itens" :key="index">
                                                      <div class="row">
                                                          <span class="text-body2">
                                                              {{item.descricao}}<span v-if="servico.detalhes6.itens.length > 1 && ((index + 1) < servico.detalhes6.itens.length)">, </span>
                                                          </span>
                                                      </div>
                                                  </template>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <span class="text-subtitle2 text-weight-bold">Quando o serviço deve ser realizado?</span>
                                              <div class="row full-width" style="padding-bottom: 10px">
                                                  <span class="text-body2">{{servico.inicioTrabalho.descricao}}</span>
                                              </div>
                                          </div>
                                      </div>

                                      <div class="row" style="padding: 10px;">
                                          <span class="text-subtitle1 text-weight-bold text-negative">Atenção</span>
                                          <div class="row full-width" style="padding-bottom: 10px; text-align: justify;">
                                              <span class="text-body2">Ao confirmar seu pedido os prestadores serão notificados e até três prestadores poderão entrar em contato com você. Você pode acompanhar seus pedidos na página inicial.</span>
                                          </div>
                                      </div>

                                  </q-card-section>

                              </q-card>
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
import {
  API,
  request
} from '../../uteis/request'

export default {
  data () {
    return {
      titulo: '',
      descricaoSelecao: '',
      labelBtn: 'Continuar',
      categoria: LocalStorage.getItem("categoriaNovoServico"),
      listaCategoria: [],
      itens: [],
      itemSelecionado: {},
      itensSelecionados: [],
      multiselecao: false,
      descricao: '',
      orcamento: false,
      servico: {
          detalhes1:{
              itens: []
          },
          detalhes2:{
              itens: []
          },
          detalhes3:{
              itens: []
          },
          detalhes4:{
              itens: []
          },
          detalhes5:{
              itens: []
          },
          detalhes6:{
              itens: []
          }
      },
      passo: 0,
      passoLimite: 6,
      prazo: false,
      finaliza: false,
      prazos: [
          {
              _id: 1,
              descricao: "O mais rápido possível"
          },
          {
              _id: 2,
              descricao: "Nos próximos dias"
          },
          {
              _id: 3,
              descricao: "Na próxima semana"
          },
          {
              _id: 4,
              descricao: "Em até 30 dias"
          },
          {
              _id: 5,
              descricao: "Sem previsão"
          }
      ]
    }
  },
  mounted() {
    if(!!this.categoria)
    {
      if(this.categoria.subcategoria.detalhes6.descricao === undefined)
      {
        this.passoLimite = 5

        if(this.categoria.subcategoria.detalhes5.descricao === undefined)
        {
          this.passoLimite = 4

          if(this.categoria.subcategoria.detalhes4.descricao === undefined)
          {
            this.passoLimite = 3

            if(this.categoria.subcategoria.detalhes3.descricao === undefined)
            {
              this.passoLimite = 2

              if(this.categoria.subcategoria.detalhes2.descricao === undefined)
                this.passoLimite = 1
            }
          }
        }
      }

      this.confirmar(false)
    }
    else
    {
      this.voltar()
    }
  },
  methods: {
    voltar()
    {
      if(this.passo === 1)
        this.$router.go(-1)
      else
      {
        if(this.finaliza)
        {
          this.finaliza = false
          this.prazo = false
          this.labelBtn = 'Continuar'
        }
        else
        {
          if(this.prazo)
          {
            this.prazo = false
            this.passo -= 1
          }
          else
            this.passo -= 2
        }

        this.confirmar(true)
      }
    },
    confirmar(voltar)
    {
      let continua = true

      //Se estiver avançando
      if(!voltar)
      {
        if(this.passo > 0)
        {
          if(this.multiselecao)
          {
              if(this.itensSelecionados.length <= 0)
                continua = false
          }
          else if(this.itemSelecionado._id === undefined || this.itemSelecionado._id === null || this.itemSelecionado._id === '')
                  continua = false

          //Preenche os dados do serviço
          if(continua)
          {
            if(!this.prazo)
            {
              if(this.passo === 1)
              {
                this.servico.detalhes1 = {}
                this.servico.detalhes1.descricao = this.titulo
                this.servico.detalhes1.multiselecao = this.multiselecao
                this.servico.detalhes1.itens = []

                if(this.multiselecao)
                  this.servico.detalhes1.itens = this.itensSelecionados
                else
                  this.servico.detalhes1.itens.push(this.itemSelecionado)
              }
              else if(this.passo === 2)
              {
                this.servico.detalhes2 = {}
                this.servico.detalhes2.descricao = this.titulo
                this.servico.detalhes2.multiselecao = this.multiselecao
                this.servico.detalhes2.itens = []

                if(this.multiselecao)
                  this.servico.detalhes2.itens = this.itensSelecionados
                else
                  this.servico.detalhes2.itens.push(this.itemSelecionado)
              }
              else if(this.passo === 3)
              {
                this.servico.detalhes3 = {}
                this.servico.detalhes3.descricao = this.titulo
                this.servico.detalhes3.multiselecao = this.multiselecao
                this.servico.detalhes3.itens = []

                if(this.multiselecao)
                  this.servico.detalhes3.itens = this.itensSelecionados
                else
                  this.servico.detalhes3.itens.push(this.itemSelecionado)
              }
              else if(this.passo === 4)
              {
                this.servico.detalhes4 = {}
                this.servico.detalhes4.descricao = this.titulo
                this.servico.detalhes4.multiselecao = this.multiselecao
                this.servico.detalhes4.itens = []

                if(this.multiselecao)
                  this.servico.detalhes4.itens = this.itensSelecionados
                else
                  this.servico.detalhes4.itens.push(this.itemSelecionado)
              }
              else if(this.passo === 5)
              {
                this.servico.detalhes5 = {}
                this.servico.detalhes5.descricao = this.titulo
                this.servico.detalhes5.multiselecao = this.multiselecao
                this.servico.detalhes5.itens = []

                if(this.multiselecao)
                  this.servico.detalhes5.itens = this.itensSelecionados
                else
                  this.servico.detalhes5.itens.push(this.itemSelecionado)
              }
              else
              {
                this.servico.detalhes6 = {}
                this.servico.detalhes6.descricao = this.titulo
                this.servico.detalhes6.multiselecao = this.multiselecao
                this.servico.detalhes6.itens = []

                if(this.multiselecao)
                  this.servico.detalhes6.itens = this.itensSelecionados
                else
                  this.servico.detalhes6.itens.push(this.itemSelecionado)
              }
            }
            else if(!this.finaliza)
            {
              this.servico.inicioTrabalho = this.itemSelecionado
              this.titulo = "Estamos quase lá, confirme os dados do pedido"
              this.labelBtn = 'Confirmar'
            }
            else
            {
              this.servico.descricao = this.descricao
              this.servico.tipo = this.orcamento ? 'O' : 'S'
              this.enviaPedido()
            }
          }
        }
      }

      if(continua)
      {
          const subcategoria = this.categoria.subcategoria

          if(this.passo === 0)
          {
            this.titulo = subcategoria.detalhes1.descricao
            this.multiselecao = subcategoria.detalhes1.multiselecao
            this.itens = subcategoria.detalhes1.itens

            if(voltar || !!this.servico.detalhes1.itens)
            {
                if(this.multiselecao)
                  this.itensSelecionados = this.servico.detalhes1.itens
                else
                  this.itemSelecionado = this.servico.detalhes1.itens[0]
            }
            else
            {
                this.itemSelecionado = {}
                this.itensSelecionados = []
            }
          }
          else if(this.passo === 1)
          {
            if(subcategoria.detalhes2.itens.length > 0)
            {
              this.titulo = subcategoria.detalhes2.descricao
              this.multiselecao = subcategoria.detalhes2.multiselecao
              this.itens = subcategoria.detalhes2.itens

              if(voltar || !!this.servico.detalhes2.itens)
              {
                if(this.multiselecao)
                  this.itensSelecionados = this.servico.detalhes2.itens
                else
                  this.itemSelecionado = this.servico.detalhes2.itens[0]
              }
              else
              {
                this.itemSelecionado = {}
                this.itensSelecionados = []
              }
            }
          }
          else if(this.passo === 2)
          {
            if(subcategoria.detalhes3.itens.length > 0)
            {
              this.titulo = subcategoria.detalhes3.descricao
              this.multiselecao = subcategoria.detalhes3.multiselecao
              this.itens = subcategoria.detalhes3.itens

              if(voltar || !!this.servico.detalhes3.itens)
              {
                if(this.multiselecao)
                  this.itensSelecionados = this.servico.detalhes3.itens
                else
                  this.itemSelecionado = this.servico.detalhes3.itens[0]
              }
              else
              {
                this.itemSelecionado = {}
                this.itensSelecionados = []
              }
            }
          }
          else if(this.passo === 3)
          {
            if(subcategoria.detalhes4.itens.length > 0){
              this.titulo = subcategoria.detalhes4.descricao
              this.multiselecao = subcategoria.detalhes4.multiselecao
              this.itens = subcategoria.detalhes4.itens

              if(voltar || !!this.servico.detalhes4.itens)
              {
                if(this.multiselecao)
                  this.itensSelecionados = this.servico.detalhes4.itens
                else
                  this.itemSelecionado = this.servico.detalhes4.itens[0]
              }
              else
              {
                this.itemSelecionado = {}
                this.itensSelecionados = []
              }
            }
          }
          else if(this.passo === 4)
          {
            if(subcategoria.detalhes5.itens.length > 0)
            {
              this.titulo = subcategoria.detalhes5.descricao
              this.multiselecao = subcategoria.detalhes5.multiselecao
              this.itens = subcategoria.detalhes5.itens

              if(voltar || !!this.servico.detalhes5.itens)
              {
                if(this.multiselecao === true)
                  this.itensSelecionados = this.servico.detalhes5.itens
                else
                  this.itemSelecionado = this.servico.detalhes5.itens[0]
              }
              else
              {
                this.itemSelecionado = {}
                this.itensSelecionados = []
              }
            }
          }
          else if(this.passo === 5)
          {
            if(subcategoria.detalhes6.itens.length > 0)
            {
              this.titulo = subcategoria.detalhes6.descricao
              this.multiselecao = subcategoria.detalhes6.multiselecao
              this.itens = subcategoria.detalhes6.itens

              if(voltar || !!this.servico.detalhes6.itens)
              {
                if(this.multiselecao === true)
                  this.itensSelecionados = this.servico.detalhes6.itens
                else
                  this.itemSelecionado = this.servico.detalhes6.itens[0]
              }
              else
              {
                this.itemSelecionado = {}
                this.itensSelecionados = []
              }
            }
          }

          if(this.multiselecao === true)
            this.descricaoSelecao = 'Você pode selecionar mais de um item.'
          else
            this.descricaoSelecao = 'Você pode selecionar apenas um item.'

          if(this.passo < this.passoLimite)
            this.passo += 1
          else
          {
            if(this.prazo === false)
            {
              this.passo = this.passoLimite
              this.prazo = true
              this.titulo = "Quando você deseja que este serviço seja realizado?"
              this.multiselecao = false
              this.itens = this.prazos

              if(voltar || !!this.servico.inicioTrabalho)
                this.itemSelecionado = this.servico.inicioTrabalho
              else
                this.itemSelecionado = {}
            }
            else
              this.finaliza = true
          }
      }
      else
      {
        this.$q.notify({
          icon: 'mdi-close',
          color: 'negative',
          message: `Selecione a opção desejada.`,
          position: 'top'
        })
      }
    },
    async enviaPedido()
    {
      LocalStorage.set("novoServico", this.servico)

      const tipoLogin = SessionStorage.getItem("tipoLogin"),
              usuario = LocalStorage.getItem("usuario")

      let obj = {}
      obj.descricao   = this.servico.descricao
      obj.tipo        = this.servico.tipo
      obj.inicioTrabalho = this.servico.inicioTrabalho._id
      obj.idCategoria = this.categoria._id
      obj.idSubCategoria = this.categoria.subcategoria._id
      obj.virtual     = this.categoria.subcategoria.podeSerVirtual

      if(!!this.servico.detalhes1.descricao)
      {
        obj.detalhes1 = {
          descricao: this.servico.detalhes1.descricao,
          itens: []
        }

        this.servico.detalhes1.itens.forEach(item => {
          obj.detalhes1.itens.push({
            descricao: item.descricao
          })
        })
      }

      if(!!this.servico.detalhes2.descricao)
      {
        obj.detalhes2 = {
          descricao: this.servico.detalhes2.descricao,
          itens: []
        }

        this.servico.detalhes2.itens.forEach(item => {
          obj.detalhes2.itens.push({
            descricao: item.descricao
          })
        })
      }

      if(!!this.servico.detalhes3.descricao)
      {
        obj.detalhes3 = {
          descricao: this.servico.detalhes3.descricao,
          itens: []
        }

        this.servico.detalhes3.itens.forEach(item => {
          obj.detalhes3.itens.push({
            descricao: item.descricao
          })
        })
      }

      if(!!this.servico.detalhes4.descricao)
      {
        obj.detalhes4 = {
          descricao: this.servico.detalhes4.descricao,
          itens: []
        }

        this.servico.detalhes4.itens.forEach(item => {
          obj.detalhes4.itens.push({
            descricao: item.descricao
          })
        })
      }

      if(!!this.servico.detalhes5.descricao)
      {
        obj.detalhes5 = {
          descricao: this.servico.detalhes5.descricao,
          itens: []
        }

        this.servico.detalhes5.itens.forEach(item => {
          obj.detalhes5.itens.push({
            descricao: item.descricao
          })
        })
      }

      if(!!this.servico.detalhes6.descricao)
      {
        obj.detalhes6 = {
          descricao: this.servico.detalhes6.descricao,
          itens: []
        }

        this.servico.detalhes6.itens.forEach(item => {
          obj.detalhes6.itens.push({
            descricao: item.descricao
          })
        })
      }

      if(tipoLogin !== 's')
      {
        obj.idContratante = usuario._id
        obj.endereco = {
          ibge: usuario.ibge,
          uf: usuario.uf
        }

        const retorno = await request(API, 'POST', 'servicos', obj).then(resposta => resposta?.data)

        if(!!retorno?.sucesso)
        {
          this.$q.notify({
            icon: 'mdi-close',
            color: 'positive',
            message: `Seu pedido foi realizado`,
            position: 'top'
          })

          LocalStorage.remove("novoServico")
          LocalStorage.remove("categoriaNovoServico")

          this.$router.push('/servico/listagem')
        }
        else
        {
          if(!!retorno.dados)
            this.$q.notify({
              icon: 'mdi-close',
              color: 'negative',
              message: retorno.dados || 'Problemas ao salvar pedido, tente novamente mais tarde.',
              position: 'top'
            })
        }
      }
      else
      {
        LocalStorage.set("novoServicoEnviar", obj)
        this.$router.push('/pessoa/perfil')
      }
    }
  }
}
</script>

