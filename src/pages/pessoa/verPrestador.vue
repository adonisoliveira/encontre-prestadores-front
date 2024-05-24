<template>
  <q-layout view="lHh Lpr lFf">
      <q-page-container>
          <q-page>
              <q-footer>
                  <q-btn
                      :label="labelBtnAcao"
                      flat
                      text-color="white"
                      :class="classBtnAcao"
                      size="20px"
                      no-caps
                      @click="confirmar()"
                  />
              </q-footer>

              <div class="row justify-center">
                  <div style="width: 800px; max-width: 100vw;">
                      <div class="row q-gutter-sm bg-primary text-white" style="padding-left: 12px; padding-top: 9px; padding-bottom: 10px;">
                          <div class="row full-width">
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
                                  <span class="text-h6 text-weight-regular"> Perfil do prestador </span>
                              </div>
                          </div>
                          <div class="row" style="padding-top: 10px;">
                              <div class="col-12">
                                  <span class="text-h6 text-weight-medium" >{{prestador.nome}}</span>
                              </div>
                              <div class="col-12">
                                  <q-icon name="mdi-star" size="20px" color="yellow-8" style="margin-top: -4px; margin-left: -3px"/>
                                  <span class="text-subtitle2"  style="padding-left: 5px">{{nota}} baseado em {{qtdAvaliacoes}} avaliações</span>
                              </div>
                          </div>
                      </div>

                      <div class="row full-width justify-center">
                          <q-tabs
                              v-model="tab"
                              class="text-grey"
                              active-color="primary"
                              indicator-color="primary"
                          >
                              <q-tab name="informacoes" label="Informações" />
                              <q-tab name="contatos" label="Contatos" />
                              <q-tab name="avaliacoes" label="Avaliações" />
                          </q-tabs>

                          <q-tab-panels v-model="tab" animated>
                              <q-tab-panel name="informacoes" style="padding: 0px; width: 94vw;">
                                  <div class="row" style="padding-top: 10px">
                                      <span class="text-h6 text-weight-regular text-grey-9" >Sobre</span>
                                  </div>
                                  <q-separator />
                                  <div class="row" style="padding-top: 10px; font-size: 16px; text-align: justify;">
                                      {{prestador.descricao}}
                                  </div>

                                  <div class="row" style="padding-top: 25px">
                                      <span class="text-h6 text-weight-regular text-grey-9" >Serviços que realizo</span>
                                  </div>
                                  <q-separator />
                                  <div class="row">
                                      <q-list class="full-width">
                                          <template v-for="categoria in prestador.categorias" :key="categoria._id">
                                              <q-item class="list-item" >
                                                  <q-item-section avatar>
                                                      <q-icon color="primary" name="mdi-checkbox-marked-outline" />
                                                  </q-item-section>
                                                  <q-item-section style="margin-left: -10px">
                                                      <q-item-label class="text-subtitle1">{{categoria.nome}}</q-item-label>
                                                  </q-item-section>
                                              </q-item>
                                          </template>
                                      </q-list>
                                  </div>

                              </q-tab-panel>
                              <q-tab-panel name="contatos" style="padding: 0px; width: 94vw;">
                                  <div class="row" style="padding-top: 10px">
                                      <span class="text-h6 text-weight-regular text-grey-9" >Telefone</span>
                                  </div>

                                  <q-separator />

                                  <div class="row">
                                      <q-list class="full-width">
                                          <template v-for="contato in prestador.contatos" :key="contato._id">
                                              <q-item class="list-item" clickable @click="compartilhar(contato)">
                                                  <q-item-section avatar v-if="contato.whatsapp">
                                                      <q-icon color="positive" name="mdi-whatsapp" />
                                                  </q-item-section>
                                                  <q-item-section avatar v-else>
                                                      <q-icon color="primary" name="call" />
                                                  </q-item-section>
                                                  <q-item-section style="margin-left: -10px">
                                                      <q-item-label class="text-subtitle1">{{contato.numero}}</q-item-label>
                                                  </q-item-section>
                                                  <q-item-section avatar v-if="contato.whatsapp">
                                                      <q-icon color="primary" name="mdi-chevron-right" />
                                                  </q-item-section>
                                              </q-item>
                                          </template>
                                      </q-list>
                                  </div>
                              </q-tab-panel>
                              <q-tab-panel name="avaliacoes" style="padding: 0px; width: 94vw;">
                                  <div class="row full-width">
                                      <div class="col-7" style="padding-top: 18px">
                                          <span class="text-subtitle1">{{qtdAvaliacoes}} avaliações</span>
                                      </div>
                                      <div class="col-5">
                                          <div class="row full-width justify-center" style="padding-top: 15px">
                                              <q-btn
                                                  label="Quero Avaliar"
                                                  icon-right="mdi-chevron-right"
                                                  dense
                                                  flat
                                                  color="primary"
                                                  @click="popupAvaliacao = true"
                                              />
                                          </div>
                                      </div>

                                  </div>

                                  <q-separator />

                                  <div class="row">
                                      <q-list class="full-width">
                                          <template v-for="avaliacao in avaliacoes" :key="avaliacao._id">
                                              <q-item class="list-item">
                                                  <q-item-section style="">
                                                      <q-item-label class="text-subtitle1 text-weight-medium text-primary">{{avaliacao.nome}}</q-item-label>
                                                      <q-item-label class="text-subtitle1 text-weight-medium text-primary">
                                                          <div class="q-gutter-y-md column">
                                                              <q-rating
                                                                  v-model="avaliacao.nota"
                                                                  :max="5"
                                                                  size="xs"
                                                                  color="yellow-8"
                                                                  icon="mdi-star-outline"
                                                                  icon-selected="mdi-star"
                                                                  icon-half="mdi-star-half"
                                                                  readonly
                                                              />
                                                          </div>
                                                      </q-item-label>
                                                      <q-item-label class="text-grey-8" style="font-size: 14px">{{avaliacao.descricao}}</q-item-label>
                                                  </q-item-section>
                                                  <!-- <q-item-section avatar>
                                                      <q-icon color="primary" name="mdi-chevron-right" />
                                                  </q-item-section> -->
                                              </q-item>
                                          </template>
                                      </q-list>
                                  </div>
                              </q-tab-panel>
                          </q-tab-panels>
                      </div>
                  </div>
              </div>
          </q-page>

          <q-dialog v-model="popupAvaliacao" persistent>
              <q-card style="width: 90vw">
                  <q-card-section class="row items-center">
                      <!-- <q-icon name="star" color="yellow-8" size="28px" /> -->
                      <span class="text-h6" style="padding-left: 15px">Envie sua avaliação</span>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="row items-center">
                      <div class="row">
                          <span class="text-subtitle1 text-weight-medium text-grey-9">Qual é seu nível de satisfação?</span>
                          <span class="text-subtitle2 text-weight-medium text-grey-6" style="margin-top: -10px">Escolha de 1 a 5 estrelas</span>
                      </div>

                      <div class="row">
                          <q-rating
                              v-model="notaAvaliacao"
                              :max="5"
                              size="lg"
                              color="yellow-8"
                              icon="mdi-star-outline"
                              icon-selected="mdi-star"
                              icon-half="mdi-star-half"
                          />
                      </div>

                      <div class="row" style="margin-top: 20px">
                          <span class="text-subtitle1 text-weight-medium text-grey-9">Conte como foi sua experiência</span>
                      </div>

                      <q-input
                          v-model="descricaoAvaliacao"
                          ref="descricaoAvaliacao"
                          type="textarea"
                          class="full-width"
                          autogrow
                          :input-style="{ fontSize: '16px' }"
                          outlined
                          @keyup.enter="enviarAvaliacao()"
                      />
                  </q-card-section>

                  <q-card-actions align="right">
                      <q-btn flat label="Cancelar" color="black" @click="popupAvaliacao = !popupAvaliacao" />
                      <q-btn flat label="Enviar" color="black" @click="enviarAvaliacao()" />
                  </q-card-actions>
              </q-card>
          </q-dialog>
      </q-page-container>
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
        prestador: LocalStorage.getItem("prestador"),
        servico: LocalStorage.getItem("servico"),
        token: LocalStorage.getItem("token"),
        usuario: LocalStorage.getItem("usuario"),
        labelBtnAcao: "Contratar",
        classBtnAcao: "full-width bg-primary",
        tab: 'informacoes',
        popupAvaliacao: false,
        nota: 0,
        notaAvaliacao: 0,
        descricaoAvaliacao: '',
        avaliacoes: [],
        qtdAvaliacoes: 0,
        viaLink: false
      }
    },
    mounted() {
      if(this.prestador.contratado === true){
        this.labelBtnAcao = "Descontratar",
        this.classBtnAcao = "full-width bg-negative"
      }

      this.buscarAvaliacoes()
    },
    methods: {
      voltar()
      {
        this.$router.go(-1)
      },
      async buscarAvaliacoes()
      {
        const avaliacoes = await request(API, 'GET', `pessoas/${this.prestador._id}/avaliacoes`).then(response => response?.data)

        if(!!avaliacoes.sucesso)
        {
          this.nota = avaliacoes.dados.nota
          this.qtdAvaliacoes = avaliacoes.dados.avaliacoes.length
          this.avaliacoes = avaliacoes.dados.avaliacoes
        }
      },
      async enviarAvaliacao()
      {
        let enviar = true
        if(!!this.notaAvaliacao && (this.notaAvaliacao > 0 && this.notaAvaliacao <= 5))
        {
          if(!!this.descricaoAvaliacao === false)
          {
              enviar = false
              this.$q.notify({
                icon: 'mdi-close',
                color: 'negative',
                message: 'Por favor, comente sua experiência com o prestador.',
                position: 'top'
              })
          }
        }
        else
        {
          enviar = false
          this.$q.notify({
            icon: 'mdi-close',
            color: 'negative',
            message: 'Informe a nota de 1 a 5 selecionando a estrela.',
            position: 'top'
          })
        }

        if(!!enviar)
        {
          const body = {
            nome: this.usuario.nome,
            nota: this.notaAvaliacao,
            descricao: this.descricaoAvaliacao
          },
          retorno = await request(API, 'POST', `pessoas/${this.prestador._id}/avaliacoes`, body).then(response => response?.data)

          if(!!retorno.sucesso)
          {
            this.$q.notify({
              icon: 'mdi-check',
              color: 'positive',
              message: 'Avaliação enviada com sucesso.',
              position: 'top'
            })

            this.popupAvaliacao = false
          }
          else
          {
            this.$q.notify({
              icon: 'mdi-close',
              color: 'negative',
              message: 'Problemas ao enviar avaliação, tente novamente mais tarde.',
              position: 'top'
            })
          }
        }
      },
      async confirmar()
      {
          const body = {
            idContratado: this.prestador.contratado ? '' : this.prestador._id,
            situacao: this.prestador.contratado ? 'A' : 'F'
          },
          retorno = await request(API, 'PUT', `servicos/${this.servico._id}`, body).then(response => response?.data)

          if(!!retorno.sucesso)
          {
            this.servico.candidatos.forEach(candidato => {
              if(candidato._id === this.prestador._id)
                candidato.contratado = this.prestador.contratado === true ? false : true
              else
                candidato.contratado = false
            })

            LocalStorage.set("servico", this.servico)

            this.$q.notify({
                icon: 'mdi-check',
                color: 'positive',
                message: this.prestador.contratado ? 'Prestador descontratado com sucesso.' : `Prestador contratado com sucesso.`,
                position: 'top'
            })

            this.$router.go(-1)
          }
          else
          {
            this.$q.notify({
              icon: 'mdi-close',
              color: 'negative',
              message: this.prestador.contratado ? 'Problemas ao descontratar prestador.' : `Problemas ao contratar prestador.`,
              position: 'top'
            })
          }
      },
      compartilhar(contato)
      {
        if(contato.whatsapp)
        {
          const numero = contato.numero.replace(/\D/g,"")
          const link = encodeURIComponent(`Olá ${this.prestador.nome} meu nome é ${this.usuario.nome}, vi que você se candidatou no serviço que solicitei no Encontre Prestadores, podemos conversar sobre o ele?`)
          window.open(`https://api.whatsapp.com/send?l=pt_BR&phone=550${numero}&text=${link}`, "Conversa")
        }
      }
    }
  }
</script>

<style lang="sass">
.list-item
  padding-left: 0px
  padding-right: 0px
.list-item-avatar
  padding: 4px
  min-width: 20px !important

</style>
