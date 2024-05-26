<template>
  <q-page padding style="padding-top: 8px">
    <div class="row justify-center">
      <div style="width: 800px; max-width: 98vw;">
        <q-card elevation class="bg-white" Style="border-radius: 3px; padding: 5px">
          <q-card-section>
            <div class="text-h6">Serviços</div>
            <q-list>
              <template v-for="servico in servicos" :key="servico._id">
                <q-item class="list-item" clickable v-ripple>
                  <q-item-section>
                    <q-item-label class="text-subtitle1 text-weight-bold">{{ servico.titulo }}</q-item-label>
                    <q-item-label>{{ servico.descricao }}</q-item-label>
                    <q-item-label class="text-weight-bold">Contratante</q-item-label>
                    <q-item-label>{{ servico.contratante.nome }}</q-item-label>
                    <q-item-label class="text-weight-bold">Endereço</q-item-label>
                    <q-item-label>{{ servico.endereco.bairro }} - {{ servico.endereco.cidade }} -
                      {{ servico.endereco.uf }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
              </template>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  API,
  request
} from '../../uteis/request'

export default {
  data() {
    return {
      servicos: []
    }
  },
  mounted() {
    this.buscarServicos()
  },
  methods: {
    async buscarServicos() {
      const retorno = await request(API, 'GET', 'servicos').then(response => response?.data)
      if (!!retorno)
        this.servicos = retorno
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
