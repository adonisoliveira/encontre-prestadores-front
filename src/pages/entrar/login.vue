<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <q-btn icon="mdi-arrow-left" dense flat color="primary" @click="voltar()"
          style="margin-top: 0px; padding-top: 10px; padding-left: 15px" />

        <div class="row justify-center text-center"
          style="padding-top: 100px; display: flex; flex-direction: column; align-items: center">
          <div style="width: 800px; max-width: 90vw;">

            <div class="row justify-center text-center">
              <img src="~assets/logo.svg" />
            </div>
            <div class="row justify-center text-center" style="margin-top: -5px">
              <span class="text-blue-9 text-weight-bold"
                style="margin-bottom: -10px; font-size: 32px !important">Encontre Prestadores</span>
            </div>
            <div class="row justify-center text-center">
              <span class="text-grey-8 text-weight-regular" style="margin-top: 10px; font-size: 15px !important">Anuncie
                trabalhos, encontre prestadores!</span>
            </div>
          </div>
        </div>

        <q-footer class="bg-white">
          <div class="row q-pa-md q-gutter-sm" style="margin: 0px">
            <span class="text-primary">Informe os dados para entrar</span>
            <q-input v-model="usuario" ref="usuario" label="CPF ou CNPJ" class="full-width"
              :input-style="{ fontSize: '16px' }" @keyup="formataCpfCnpj()" maxlength="18" outlined />

            <q-input v-model="senha" ref="senha" label="Senha" :type="isPwd ? 'password' : 'text'" class="full-width"
              outlined @keyup.enter="entrar">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'mdi-eye-off' : 'mdi-eye'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>

            <q-btn label="Entrar" class="full-width bg-primary text-white" flat no-caps size="20px" @click="entrar" />
          </div>
        </q-footer>
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
  data() {
    return {
      usuario: '',
      senha: '',
      isPwd: true,
      tipoLogin: SessionStorage.getItem("tipoLogin")
    }
  },
  methods: {
    voltar() {
      this.$router.go(-1)
    },
    formataCpfCnpj() {
      this.usuario = this.usuario.replace(/\D/g, "")

      if (this.usuario.length <= 11)
        this.usuario = this.usuario.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
      else if (this.usuario.length <= 18)
        this.usuario = this.usuario.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
    },
    cadastrar() {
      LocalStorage.remove('token')
      LocalStorage.set('tipoCadastro', this.tipoLogin)

      this.$router.push('/pessoa/cadastro')
    },
    async entrar() {
      let continuar = false

      if (!!this.usuario === false || (this.usuario.length !== 14 && this.usuario.length !== 18)) {
        this.$refs.usuario.focus()
        this.$q.notify({
          icon: 'mdi-close',
          color: 'negative',
          message: `CPF ou CNPJ inválido.`,
          position: 'top'
        })
      }
      else if (!!this.senha === false || this.senha.length < 5) {
        this.$refs.senha.focus()
        this.$q.notify({
          icon: 'mdi-close',
          color: 'negative',
          message: `O campo senha deve ter 5 dígitos no mínimo.`,
          position: 'top'
        })
      }
      else
        continuar = true

      if (continuar) {
        const body = {
          usuario: this.usuario.replace(/\D/g, ""),
          senha: this.senha
        },
          resposta = await request(API, 'POST', 'autenticacao', body).then(response => response?.data)

        if (!!resposta.autenticado) {
          const userLogado = resposta.usuario

          LocalStorage.set("token", resposta.token)
          LocalStorage.set("usuario", userLogado)

          if (!!userLogado.prestador) {
            SessionStorage.set('menuSelecionado', 'início')
            this.$router.push('/servico/listagem')
          }
          else {
            SessionStorage.set('menuSelecionado', 'buscar prestadores')
            this.$router.push('/categoria/principais')
          }
        }
        else {
          this.$q.notify({
            icon: 'close',
            color: 'negative',
            message: `Não foi possível autenticar, verifique os dados de acesso.`,
            position: 'top'
          })
        }
      }
    }
  }
}
</script>
