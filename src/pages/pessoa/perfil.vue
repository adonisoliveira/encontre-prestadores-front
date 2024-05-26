<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="row justify-center">
          <div style="width: 800px; max-width: 90vw;">
            <div class="row q-gutter-sm bg-white text-primary"
              style="margin-left: -15px; padding-top: 9px; padding-bottom: 10px;">
              <div class="col-1">
                <q-btn icon="mdi-arrow-left" dense flat color="primary" @click="voltar()" />
              </div>
              <div class="col-10">
                <span class="text-h6 text-weight-regular"> Selecione seu perfil </span>
              </div>
            </div>

            <div class="row justify-center text-center text-subtitle1"
              style="padding-bottom: 20px; text-align: justify;">
              <label>Selecione o seu perfil abaixo para podermos lhe proporcionar a melhor experiência em nossa
                plataforma.</label>
            </div>

            <div class="row">
              <div class="row">
                <q-card class="full-width" style="margin-bottom: 10px;" flat bordered @click="cadastrar('c')">
                  <q-card-section horizontal>
                    <q-icon class="col-3" name="mdi-account-search" color="primary" size="36px" />

                    <q-card-section class="row full-width" style="border-left-color: #999; background-color: #f5f5f5">
                      <div class="col-12">
                        <span class="text-subtitle1 text-primary text-weight-medium">Cliente</span>
                      </div>
                      <div class="col-12" style="margin-top: -5px; text-align: justify;">
                        <span class="text-subtitle1">Quero encontrar prestadores de serviços.</span>
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>

              <div class="row">
                <q-card class="full-width" style="margin-bottom: 10px;" flat bordered @click="cadastrar('p')">
                  <q-card-section horizontal>
                    <q-icon class="col-3" name="mdi-account" color="primary" size="36px" />

                    <q-card-section class="row full-width" style="border-left-color: #999; background-color: #f5f5f5">
                      <div class="col-12">
                        <span class="text-subtitle1 text-primary text-weight-medium">Profissional</span>
                      </div>
                      <div class="col-12" style="margin-top: -5px">
                        <span class="text-subtitle1">Quero anunciar meus serviços para clientes que procuram.</span>
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  data() {
    return {

    }
  },
  methods: {
    voltar() {
      this.$router.go(-1)
    },
    cadastrar(perfil) {
      LocalStorage.set('tipoCadastro', perfil)
      this.$router.push('/pessoa/cadastro')
    }
  }
}
</script>
