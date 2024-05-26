<template>
  <q-page padding style="padding-top: 8px">
    <div class="row justify-center" v-if="usuario.prestador">

      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
        narrow-indicator>
        <q-tab name="disponiveis" label="Disponíveis" @click="salvaTab('disponiveis')" />
        <q-tab name="candidatados" label="Candidatados" @click="salvaTab('candidatados')" />
        <q-tab name="solicitados" label="Solicitados" @click="salvaTab('solicitados')" />
      </q-tabs>

      <div class="row scroll" style="padding-top: 8px; height: 76vh;">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="disponiveis" style="padding: 0px; width: 94vw;">
            <template v-for="servico in servicosDisponiveis" :key="servico._id">
              <q-card class="full-width" style="margin-bottom: 10px;" flat bordered
                @click="abrirServico(servico._id, servico.nomeCategoria, servico.nomeSubCategoria, servico.icone, servico.dataCadastro, 'D')">
                <q-card-section horizontal>
                  <q-icon class="col-2" :name="servico.icone" color="primary" size="36px" style="padding-left: 15px" />

                  <q-card-section class="row full-width" style="border-left-color: #999">
                    <div class="col-12">
                      <span class="text-subtitle1 text-weight-medium">{{ servico.nomeCategoria }}</span>
                    </div>
                    <div class="col-12" style="margin-top: -5px">
                      <span class="text-subtitle1">{{ servico.nomeSubCategoria }}</span>
                    </div>
                    <div class="col-12" style="margin-top: -5px;">
                      <span class="text-grey-7" style="font-size: 14px">Solicitado em {{ servico.dataCadastro }}</span>
                    </div>
                    <div class="col-12" style="margin-top: -5px;">
                      <span class="text-grey-7" style="font-size: 14px" v-if="servico.candidatos.length === 0">Nenhum
                        prestador se candidatou ainda</span>
                      <span class="text-grey-7" style="font-size: 14px" v-else-if="servico.candidatos.length === 1">1
                        prestador se candidatou</span>
                      <span class="text-grey-7" style="font-size: 14px" v-else>{{ servico.candidatos.length }} prestadores
                        se candidataram</span>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </template>
          </q-tab-panel>

          <q-tab-panel name="candidatados" style="padding: 0px; width: 94vw;">
            <template v-for="servico in servicosCandidatados" :key="servico._id">
              <q-card class="full-width" style="margin-bottom: 10px;" flat bordered
                @click="abrirServico(servico._id, servico.nomeCategoria, servico.nomeSubCategoria, servico.icone, servico.dataCadastro, 'C')">
                <q-card-section horizontal>
                  <q-icon class="col-2" :name="servico.icone" color="primary" size="36px" style="padding-left: 15px" />

                  <q-card-section class="row full-width" style="border-left-color: #999">
                    <div class="col-10">
                      <span class="text-subtitle1 text-weight-medium">{{ servico.nomeCategoria }}</span>
                    </div>
                    <div class="col-2">
                      <span class="text-positive text-weight-medium" v-if="servico.situacao == 'A'">Aberto</span>
                      <span class="text-negative text-weight-medium" v-else>Fechado</span>
                    </div>
                    <div class="col-12" style="margin-top: -5px">
                      <span class="text-subtitle1">{{ servico.nomeSubCategoria }}</span>
                    </div>
                    <div class="col-12" style="margin-top: -5px;">
                      <span class="text-grey-7" style="font-size: 14px">Solicitado em {{ servico.dataCadastro }}</span>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </template>
          </q-tab-panel>

          <q-tab-panel name="solicitados" style="padding: 0px; width: 94vw;">
            <template v-for="servico in servicosSolicitados" :key="servico._id">
              <q-card class="full-width" style="margin-bottom: 10px;" flat bordered
                @click="abrirServico(servico._id, servico.nomeCategoria, servico.nomeSubCategoria, servico.icone, servico.dataCadastro, 'S')">
                <q-card-section horizontal>
                  <q-icon class="col-2" :name="servico.icone" color="primary" size="36px" style="padding-left: 15px" />

                  <q-card-section class="row full-width">
                    <div class="col-10">
                      <span class="text-subtitle1 text-weight-medium">{{ servico.nomeCategoria }}</span>
                    </div>
                    <div class="col-2">
                      <span class="text-positive text-weight-medium" v-if="servico.situacao == 'A'">Aberto</span>
                      <span class="text-negative text-weight-medium" v-else>Fechado</span>
                    </div>
                    <div class="col-12" style="margin-top: -5px">
                      <span class="text-subtitle1 text-weight-regular">{{ servico.nomeSubCategoria }}</span>
                    </div>
                    <div class="col-12" style="margin-top: -5px;">
                      <span class="text-grey-7" style="font-size: 14px">Solicitado em {{ servico.dataCadastro }}</span>
                    </div>
                    <div class="col-12" style="margin-top: -5px;">
                      <span class="text-grey-7" style="font-size: 14px" v-if="servico.candidatos.length === 0">Nenhum
                        prestador se candidatou ainda</span>
                      <span class="text-grey-7" style="font-size: 14px" v-else-if="servico.candidatos.length === 1">1
                        prestador se candidatou</span>
                      <span class="text-grey-7" style="font-size: 14px" v-else>{{ servico.candidatos.length }} prestadores
                        se candidataram</span>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </template>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <div class="row justify-center" v-else>
      <div class="row text-left">
        <span class="text-body1">Minhas solicitações de serviço</span>
      </div>

      <div class="row scroll" style="padding-top: 8px; max-height: 82vh;">
        <template v-for="servico in servicosSolicitados" :key="servico._id">
          <q-card class="full-width" style="margin-bottom: 10px;" flat bordered
            @click="abrirServico(servico._id, servico.nomeCategoria, servico.nomeSubCategoria, servico.icone, servico.dataCadastro, 'S')">
            <q-card-section horizontal>
              <q-icon class="col-2" :name="servico.icone" color="primary" size="36px" style="padding-left: 15px" />

              <q-card-section class="row full-width">
                <div class="col-10">
                  <span class="text-subtitle1 text-weight-medium">{{ servico.nomeCategoria }}</span>
                </div>
                <div class="col-2">
                  <span class="text-positive text-weight-medium" v-if="servico.situacao == 'A'">Aberto</span>
                  <span class="text-negative text-weight-medium" v-else>Fechado</span>
                </div>
                <div class="col-12" style="margin-top: -5px">
                  <span class="text-subtitle1 text-weight-regular">{{ servico.nomeSubCategoria }}</span>
                </div>
                <div class="col-12" style="margin-top: -5px;">
                  <span class="text-grey-7" style="font-size: 14px">Solicitado em {{ servico.dataCadastro }}</span>
                </div>
                <div class="col-12" style="margin-top: -5px;">
                  <span class="text-grey-7" style="font-size: 14px" v-if="servico.candidatos.length === 0">Nenhum
                    prestador se candidatou ainda</span>
                  <span class="text-grey-7" style="font-size: 14px" v-else-if="servico.candidatos.length === 1">1
                    prestador se candidatou</span>
                  <span class="text-grey-7" style="font-size: 14px" v-else>{{ servico.candidatos.length }} prestadores se
                    candidataram</span>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </template>
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
      categorias: LocalStorage.getItem('categorias'),
      servicos: LocalStorage.getItem('servicos'),
      token: LocalStorage.getItem("token"),
      usuario: LocalStorage.getItem("usuario"),
      tabs: ['disponiveis', 'candidatados', 'solicitados'],
      tab: SessionStorage.getItem('tab'),
      servicosDisponiveis: [],
      servicosCandidatados: [],
      servicosSolicitados: [],
    }
  },
  mounted() {
    if (!!this.categorias === false)
      this.buscarCategorias()

    if (!this.tabs.includes(this.tab)) {
      this.tab = 'disponiveis'
      this.salvaTab('disponiveis')
    }

    if (!!this.usuario.prestador) {
      this.buscarServicosDisponiveis()
      this.buscarServicosCandidatados()
    }

    this.buscarServicosSolicitados()
  },
  methods: {
    salvaTab(tab) {
      SessionStorage.set('tab', tab)
    },
    async buscarCategorias() {
      const retornoCategorias = await request(API, 'GET', 'categorias').then(retorno => retorno?.data)

      if (!!retornoCategorias) {
        //Organiza as categorias e subcategorias por ordem alfabética
        this.categorias = ordernarCategorias(retornoCategorias)
        LocalStorage.set('categorias', this.categorias)
      }
      else {
        this.$q.notify({
          icon: 'close',
          color: 'negative',
          message: `Problemas ao listar as categorias.`,
          position: 'top'
        })
      }
    },
    async buscarServicosDisponiveis() {
      let querySubcategorias = ''
      if (!!this.usuario.categorias) {
        this.usuario.categorias.forEach(categoria => {
          querySubcategorias += `&idSubCategoria=${categoria._id}`
        })
      }

      const url = `servicos/?tipoRetorno=1&idContratante=${this.usuario._id}&situacao=a&ibge=${this.usuario.ibge}${querySubcategorias}`,
        retorno = await request(API, 'GET', url).then(response => response?.data)

      if (!!retorno.sucesso) {
        this.servicosDisponiveis = retorno.dados
        this.servicosDisponiveis.reverse()
        this.servicosDisponiveis = this.formataServico(this.servicosDisponiveis)
      }
      else {
        this.$q.notify({
          icon: 'close',
          color: 'negative',
          message: `Problemas ao buscar serviços disponíveis.`,
          position: 'top'
        })
      }
    },
    async buscarServicosCandidatados() {
      const retorno = await request(API, 'GET', `servicos/?tipoRetorno=2&idCandidato=${this.usuario._id}`).then(response => response?.data)
      if (!!retorno.sucesso) {
        this.servicosCandidatados = retorno.dados
        this.servicosCandidatados.reverse()
        this.servicosCandidatados = this.formataServico(this.servicosCandidatados)
      }
      else {
        this.$q.notify({
          icon: 'close',
          color: 'negative',
          message: `Problemas ao buscar serviços candidatados.`,
          position: 'top'
        })
      }
    },
    async buscarServicosSolicitados() {
      const retorno = await request(API, 'GET', `servicos/?tipoRetorno=3&idContratante=${this.usuario._id}`).then(retorno => retorno?.data)
      if (!!retorno.sucesso) {
        this.servicosSolicitados = retorno.dados
        this.servicosSolicitados.reverse()
        this.servicosSolicitados = this.formataServico(this.servicosSolicitados)
      }
      else {
        this.$q.notify({
          icon: 'close',
          color: 'negative',
          message: `Problemas ao buscar serviços solicitados.`,
          position: 'top'
        })
      }
    },
    formataServico(servicos) {
      servicos.forEach(servico => {
        servico.dataCadastro = this.parseData(servico.dataCadastro)

        for (let i = 0; i < this.categorias.length; i++) {
          servico.nomeCategoria = this.categorias[i].nome
          servico.icone = this.categorias[i].icone

          for (let j = 0; j < this.categorias[i].subCategorias.length; j++) {
            if (!!this.categorias[i].subCategorias[j])
              servico.nomeSubCategoria = this.categorias[i].subCategorias[j].nome
          }
        }
      })

      return servicos
    },
    async abrirServico(id, nomeCategoria, nomeSubCategoria, icone, data, tipo) {
      const retorno = await request(API, 'GET', `servicos/${id}`).then(response => response?.data)
      if (!!retorno.sucesso) {
        let servico = retorno.dados
        servico.nomeCategoria = nomeCategoria
        servico.nomeSubCategoria = nomeSubCategoria
        servico.icone = icone
        servico.dataCadastro = data

        //Se é serviço solicitado, busca os candidatos se não, busca os dados do contratante
        if (tipo === 'S') {
          let query = '?tipoRetorno=1'
          servico.candidatos.forEach(candidato => {
            query += `&id=${candidato._id}`
          })

          if (servico.candidatos.length > 0) {
            const candidatos = await request(API, 'GET', `pessoas/${query}`).then(response => response?.data)
            if (!!candidatos.sucesso) {
              for (let a = 0; a < servico.candidatos.length; a++) {
                if (servico.candidatos[a]._id === servico.idContratado)
                  servico.candidatos[a].contratado = true
                else
                  servico.candidatos[a].contratado = false

                for (let b = 0; b < candidatos.dados.length; b++) {
                  if (servico.candidatos[a]._id == candidatos.dados[b]._id) {
                    servico.candidatos[a].nome = candidatos.dados[b].nome
                    servico.candidatos[a].descricao = candidatos.dados[b].descricao
                  }
                }
              }

              LocalStorage.set("servico", servico)
              this.$router.push('/servico')
            }
            else {
              this.$q.notify({
                icon: 'close',
                color: 'negative',
                message: `Problemas ao buscar candidatos.`,
                position: 'top'
              })
            }
          }
          else {
            LocalStorage.set("servico", servico)
            this.$router.push('/servico')
          }
        }
        else {
          //Busca os dados do contratante
          const contratante = await request(API, 'GET', `pessoas/?id=${servico.idContratante}`)
            .then(response => response?.data)

          if (!!contratante.sucesso) {
            servico.nomeContratante = contratante.dados[0].nome
            servico.telefonesContratante = contratante.dados[0].contatos

            LocalStorage.set("servico", servico)
            this.$router.push('/servico')
          }
          else {
            this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: `Problemas ao buscar candidatos.`,
              position: 'top'
            })
          }
        }
      }
      else {
        this.$q.notify({
          icon: 'close',
          color: 'negative',
          message: `Problemas ao buscar serviços disponíveis.`,
          position: 'top'
        })
      }
    },
    parseData(data) {
      if (!!data)
        return data.substr(8, 2) + "/" + data.substr(5, 2) + "/" + data.substr(0, 4)
      else
        return data
    }
  }
}
</script>
