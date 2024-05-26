<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <q-footer v-if="isContratante === false && servico.situacao === 'A'">
          <q-btn :label="labelBtnAcao" flat text-color="white" :class="corBtnAcao" size="20px" no-caps
            @click="confirmar(true)" />
        </q-footer>

        <div class="row justify-center">
          <div style="width: 800px; max-width: 100vw;">
            <div class="row q-gutter-sm bg-primary text-white"
              style="padding-left: 12px; padding-top: 9px; padding-bottom: 10px;">
              <div class="col-1">
                <q-btn icon="mdi-arrow-left" dense flat color="white" @click="voltar()" />
              </div>
              <div class="col-10">
                <span class="text-h6 text-weight-regular">Informações do serviço</span>
              </div>
            </div>

            <q-card class="bg-white no-shadow" Style="border-radius: 3px; padding: 0px;">
              <q-card-section>
                <!--Prestadores-->
                <div v-if="isContratante === true" style="padding-bottom: 25px;">
                  <div class="row items-end" style="margin-top: -10px">
                    <div class="col-12">
                      <span class="text-h6 text-weight-regular text-grey-9">Prestadores candidatos</span>
                    </div>
                  </div>

                  <div class="row" v-if="servico.candidatos.length > 0">
                    <q-list class="full-width">
                      <template v-for="prestador in servico.candidatos" :key="prestador._id">
                        <q-item clickable v-ripple
                          style="padding-left: 0px; padding-right: 0px; padding-top: 20px; padding-bottom: 20px"
                          @click="verPrestador(prestador)">
                          <q-item-section>
                            <q-item-label class="text-subtitle1 text-weight-medium">
                              <q-icon color="primary" name="mdi-check-bold" size="20px"
                                v-if="prestador.contratado === true" />
                              {{ prestador.nome }}
                            </q-item-label>
                            <q-item-label class="text-body1 text-grey-7" lines="2">{{ prestador.descricao
                              }}</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-separator />
                      </template>
                    </q-list>
                  </div>
                  <div class="row full-width" style="padding-top: 20px" v-else>
                    <div class="row full-width justify-center">
                      <span class="text-subtitle1 text-primary text-weight-medium">Nenhum prestador se candidatou
                        ainda</span>
                    </div>
                  </div>
                </div>

                <div class="row items-end" style="padding-bottom: 5px">
                  <div class="col-12">
                    <span class="text-h6 text-weight-regular text-grey-9">Resumo do pedido</span>
                  </div>
                </div>

                <div class="row bg-grey-2"
                  style="padding: 10px; border-radius: 8px; border-color: #dedede; border-style: solid; border-width:1px">
                  <div class="row">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      Tipo do pedido
                    </span>
                    <div class="row full-width" style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px">
                      <span class="text-body1" v-if="servico.tipo === 'O'">Orçamento</span>
                      <span class="text-body1" v-else>Serviço</span>
                    </div>
                  </div>
                  <div class="row">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      Categoria procurada
                    </span>
                    <div class="row full-width" style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px">
                      <span class="text-body1">{{ servico.nomeCategoria }}</span>
                    </div>
                  </div>
                  <div class="row">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      Profissional procurado
                    </span>
                    <div class="row full-width" style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px">
                      <span class="text-body1">{{ servico.nomeSubCategoria }}</span>
                    </div>
                  </div>
                  <div class="row">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      Quando o serviço deve ser realizado?
                    </span>
                    <div class="row full-width" style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px;">
                      <span class="text-body1" v-if="servico.inicioTrabalho === 1">O mais rápido possível</span>
                      <span class="text-body1" v-if="servico.inicioTrabalho === 2">Nos próximos dias</span>
                      <span class="text-body1" v-if="servico.inicioTrabalho === 3">Na próxima semana</span>
                      <span class="text-body1" v-if="servico.inicioTrabalho === 4">Em até 30 dias</span>
                      <span class="text-body1" v-else>Sem previsão</span>
                    </div>
                  </div>
                  <div class="row" v-if="servico.detalhes1.descricao !== undefined">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      {{ servico.detalhes1.descricao }}
                    </span>
                    <div class="row full-width"
                      style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px; text-align: justify;">
                      <template v-for="(item, index) in servico.detalhes1.itens" :key="index">
                        <div class="row">
                          <span class="text-body1">
                            {{ item.descricao }}<span
                              v-if="servico.detalhes1.itens.length > 1 && ((index + 1) < servico.detalhes1.itens.length)">,
                            </span>
                          </span>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="row" v-if="servico.detalhes2.descricao !== undefined">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      {{ servico.detalhes2.descricao }}
                    </span>
                    <div class="row full-width"
                      style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px; text-align: justify;">
                      <template v-for="(item, index) in servico.detalhes2.itens" :key="index">
                        <div class="row">
                          <span class="text-body1">
                            {{ item.descricao }}<span
                              v-if="servico.detalhes2.itens.length > 1 && ((index + 1) < servico.detalhes2.itens.length)">,
                            </span>
                          </span>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="row" v-if="servico.detalhes3.descricao !== undefined">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      {{ servico.detalhes3.descricao }}
                    </span>
                    <div class="row full-width"
                      style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px; text-align: justify;">
                      <template v-for="(item, index) in servico.detalhes3.itens" :key="index">
                        <div class="row">
                          <span class="text-body1">
                            {{ item.descricao }}<span
                              v-if="servico.detalhes3.itens.length > 1 && ((index + 1) < servico.detalhes3.itens.length)">,
                            </span>
                          </span>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="row" v-if="servico.detalhes4.descricao !== undefined">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      {{ servico.detalhes4.descricao }}
                    </span>
                    <div class="row full-width"
                      style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px; text-align: justify;">
                      <template v-for="(item, index) in servico.detalhes4.itens" :key="index">
                        <div class="row">
                          <span class="text-body1">
                            {{ item.descricao }}<span
                              v-if="servico.detalhes4.itens.length > 1 && ((index + 1) < servico.detalhes4.itens.length)">,
                            </span>
                          </span>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="row" v-if="servico.detalhes5.descricao !== undefined">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      {{ servico.detalhes5.descricao }}
                    </span>
                    <div class="row full-width"
                      style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px; text-align: justify;">
                      <template v-for="(item, index) in servico.detalhes5.itens" :key="index">
                        <div class="row">
                          <span class="text-body1">
                            {{ item.descricao }}<span
                              v-if="servico.detalhes5.itens.length > 1 && ((index + 1) < servico.detalhes5.itens.length)">,
                            </span>
                          </span>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="row" v-if="servico.detalhes6.descricao !== undefined">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      {{ servico.detalhes6.descricao }}
                    </span>
                    <div class="row full-width"
                      style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px; text-align: justify;">
                      <template v-for="(item, index) in servico.detalhes6.itens" :key="index">
                        <div class="row">
                          <span class="text-body1">
                            {{ item.descricao }}<span
                              v-if="servico.detalhes6.itens.length > 1 && ((index + 1) < servico.detalhes6.itens.length)">,
                            </span>
                          </span>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="row"
                    v-if="servico.descricao !== undefined && servico.descricao !== null && servico.descricao !== ''">
                    <span class="text-subtitle1 text-weight-medium">
                      <q-icon name="mdi-chevron-right" color="primary" />
                      Informações adicionais
                    </span>
                    <div class="row full-width" style="padding-left: 20px; margin-top: -5px; padding-bottom: 5px">
                      <span class="text-body1">{{ servico.descricao }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="isContratante === false">
                  <div class="row items-end" style="padding-top: 25px; padding-bottom: 5px">
                    <div class="col-12">
                      <span class="text-h6 text-weight-regular text-grey-9">Informações do cliente</span>
                    </div>
                  </div>

                  <div class="row bg-grey-2"
                    style="padding: 10px; border-radius: 8px; border-color: #dedede; border-style: solid; border-width:1px">
                    <div class="row">
                      <span class="text-subtitle1 text-weight-medium">
                        <q-icon name="mdi-account" size="20px" color="primary" style="margin-top: -5px" />
                        Nome
                      </span>
                      <div class="row full-width" style="padding-left: 25px; padding-bottom: 5px">
                        <span class="text-body1">{{ servico.nomeContratante }}</span>
                      </div>
                    </div>
                    <div class="row">
                      <span class="text-subtitle1 text-weight-medium">
                        <q-icon name="mdi-phone" size="20px" color="primary" style="margin-top: -5px" />
                        Telefones
                      </span>
                      <div class="row full-width" style="margin-top: -5px;">
                        <template v-for="(telefone, index) in servico.telefonesContratante" :key="index">
                          <div class="row full-width" style="padding-left: 25px; margin-top: 10px"
                            @click="conversar(telefone)">
                            <div class="col-11">
                              <span class="text-body1">
                                {{ telefone.numero }}
                              </span>
                            </div>
                            <div class="col-1" v-if="telefone.whatsapp === true">
                              <q-icon name="mdi-whatsapp" size="25px" color="positive" />
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-dialog v-model="isDescandidatar" persistent>
      <q-card style="width: 90vw">
        <q-card-section class="row items-center">
          <q-icon name="mdi-alert-outline" color="grey-10" size="28px" />
          <span class="text-h6" style="padding-left: 15px">Atenção</span>
        </q-card-section>

        <q-separator />

        <q-card-section class="row items-center">
          <span class="text-subtitle1" style="padding-left: 15px">Você realmente deseja não fazer mais parte da cotação
            desse serviço?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="black" @click="isDescandidatar = !isDescandidatar" />
          <q-btn flat label="Confirmar" color="black" @click="confirmar(false)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>


<script>
import {
  LocalStorage
} from 'quasar'
import {
  API,
  request
} from '../../uteis/request'

export default {
  data() {
    return {
      servico: LocalStorage.getItem("servico"),
      token: LocalStorage.getItem("token"),
      usuario: LocalStorage.getItem("usuario"),
      categorias: LocalStorage.getItem("categorias"),
      dataInicio: '',
      dataCadastro: '',
      telefones: [],
      popUpEnderecoContatoAberta: false,
      tituloPopUp: '',
      iconePopUp: '',
      popUpEndereco: false,
      prestadores: [],
      isContratante: true,
      isContratado: false,
      isCandidato: false,
      isDescandidatar: false,
      labelBtnAcao: "Quero fazer o serviço",
      corBtnAcao: "full-width bg-primary"
    }
  },
  mounted() {
    this.servico = LocalStorage.getItem("servico")

    if (!!this.servico === false)
      this.voltar()

    if (!!this.servico.idContratado === false)
      this.servico.idContratado = ''

    //Se o usuário logado é o contratante
    if (this.servico.idContratante === this.usuario._id) {
      //Percorre os candidatos
      for (let i = 0; i < this.servico.candidatos.length; i++) {
        //Encontra o contratado e seta true
        if (this.servico.candidatos[i]._id === this.servico.idContratado)
          this.servico.candidatos[i].contratado = true
        else
          this.servico.candidatos[i].contratado = false
      }
    }
    else {
      this.isContratante = false

      //Se eu sou o contratado
      if (this.servico.idContratado === this.usuario._id)
        this.isContratado = true
      else {
        //Percorre os candidatos
        for (let i = 0; i < this.servico.candidatos.length; i++) {
          //Me encontra e me marca como candidato
          if (this.servico.candidatos[i]._id === this.usuario._id) {
            this.isCandidato = true
            break
          }
        }

        this.telefones = this.servico.telefonesContratante

        if (this.isCandidato === false) {
          for (let i = 0; i < this.servico.telefonesContratante.length; i++) {
            this.servico.telefonesContratante[i].numero = this.servico.telefonesContratante[i].numero.substr(0, 7)
            this.servico.telefonesContratante[i].numero += "***-****"
          }
        }
      }
    }

    //Se o serviço ainda está ativo e eu não sou o contratado mas sou candidato, exibe a descontratação
    if (this.servico.situacao === "A" && this.isCandidato) {
      this.labelBtnAcao = "Não quero fazer o serviço"
      this.corBtnAcao = "full-width bg-negative"
    }
  },
  methods: {
    voltar() {
      this.$router.go(-1)
    },
    conversar(contato) {
      if (this.isCandidato === true) {
        if (contato.whatsapp) {
          const numero = contato.numero.replace(/\D/g, ""),
            texto = `Olá ${this.servico.nomeContratante} meu nome é ${this.usuario.nome}, recebi uma notificação do Encontre Prestadores informando que você precisa de um prestador. Podemos conversar um pouquinho sobre o serviço que você precisa?\n\nAcesse meu perfil e saiba mais sobre mim.`,
            link = `https://api.whatsapp.com/send?l=pt_BR&phone=550${numero}&text=${encodeURIComponent(texto)}`
          window.open(link, 'Conversa')
        }
      }
    },
    popUpEnderecoContato(tipo) {
      if (tipo === 'E') {
        this.tituloPopUp = "Dados do endereço"
        this.iconePopUp = "mdi-map-marker"
        this.popUpEndereco = true
      }
      else {
        this.tituloPopUp = "Dados do contato"
        this.iconePopUp = "call"
        this.popUpEndereco = false
      }

      this.popUpEnderecoContatoAberta = true
    },
    async verPrestador(prestador) {
      const resposta = await request(API, 'GET', `pessoas/${prestador._id}`).then(response => response?.data)

      if (!!resposta.sucesso) {
        let pessoa = resposta.dados

        for (let a = 0; a < pessoa.categorias.length; a++) {
          for (let b = 0; b < this.categorias.length; b++) {
            for (let c = 0; c < this.categorias[b].subCategorias.length; c++) {
              if (pessoa.categorias[a]._id == this.categorias[b].subCategorias[c]._id) {
                pessoa.categorias[a].nome = this.categorias[b].subCategorias[c].nome
              }
            }
          }
        }

        pessoa.contratado = prestador.contratado

        LocalStorage.set('prestador', pessoa)
        this.$router.push('/pessoa/prestador')
      }
      else {
        this.$q.notify({
          icon: 'mdi-close',
          color: 'negative',
          message: `Problemas ao buscar prestador.`,
          position: 'top'
        })
      }
    },
    async confirmar(abreConfirmacao) {
      //Se não é o contratante
      if (!this.isContratante) {
        //se ainda não é candidato pode se candidatar
        if (this.isCandidato === false) {
          const body = {
            _id: this.usuario._id
          },
            retorno = await request(API, 'POST', `servicos/${this.servico._id}/prestadores`, body).then(response => response?.data)

          if (!!retorno.sucesso) {
            this.isCandidato = true
            this.servico.telefonesContratante = this.telefones
            this.labelBtnAcao = "Não quero fazer o serviço"
            this.corBtnAcao = "full-width bg-negative"

            this.$q.notify({
              icon: 'mdi-check',
              color: 'positive',
              message: `Você se candidatou com sucesso.`,
              position: 'top'
            })
          }
          else {
            this.$q.notify({
              icon: 'mdi-close',
              color: 'negative',
              message: `Problemas ao se candidatar.`,
              position: 'top'
            })
          }
        }
        else {
          if (!!abreConfirmacao)
            this.isDescandidatar = true
          else {
            this.isDescandidatar = false

            //Se sou candidato posso me descandidatar
            const retorno = await request(API, 'DELETE', `servicos/${this.servico._id}/prestadores/${this.usuario._id}`)
              .then(_ => {
                this.$q.notify({
                  icon: 'mdi-check',
                  color: 'positive',
                  message: `Você não é mais candidato nesse serviço.`,
                  position: 'top'
                })

                this.$router.go(-1)
              })
              .catch(_ => {
                this.$q.notify({
                  icon: 'mdi-close',
                  color: 'negative',
                  message: `Problemas ao se descandidatar, tente novamente.`,
                  position: 'top'
                })
              })
          }
        }
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
