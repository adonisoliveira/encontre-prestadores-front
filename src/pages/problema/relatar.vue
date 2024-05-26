<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="row justify-center">
          <div style="width: 800px; max-width: 100vw;">
            <div class="row q-gutter-sm bg-primary text-white"
              style="padding-left: 12px; padding-top: 9px; padding-bottom: 10px;">
              <div class="col-1">
                <q-btn icon="mdi-arrow-left" dense flat color="white" @click="voltar()" />
              </div>
              <div class="col-10">
                <span class="text-h6 text-weight-regular">Relatar problema</span>
              </div>
            </div>

            <q-card elevation class="bg-white no-shadow" Style="border-radius: 3px; padding: 0px;">
              <q-card-section style="padding-top: 8px">
                <div class="row">
                  <div class="row full-width" style="padding-bottom: 10px; text-align: justify;">
                    <span class="text-body2">Seu relato é muito importante para nós, por favor informe o máximo de
                      detalhes sobre o problema, analisaremos seu relato e vamos corrigir o problema o mais rápido
                      possível para que a plataforma continue te ajudando. </span>
                  </div>
                </div>

                <div class="row full-width" style="padding-top: 5px">
                  <q-select v-model="tipoDispositivo" ref="tipoDispositivo" label="Tipo de dispositivo"
                    :options="tipoDispositivoOptions" lazy-rules :rules="tipoDispositivoRequired"
                    class="text-grey-9 full-width" outlined>
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section avatar>
                          <q-icon :name="scope.opt.icon" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>

                <div class="row full-width" style="padding-top: 5px">
                  <q-select v-model="sistemaOperacional" ref="sistemaOperacional" label="Sistema operacional"
                    :options="sistemaOperacionalOptions" lazy-rules :rules="sistemaOperacionalRequired"
                    class="text-grey-9 full-width" outlined>
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section avatar>
                          <q-icon :name="scope.opt.icon" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>

                <div class="row full-width" style="padding-top: 5px">
                  <q-select v-model="tipoRede" ref="tipoRede" label="Tipo de rede" :options="tipoRedeOptions" lazy-rules
                    :rules="tipoRedeRequired" class="text-grey-9 full-width" outlined>
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section avatar>
                          <q-icon :name="scope.opt.icon" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>

                <div class="row full-width" style="padding-top: 5px">
                  <q-input v-model="descricao" label="Descrição do problema" type="textarea" ref="descricao"
                    placeholder="Descreva o problema aqui." autogrow :error="descricaoInvalida"
                    error-message="Descreva o problema com o mínimo de 20 caracteres." class="full-width" outlined
                    @keyup="validarDescricao()" />
                </div>

              </q-card-section>

            </q-card>
          </div>
        </div>

        <q-footer>
          <q-btn label="Enviar relato" flat text-color="white" class="full-width bg-primary" size="20px" no-caps
            @click="confirmar()" />
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from 'quasar'
import {
  API,
  request
} from '../../uteis/request'

export default {
  data() {
    return {
      token: LocalStorage.getItem("token"),
      usuario: LocalStorage.getItem("usuario"),
      tipoDispositivo: null,
      tipoDispositivoOptions: [
        {
          label: 'Celular',
          value: 'Celular',
          icon: 'mdi-cellphone-iphone',
          id: 1
        },
        {
          label: 'Tablet',
          value: 'Tablet',
          icon: 'mdi-tablet-ipad',
          id: 2
        },
        {
          label: 'Computador/Notebook',
          value: 'Computador/Notebook',
          icon: 'mdi-monitor',
          id: 3
        }
      ],
      sistemaOperacional: null,
      sistemaOperacionalOptions: [
        {
          label: 'Android',
          value: 'Android',
          icon: 'mdi-android-debug-bridge',
          id: 1
        },
        {
          label: 'IOS',
          value: 'IOS',
          icon: 'mdi-apple',
          id: 2
        },
        {
          label: 'Windows',
          value: 'Windows',
          icon: 'mdi-microsoft',
          id: 3
        },
        {
          label: 'Linux',
          value: 'Linux',
          icon: 'mdi-linux',
          id: 4
        },
        {
          label: 'MacOS',
          value: 'MacOS',
          icon: 'mdi-apple',
          id: 5
        }
      ],
      tipoRede: null,
      tipoRedeOptions: [
        {
          label: 'Wifi',
          value: 'Wifi',
          icon: 'mdi-wifi',
          id: 1
        },
        {
          label: 'Dados móveis',
          value: 'Dados móveis',
          icon: 'mdi-network-strength-3',
          id: 2
        }
      ],
      descricao: '',
      tipoDispositivoRequired: [val => !!val || 'Selecione o tipo de dispositivo.'],
      sistemaOperacionalRequired: [val => !!val || 'Selecione o sistema operacional do dispositivo.'],
      tipoRedeRequired: [val => !!val || 'Selecione o tipo de rede.'],
      descricaoInvalida: false
    }
  },
  methods: {
    voltar() {
      this.$router.go(-1)
    },
    async confirmar() {
      this.$refs.tipoDispositivo.validate()
      this.$refs.sistemaOperacional.validate()
      this.$refs.tipoRede.validate()
      this.validarDescricao()

      if (!this.$refs.tipoDispositivo.hasError
        && !this.$refs.sistemaOperacional.hasError
        && !this.$refs.tipoRede.hasError
        && !this.descricaoInvalida
      ) {
        const body = {
          tipoDispositivo: this.tipoDispositivo.id,
          sistemaOperacional: this.sistemaOperacional.id,
          tipoRede: this.tipoRede.id,
          descricao: this.descricao,
          idUsuario: !!this.usuario?._id ? this.usuario._id : ''
        },
          retorno = await request(API, 'POST', 'problemas', body).then(resposta => resposta?.data)

        if (!!retorno.sucesso) {
          this.$q.notify({
            icon: 'mdi-check',
            color: 'positive',
            message: 'Relato enviado com sucesso.',
            position: 'top'
          })

          this.$router.go(-1)
        }
        else {
          this.$q.notify({
            icon: 'mdi-close',
            color: 'negative',
            message: "Problemas ao enviar relato, tente novamente mais tarde.",
            position: 'top'
          })
        }
      }
    },
    validarDescricao() {
      //Campo do tipo text area não possui a validação direta do :rule, a validação é feita através do :error
      if (!!this.descricao === false || this.descricao.length < 20)
        this.descricaoInvalida = true
      else
        this.descricaoInvalida = false
    }
  }
}
</script>
