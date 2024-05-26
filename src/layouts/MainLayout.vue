<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <div class="row items-center">
          <q-btn icon="mdi-arrow-left" dense flat color="white" @click="voltar()" v-if="!$q.platform.is.desktop" />

          <q-btn icon="mdi-menu" dense flat color="white" @click="leftDrawerOpen = !leftDrawerOpen" v-else />

        </div>
        <q-toolbar-title class="text-white">
          <!-- Serviços -->
          <q-input v-model="pesquisar" ref="pesquisar" dark dense standout placeholder="Pesquise profissionais aqui"
            input-class="text-right" class="q-ml-md full-width" @click="abrirPesquisar(true)">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </q-toolbar-title>

        <q-btn label="Sair" flat dense no-caps color="white" icon-right="mdi-logout" @click="isSair = true" replace />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above content-class="bg-grey-1">
      <q-scroll-area style="width: 100%; height: 100%;">
        <div class="row bg-primary no-wrap" style="height: 110px; z-index:9999;">
          <div style="padding: 12px;">
            <img src="~assets/logo_branco.png" style="height: 85px; width: 85px;">
          </div>
          <div class="row items-center">
            <div class="col justify-center">
              <div class="text-subtitle1 text-weight-medium text-white" v-if="!!usuario?._id">{{ usuario.nome }}</div>
            </div>
          </div>
        </div>

        <q-list no-border padding class="rounded-borders text-grey-9">
          <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'início'"
            @click="redirecionar('início', '/servico/listagem')" v-if="!!usuario?._id">
            <q-item-section avatar>
              <q-icon name="mdi-file-document-edit" />
            </q-item-section>

            <q-item-section>Solicitações</q-item-section>
          </q-item>

          <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'buscar prestadores'"
            @click="redirecionar('buscar prestadores', '/categoria/principais')">
            <q-item-section avatar>
              <q-icon name="mdi-account-search" />
            </q-item-section>

            <q-item-section>Buscar prestadores</q-item-section>
          </q-item>

          <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'minhas informacoes'"
            @click="redirecionar('minhas informacoes', '/pessoa/alterar')" v-if="!!usuario?._id">
            <q-item-section avatar>
              <q-icon name="mdi-account" />
            </q-item-section>

            <q-item-section>Minhas informações</q-item-section>
          </q-item>

          <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'tornar prestador'"
            @click="redirecionar('tornar prestador', '/pessoa/cadastro')"
            v-if="!!usuario?._id && usuario?.prestador !== undefined && usuario?.prestador === false">
            <q-item-section avatar>
              <q-icon name="mdi-account-plus" />
            </q-item-section>

            <q-item-section>Quero ser um prestador</q-item-section>
          </q-item>

          <q-item link clickable v-ripple @click="compartilhar()">
            <q-item-section avatar>
              <q-icon name="mdi-whatsapp" />
            </q-item-section>

            <q-item-section>Compartilhar app</q-item-section>
          </q-item>

          <q-item link clickable v-ripple @click="podeSolicitarPush(true)" v-if="!!usuario?._id">
            <q-item-section avatar>
              <q-icon name="mdi-bell-ring" />
            </q-item-section>

            <q-item-section>Ativar notificações</q-item-section>
          </q-item>

          <q-item link clickable v-ripple @click="redirecionar('relatar problema', '/problema/relatar')">
            <q-item-section avatar>
              <q-icon name="mdi-bug" />
            </q-item-section>

            <q-item-section>Relatar um problema</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="isSair = true">
            <q-item-section avatar>
              <q-icon name="mdi-logout" />
            </q-item-section>

            <q-item-section>Sair</q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="isSair" persistent>
      <q-card style="width: 90vw">
        <q-card-section class="row items-center">
          <q-icon name="mdi-logout" color="grey-10" size="28px" />
          <span class="text-h6" style="padding-left: 15px">Sair do aplicativo</span>
        </q-card-section>

        <q-separator />

        <q-card-section class="row items-center">
          <span class="text-subtitle1" style="padding-left: 15px">Você deseja realmente sair do aplicativo?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="black" @click="isSair = !isSair" />
          <q-btn flat label="Confirmar" color="black" @click="sair()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="pedePushNotification" persistent>
      <q-card style="width: 90vw">
        <q-card-section class="row items-center">
          <q-icon name="mdi-bell-ring" color="grey-10" size="28px" />
          <span class="text-h6" style="padding-left: 15px">Esteja sempre informado</span>
        </q-card-section>

        <q-separator />

        <q-card-section class="row items-center">
          <span class="text-subtitle1" style="padding-left: 15px">{{ usuario.nome }}, para que você seja informado sobre
            novos serviços ou sobre a situação dos serviços que solicitou, é necessário habilitar as notificações, assim
            você saberá em tempo real o que está acontecendo.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não ativar" color="black" @click="permissaoPush(false)" />
          <q-btn flat label="Ativar" color="black" @click="permissaoPush(true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer v-if="!$q.platform.is.desktop">
      <div class="row bg-primary items-center" style="height: 53px;">
        <div :class="(!!usuario?._id) ? 'col-4' : 'col-6'">
          <div class="row justify-center">
            <q-btn icon="mdi-menu" label="Menu" dense flat stack no-caps color="white"
              @click="leftDrawerOpen = !leftDrawerOpen" />
          </div>
        </div>

        <div :class="(!!usuario?._id) ? 'col-4' : 'col-6'">
          <div class="row justify-center">
            <q-btn icon="mdi-account-search" label="Buscar" dense flat stack no-caps color="white"
              @click="redirecionar('buscar prestadores', '/categoria/principais')" />
          </div>
        </div>

        <div class="col-4" v-if="!!usuario?._id">
          <div class="row justify-center">
            <q-btn icon="mdi-file-document-edit" label="Solicitações" dense flat stack no-caps color="white"
              @click="redirecionar('início', '/servico/listagem')" />
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { SessionStorage, LocalStorage } from 'quasar'
import firebase_app from "firebase/app"
import firebase_messaging from "firebase/messaging"
import { API, request } from '../uteis/request'

