<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="row justify-center text-center" style="padding-top: 150px; display: flex; flex-direction: column; align-items: center">
          <div style="width: 800px; max-width: 90vw;">

            <div class="row justify-center text-center">
              <img src="~assets/logo.svg"/>
            </div>
            <!-- <div class="row justify-center text-center" style="margin-top: 10px">
              <span class="text-primary text-overline text-weight-medium" style=" font-size: 20px !important;">Encontre</span>
            </div> -->
            <div class="row justify-center text-center" style="margin-top: -5px">
              <span class="text-blue-9 text-weight-bold" style="margin-bottom: -10px; font-size: 32px !important">Encontre Prestadores</span>
            </div>
            <div class="row justify-center text-center">
              <span class="text-grey-8 text-weight-regular" style="margin-top: 10px; font-size: 15px !important">Anuncie trabalhos, encontre prestadores!</span>
            </div>
          </div>
        </div>

        <q-footer class="bg-white">
          <div class="row q-pa-md q-gutter-sm" style="margin: 0px">
            <q-btn
              label="Criar uma conta"
              class="full-width bg-primary text-white"
              flat
              no-caps
              size="20px"
              @click="cadastrar"
            />

            <q-btn
              label="Entrar sem cadastro"
              class="full-width text-blue-9 bg-white"
              outline
              no-caps
              size="20px"
              @click="entrarSemCadastro"
            />

            <q-btn
              label="Já tenho cadastro"
              class="full-width text-blue-9 bg-white"
              outline
              no-caps
              size="20px"
              @click="entrar"
            />
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
  } from '../uteis/request'

  export default {
    data() {
      return {
      }
    },
    mounted() {
      //Realiza a contagem de páginas na pilha de navegação e retrocede até o início
      //Somente se foi realizada a ação no botão SAIR
      if(SessionStorage.getItem('sair'))
      {
        let indicePageHistory = window.history.length

        for(let i = 1; indicePageHistory > 1; i++)
        {
          window.history.go(-1)
          indicePageHistory -= 1
        }

        SessionStorage.remove('sair')
      }
    },
    methods: {
      cadastrar()
      {
        this.$router.push('/pessoa/perfil')
      },
      async entrarSemCadastro()
      {
        SessionStorage.set('tipoLogin', 's')

        const body = {
          semCadastro: true
        },
        retornoAutenticacao = await request(API, 'POST', 'autenticacao', body)
                            .then(retorno => retorno?.data)
                            .catch(erro => erro?.data)

        if(!!retornoAutenticacao.autenticado)
        {
          LocalStorage.remove('usuario')
          LocalStorage.remove('servico')
          LocalStorage.remove('prestador')
          LocalStorage.remove('categorias')
          LocalStorage.remove('tipoCadastro')
          LocalStorage.remove('novoServico')
          LocalStorage.remove('novoServicoEnviar')
          LocalStorage.remove('categoriaNovoServico')
          SessionStorage.remove('tab')

          LocalStorage.set("token", retornoAutenticacao.token)
          SessionStorage.set('menuSelecionado', 'buscar prestadores')

          this.$router.push('/categoria/principais')
        }
        else
        {
          this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: `Problemas ao realizar autenticação.`,
              position: 'top'
          })
        }
      },
      async entrar()
      {
        const token = LocalStorage.getItem("token")

        if(!!token)
        {
          const retornoAutenticacao = await request(API, 'GET', `autenticacao/${token}`)
                                      .then(resposta => resposta?.data)

          if(!!retornoAutenticacao.autenticado)
          {
            const servicos = LocalStorage.getItem('servicos')

            LocalStorage.set('token', retornoAutenticacao.token)
            SessionStorage.set('menuSelecionado', !!servicos ? 'início' : 'buscar prestadores')

            this.$router.push(!!servicos ? '/servico/listagem' : '/categoria/principais')
          }
        }

        LocalStorage.remove("token")
        this.$router.push('/login')
      }
    }
  }
</script>