async function push() {
  // let urlBase = process.env.API

  //se não existir nenhuma instância do FB, inicializa ele
  if (!firebase_app.apps.length) {
    firebase_app.initializeApp({
      apiKey: "AIzaSyAwyH80RSgf127IEjNJMzWrzCYF8-l8bh0",
      authDomain: "encontreprestadores-e519b.firebaseapp.com",
      databaseURL: "https://encontreprestadores-e519b.firebaseio.com",
      projectId: "encontreprestadores-e519b",
      storageBucket: "encontreprestadores-e519b.appspot.com",
      messagingSenderId: "353509701237",
      appId: "1:353509701237:web:225c4d7ac06397051aaa3c",
      measurementId: "G-8H2R60B20W"
    })
  }

  const messaging = firebase_app.messaging()

  //se tem service worker inclui o evento onMessage que fica escutando as notificações
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(registration => {
      messaging.onMessage(function (event) { })
    })
  }

  //Faz a requisição ao usuário (se permite notificação ou não)
  messaging.requestPermission().then(_ => {
    return messaging.getToken()
  })
    .then(current_token => {
      //enviar token para servidor o current_token
      const usuario = LocalStorage.getItem('usuario')

      //envia o token para a API
      const body = {
        token: current_token
      }

      request(API, 'POST', `pessoas/${usuario._id}/token`, body).then(response => response?.data)
    })

  messaging.onTokenRefresh(_ => {
    messaging.getToken().then(refreshedToken => {
      //envia para o servidor o refreshedToken
      const usuario = LocalStorage.getItem('usuario')

      //envia o token para a API
      const body = {
        token: refreshedToken
      }

      request(API, 'POST', `pessoas/${usuario._id}/token`, body).then(response => response?.data)
    })
      .catch(err => {
        console.log('Não é possível recuperar o token atualizado ', err)
      })
  })
}

function getMenuSelecionado() {
  let menu = SessionStorage.getItem("menuSelecionado")
  menu = menu !== null && menu !== undefined ? menu : 'início'
  return menu
}

export default {
  data() {
    return {
      leftDrawerOpen: false,
      link: getMenuSelecionado(),
      tipoLogin: SessionStorage.getItem("tipoLogin"),
      pesquisar: '',
      isSair: false,
      token: LocalStorage.getItem("token"),
      usuario: LocalStorage.getItem("usuario"),
      pedePushNotification: false
    }
  },
  mounted() {
    if (!!this.usuario === false && this.tipoLogin !== 's') {
      this.$router.push('/')
    }
    else {
      if (!!this.usuario === false) {
        this.usuario = {
          nome: '',
          prestador: false
        }
      }

      if (process.env.PROD) {
        this.podeSolicitarPush(false)
      }
    }
  },
  methods: {
    podeSolicitarPush(forcaSolicitacao) {
      //Se não for login sem cadastro
      if (this.usuario._id !== undefined) {
        if (Notification.permission === 'default') {
          if (forcaSolicitacao === false) {
            let naoRequerPush = LocalStorage.getItem("push")

            if (naoRequerPush === undefined || naoRequerPush === null) {
              this.pedePushNotification = true
            }
          } else {
            this.pedePushNotification = true
          }
        } else {
          if (Notification.permission === 'granted') {
            push()
          }
        }
      }
    },
    permissaoPush(parametro) {
      if (parametro === true) {
        //if(!this.$q.platform.is.ios){
        push()
        //}
      } else {
        LocalStorage.set("push", true)
      }

      this.pedePushNotification = false
    },
    abrirPesquisar() {
      this.$router.push('/categoria/pesquisar')
    },
    voltar() {
      this.$router.go(-1)
    },
    sair() {
      SessionStorage.set('sair', true)

      SessionStorage.remove('tipoLogin')
      SessionStorage.remove('menuSelecionado')
      SessionStorage.remove('tab')

      LocalStorage.remove('token')
      LocalStorage.remove('usuario')
      LocalStorage.remove('servico')
      LocalStorage.remove('prestador')
      LocalStorage.remove('categorias')
      LocalStorage.remove('tipoCadastro')
      LocalStorage.remove('novoServico')
      LocalStorage.remove('novoServicoEnviar')
      LocalStorage.remove('categoriaNovoServico')

      this.$router.push('/')
    },
    redirecionar(item, url, evento) {
      this.link = item
      SessionStorage.set("menuSelecionado", this.link)

      if (url !== '' && url !== null && url !== undefined) {
        if (item === 'tornar prestador') {
          SessionStorage.set('tipoLogin', 'p')
          LocalStorage.set('tipoCadastro', 'p')
          LocalStorage.set('tornarPrestador', true)
          this.$router.push('/pessoa/cadastro')
        }

        this.$router.push(url)
      }
    },
    compartilhar() {
      const link = encodeURIComponent(`Encontre prestadores de serviço ${process.env.URL_APP}app`)
      window.open(`https://api.whatsapp.com/send?text=${link}`, "Compartilhamento")
    }
  }
}
</script>

<style lang="sass">
.my-menu-link
  color: #1976d2
  font-weight: 600
  background: #eaeaea
</style>
