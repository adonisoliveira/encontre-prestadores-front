<template>
  <q-layout view="lHh Lpr lFf">
      <q-page-container>
          <q-page>
              <q-footer>
                  <q-btn
                      :label="nomeBtn"
                      flat
                      text-color="white"
                      class="full-width bg-primary"
                      size="20px"
                      no-caps
                      @click="salvar()"
                  />
              </q-footer>

              <div class="row justify-center">
                  <div style="width: 800px; max-width: 90vw;">
                      <div class="row q-gutter-sm bg-white text-primary" style="margin-left: -15px; padding-top: 9px; padding-bottom: 10px;">
                          <div class="col-1">
                              <q-btn
                                  icon="mdi-arrow-left"
                                  dense
                                  flat
                                  color="primary"
                                  @click="voltar()"
                              />
                          </div>
                          <div class="col-10">
                              <span class="text-h6 text-weight-regular"> {{tituloPagina}} </span>
                          </div>
                      </div>

                      <div class="row justify-center text-center text-subtitle1" style="padding-bottom: 20px; text-align: justify;">
                          <label>Informe seus dados para realizar o cadastro. Esses dados são utilizados exclusivamente para que você seja identificado em nossa plataforma, você poderá realizar a exclusão desses dados a qualquer momento.</label>
                      </div>

                      <div class="row q-gutter-sm" style="margin: 0px" v-if="passo === 1">
                          <q-input
                              v-model="nome"
                              ref="nome"
                              label="Nome"
                              placeholder="Seu nome ou nome da sua empresa"
                              class="full-width"
                              :input-style="{ fontSize: '16px' }"
                              outlined
                              @keyup.enter="proximo('telefone')"
                          />

                          <q-input
                              v-model="telefone"
                              ref="telefone"
                              label="Telefone"
                              placeholder="(99) 99999-9999"
                              class="full-width"
                              @keyup="formataTelefone()"
                              :input-style="{ fontSize: '16px' }"
                              outlined
                              @keyup.enter="proximo('descricao')"
                              v-if="tornarPrestador === undefined || tornarPrestador === null || tornarPrestador === false"
                          />

                          <q-toggle
                              v-model="whatsapp"
                              label="Esse telefone tem Whatsapp?"
                              checked-icon="mdi-whatsapp"
                              color="primary"
                              icon-color="white"
                              size="80px"
                              left-label
                              style="margin-left: 2px"
                              v-if="tornarPrestador === undefined || tornarPrestador === null || tornarPrestador === false"
                          />

                          <q-input
                              v-model="descricao"
                              ref="descricao"
                              label="Descrição do negócio"
                              placeholder="Descreva aqui as informações relevantes sobre o seu negócio"
                              type="textarea"
                              autogrow
                              class="full-width"
                              :input-style="{ fontSize: '16px' }"
                              outlined
                              @keyup.enter="proximo('cep')"
                              v-if="tipoCadastro === 'p'"
                          />

                          <q-input
                              v-model="cep"
                              ref="cep"
                              label="CEP"
                              placeholder="CEP do seu endereço ou da sua empresa"
                              class="full-width"
                              type="number"
                              :input-style="{ fontSize: '16px' }"
                              @keyup="buscaCep()"
                              maxlength="8"
                              outlined
                              @keyup.enter="proximo('continuar')"
                              v-if="tornarPrestador === undefined || tornarPrestador === null || tornarPrestador === false"
                          />

                          <q-input
                              v-model="cidadeUf"
                              label="Cidade"
                              class="full-width"
                              disable
                              :input-style="{ fontSize: '16px',  fontWeight: '600' }"
                              outlined
                              v-if="tornarPrestador === undefined || tornarPrestador === null || tornarPrestador === false"
                          />
                      </div>

                      <div class="row q-gutter-sm" style="margin: 0px" v-if="passo === 2 && tipoCadastro === 'p'">
                          <div class="row scroll">
                              <q-input
                                  v-model="pesquisar"
                                  ref="pesquisar"
                                  placeholder="Quais serviços você presta?"
                                  input-class="text-center"
                                  class="q-ml-md full-width"
                                  :input-style="{ fontSize: '18px', color: '#333' }"
                                  style="margin-bottom: 20px"
                                  outlined
                                  @keyup="filtrar()"
                              >
                                  <template v-slot:append>
                                      <q-icon name="mdi-magnify" />
                                  </template>
                              </q-input>

                              <q-list class="full-width" v-if="listaCategoria.length > 0">
                                  <template v-for="categoria in listaCategoria" :key="categoria._id">
                                      <q-item class="list-item" style="padding-left: 16px; padding-right: 16px;">
                                          <q-item-section avatar>
                                              <q-icon color="grey-9" :name="categoria.icone" />
                                          </q-item-section>
                                          <q-item-section>
                                              <q-item-label class="text-subtitle1 text-weight-bold text-grey-9">{{categoria.nome}}</q-item-label>
                                          </q-item-section>
                                      </q-item>

                                      <q-separator />

                                      <q-list class="full-width">
                                          <template v-for="subcategoria in categoria.subCategorias" :key="subcategoria._id">
                                              <q-item
                                                  class="list-item"
                                                  style="padding-left: 16px; padding-right: 16px;"
                                                  tag="label"
                                              >
                                                  <q-item-section avatar style="padding-right: 10px !important; min-width: 0px !important;">
                                                      <q-checkbox
                                                          v-model="categoriasSelecionadas"
                                                          :val="subcategoria._id"
                                                      />
                                                  </q-item-section>

                                                  <q-item-section>
                                                      <q-item-label class="text-subtitle1">{{subcategoria.nome}}</q-item-label>
                                                  </q-item-section>
                                              </q-item>
                                          </template>
                                      </q-list>
                                  </template>
                              </q-list>
                              <div class="row full-width" style="padding-top: 50%" v-else>
                                  <div class="row full-width justify-center">
                                      <q-icon name="mdi-emoticon-sad-outline" size="50px" color="negative" />
                                  </div>
                                  <div class="row full-width justify-center">
                                      <span class="text-subtitle1 text-weight-medium">Nenhuma categoria encontrada </span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="row q-gutter-sm" style="margin: 0px" v-if="passo === 3 && (tornarPrestador === undefined || tornarPrestador === null || tornarPrestador === false)">
                          <q-input
                              v-model="usuario"
                              ref="usuario"
                              label="CPF ou CNPJ"
                              class="full-width"
                              :input-style="{ fontSize: '16px' }"
                              @keyup="formataCpfCnpj()"
                              @keyup.enter="proximo('senha')"
                              maxlength="18"
                              outlined
                          />

                          <q-input
                              v-model="senha"
                              ref="senha"
                              label="Senha"
                              :type="isPwd ? 'password' : 'text'"
                              class="full-width"
                              outlined
                              @keyup.enter="proximo('confirmaSenha')"
                          >
                              <template v-slot:append>
                                  <q-icon
                                      :name="isPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                      class="cursor-pointer"
                                      @click="isPwd = !isPwd"
                                  />
                              </template>
                          </q-input>

                          <q-input
                              v-model="confirmaSenha"
                              ref="confirmaSenha"
                              label="Confirmar senha"
                              :type="isPwd2 ? 'password' : 'text'"
                              class="full-width"
                              outlined
                          >
                              <template v-slot:append>
                                  <q-icon
                                      :name="isPwd2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                      class="cursor-pointer"
                                      @click="isPwd2 = !isPwd2"
                                  />
                              </template>
                          </q-input>
                      </div>

                  </div>
              </div>
          </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
  import {
    LocalStorage,
    SessionStorage,
    Loading,
    QSpinnerPuff
  } from 'quasar'
  import {
    API,
    API_CEP,
    request
  } from '../../uteis/request'
  import { ordernarCategorias } from 'src/uteis/ordenarCategorias'

  export default {
      data() {
        return {
          nome: '',
          telefone: '',
          whatsapp: false,
          descricao: '',
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          ibge: 0,
          uf: '',
          cidadeUf: '',
          usuario: '',
          senha: '',
          confirmaSenha: '',
          passo: 1,
          pesquisar: '',
          listaCategoria: [],
          categorias: [],
          categoriasSelecionadas: [],
          isPwd: true,
          isPwd2: true,
          tipoCadastro: LocalStorage.getItem('tipoCadastro'),
          tornarPrestador: LocalStorage.getItem('tornarPrestador'),
          tituloPagina: 'Crie sua conta grátis',
          nomeBtn: 'Continuar',
          tipoLogin: undefined
        }
      },
      mounted() {
        this.tipoLogin = SessionStorage.getItem('tipoLogin')

        if(this.tipoCadastro === 'p')
        {
          const user = LocalStorage.getItem("usuario")
          if(!!user)
            this.nome = user.nome

          this.buscarCategorias()
        }
      },
      methods: {
        voltar() {
          if(this.passo === 1)
            this.$router.go(-1)
          else
          {
            if(this.passo === 2)
            {
              this.tituloPagina = 'Crie sua conta grátis'
              this.passo = 1
            }
            else
            {
              this.nomeBtn = "Continuar"

              if(this.tipoCadastro === 'p')
              {
                this.tituloPagina = 'Quais serviços você presta?'
                this.passo = 2
              }
              else
              {
                this.tituloPagina = 'Crie sua conta grátis'
                this.passo = 1
              }
            }
          }
        },
        async buscarCategorias()
        {
          await request(API, 'GET', 'categorias')
          .then(response => {
              this.categorias = ordernarCategorias(response?.data)
              this.listaCategoria = this.categorias
          })
          .catch(_=> {
            this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: `Problemas ao buscar categorias.`,
              position: 'top'
            })
          })
        },
        proximo(campo)
        {
          switch(campo)
          {
            case "continuar":
              this.salvar()
              break;
            case "telefone":
              this.$refs.telefone.focus()
              break;
            case "descricao":
              if(this.tipoCadastro === 'p')
                this.$refs.descricao.focus()
              else
                this.$refs.cep.focus()
              break;
            case "cep":
              this.$refs.cep.focus()
              break;
            case "senha":
              this.$refs.senha.focus()
              break;
            case "confirmaSenha":
              this.$refs.confirmaSenha.focus()
              break;
            default:
              break;
          }
        },
        formataTelefone()
        {
          if(this.telefone.length > 15)
            this.telefone = this.telefone.substr(0, 15)

          this.telefone = this.telefone.replace(/\D/g,"")
          this.telefone = this.telefone.replace(/^(\d{2})(\d)/g,"($1) $2")
          this.telefone = this.telefone.replace(/(\d)(\d{4})$/,"$1-$2")
        },
        formataCpfCnpj()
        {
          this.usuario = this.usuario.replace(/\D/g,"")

          if(this.usuario.length <= 11)
            this.usuario = this.usuario.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g,"$1.$2.$3-$4")
          else
          {
            if(this.usuario.length <= 18)
              this.usuario = this.usuario.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"$1.$2.$3/$4-$5")
          }
        },
        async existeUsuario(usuario)
        {
          return await request(API, 'GET', `pessoas/?usuario=${usuario}`)
          .then(response => {
            if(response?.data.existeUsuario !== undefined)
              return response.data.existeUsuario
            else
              return true
          })
          .catch(_=> true)
        },
        buscaCep()
        {
          this.cep = this.cep.replace('-', '')
          this.cep = this.cep.replace(' ', '')
          this.cep = this.cep.replace('/', '')

          let qtd = ''

          if(this.cep !== null)
            qtd = this.cep

          //Verifica se o numero é cadastrado
          if(qtd.length === 8)
            this.getByCep()
        },
        async getByCep()
        {
          await request(API_CEP, 'GET', `${this.cep}/json/`)
          .then(response => {
            if(!!response?.data)
            {
              this.logradouro  = response.data.logradouro
              this.bairro = response.data.bairro
              this.ibge  = response.data.ibge
              this.cidade  = response.data.localidade
              this.uf  = response.data.uf
              this.cidadeUf  = `${response.data.localidade} - ${response.data.uf}`
            }
          })
        },
        async salvar()
        {
          let salvar = true

          if(this.passo === 1)
          {
            salvar = false

            if(!!this.nome === false || this.nome.length < 3)
            {
              this.$refs.nome.focus()

              this.$q.notify({
                icon: 'mdi-close',
                color: 'negative',
                message: `O campo nome deve conter ao menos 3 letras.`,
                position: 'top'
              })
            }
            else
            {
              if((!!this.telefone === false || this.telefone.length < 14 || this.telefone.length > 15 ) && (!!this.tornarPrestador === false))
              {
                this.$refs.telefone.focus()

                this.$q.notify({
                  icon: 'mdi-close',
                  color: 'negative',
                  message: `O campo telefone deve ser preenchido corretamente.`,
                  position: 'top'
                })
              }
              else
              {
                if(!!this.descricao === false && this.tipoCadastro === 'p')
                {
                  this.$refs.descricao.focus()

                  this.$q.notify({
                    icon: 'mdi-close',
                    color: 'negative',
                    message: `O campo descrição do negócio deve ser preenchido.`,
                    position: 'top'
                  })
                }
                else
                {
                  if((!!this.cep === false || this.cep.length != 8) && !!this.tornarPrestador === false)
                  {
                    this.$refs.cep.focus()

                    this.$q.notify({
                      icon: 'mdi-close',
                      color: 'negative',
                      message: `O campo CEP deve ser preenchido corretamente.`,
                      position: 'top'
                    })
                  }
                  else
                  {
                    if(!!this.cidadeUf === false && !!this.tornarPrestador === false)
                    {
                      this.$refs.cep.focus()

                      this.$q.notify({
                        icon: 'mdi-close',
                        color: 'negative',
                        message: `Informe um CEP válido.`,
                        position: 'top'
                      })
                    }
                    else
                    {
                      if(this.tipoCadastro === 'p')
                      {
                        this.tituloPagina = 'Quais serviços você presta?'
                        this.passo = 2
                      }
                      else
                      {
                        this.tituloPagina = 'Dados para login'
                        this.nomeBtn = "Concluir cadastro"
                        this.passo = 3
                      }
                    }
                  }
                }
              }
            }
          }
          else
          {
            if(this.passo === 2)
            {
              salvar = false

              if(this.categoriasSelecionadas.length <= 0)
              {
                this.$q.notify({
                  icon: 'mdi-close',
                  color: 'negative',
                  message: `Selecione ao menos um dos serviços da lista.`,
                  position: 'top'
                })
              }
              else
              {
                if(!!this.tornarPrestador === false)
                {
                  this.tituloPagina = 'Dados para login'
                  this.nomeBtn = "Concluir cadastro"
                  this.passo = 3
                }
                else
                  salvar = true
              }
            }
            else
            {
              if(!!this.usuario === false || (this.usuario.length != 14 && this.usuario.length != 18))
              {
                salvar = false

                this.$refs.usuario.focus()

                this.$q.notify({
                  icon: 'mdi-close',
                  color: 'negative',
                  message: `CPF ou CNPJ inválido.`,
                  position: 'top'
                })
              }
              else
              {
                if(!!this.senha === false || this.senha.length < 5)
                {
                  salvar = false

                  this.$refs.senha.focus()

                  this.$q.notify({
                    icon: 'mdi-close',
                    color: 'negative',
                    message: `O campo senha deve ser preenchido com 5 dígitos no mínimo.`,
                    position: 'top'
                  })
                }
                else
                {
                  if(this.senha !== this.confirmaSenha)
                  {
                    salvar = false

                    this.$refs.confirmaSenha.focus()

                    this.$q.notify({
                        icon: 'mdi-close',
                        color: 'negative',
                        message: `O campo confirmação da senha está diferente do campo senha.`,
                        position: 'top'
                    })
                  }
                }
              }
            }
          }

          if(salvar)
          {
            let dados = {}

            dados.nome = this.nome
            dados.descricao = this.descricao

            if(!!this.tornarPrestador === false)
            {
              dados.usuario = this.usuario.replace(/\D/g,"")
              dados.senha = this.senha

              dados.endereco = {}
              dados.endereco.cep = this.cep
              dados.endereco.cidade = this.cidade
              dados.endereco.uf = this.uf
              dados.endereco.ibge = this.ibge
              dados.endereco.logradouro = this.logradouro
              dados.endereco.bairro = this.bairro

              dados.contatos = [{
                numero: this.telefone,
                whatsapp: this.whatsapp
              }]
            }

            dados.prestador = this.tipoCadastro === 'p' ? true : false

            dados.categorias = []
            if(this.tipoCadastro === 'p')
            {
              this.categoriasSelecionadas.forEach(i => {
                dados.categorias.push({
                  _id: i
                })
              })
            }

            if(!!this.tornarPrestador === false)
            {
              const usuarioCadastrado = await this.existeUsuario(dados.usuario)
              if(!usuarioCadastrado)
              {
                const retorno = await request(API, 'POST', 'pessoas', dados).then(response => response?.data)
                if(!!retorno.sucesso)
                {
                  this.$q.notify({
                    icon: 'mdi-check',
                    color: 'positive',
                    message: `Seu cadastro foi realizado com sucesso.`,
                    position: 'top'
                  })

                  const autenticacao = {
                    usuario: dados.usuario,
                    senha: dados.senha
                  }

                  const retornoAuth = await request(API, 'POST', 'autenticacao', autenticacao).then(response => response?.data)
                  if(!!retornoAuth.autenticado)
                  {
                    let userLogado = retornoAuth.usuario

                    LocalStorage.set("token", retornoAuth.token)
                    LocalStorage.set("usuario", userLogado)

                    if(this.tipoLogin === 's')
                      this.enviarPedidoPendente(retornoAuth.usuario)
                    else
                    {
                      if(userLogado.prestador)
                      {
                        SessionStorage.set('menuSelecionado', 'início')
                        this.$router.push('/servico/listagem')
                      }
                    }

                    SessionStorage.set('menuSelecionado', 'buscar prestadores')
                    this.$router.push('/categoria/principais')
                  }
                  else
                    this.$router.push('/login')
                }
                else
                {
                  this.$q.notify({
                    icon: 'mdi-close',
                    color: 'negative',
                    message: `Problemas ao realizar cadastro, tente novamente.`,
                    position: 'top'
                  })
                }
              }
              else
              {
                this.$q.notify({
                  icon: 'mdi-close',
                  color: 'negative',
                  message: `Já existe um usuário com este número de documento.`,
                  position: 'top'
                })
              }
            }
            else
            {
              let user = LocalStorage.getItem("usuario")

              const retorno = await request(API, 'PUT', `pessoas/${user._id}`, dados).then(response => response?.data)
              if(!!retorno.sucesso)
              {
                this.$q.notify({
                  icon: 'mdi-check',
                  color: 'positive',
                  message: `Seu cadastro foi realizado com sucesso.`,
                  position: 'top'
                })

                user.prestador = true
                user.categorias = dados.categorias

                LocalStorage.set('usuario', user)
                LocalStorage.remove('tornarPrestador')

                this.$router.go(-1)
              }
              else
              {
                this.$q.notify({
                  icon: 'mdi-close',
                  color: 'negative',
                  message: `Problemas ao realizar cadastro, tente novamente.`,
                  position: 'top'
                })
              }
            }
          }
        },
        filtrar()
        {
          if(this.pesquisar.trim() !== "")
          {
            const filtro = this.pesquisar.toLowerCase()
            let arrCategorias = []

            this.categorias.forEach(item => {
              let categoriaFiltrada = {
                _id: item._id,
                nome: item.nome,
                icone: item.icone,
                subCategorias: []
              }

              item.subCategorias.forEach(subitem => {
                let subCategoriaFiltrada = {
                  _id: subitem._id,
                  nome: subitem.nome,
                  outros: subitem.outros || false
                }

                if(subCategoriaFiltrada.nome.toLowerCase().indexOf(filtro) !== -1)
                  categoriaFiltrada.subCategorias.push(subCategoriaFiltrada)
              })

              if(categoriaFiltrada.subCategorias.length > 0)
                arrCategorias.push(categoriaFiltrada)
              else
              {
                if(categoriaFiltrada.nome.toLowerCase().indexOf(filtro) !== -1)
                {
                  categoriaFiltrada.subCategorias = item.subCategorias
                  arrCategorias.push(categoriaFiltrada)
                }
              }
            })

            this.listaCategoria = arrCategorias
          }
          else
            this.listaCategoria = this.categorias
        },
        async enviarPedidoPendente(usuario)
        {
          console.log(usuario)

          let pedido = LocalStorage.getItem("novoServicoEnviar")
          if(!!pedido)
          {
            pedido.idContratante = usuario._id
            pedido.endereco = {
              ibge: usuario.ibge,
              uf: usuario.uf
            }

            LocalStorage.set("novoServicoEnviar", pedido)

            const retorno = await request(API, 'POST', 'servicos', pedido).then(resposta => resposta?.data)
            if(!!retorno.sucesso)
            {
              this.$q.notify({
                icon: 'mdi-done',
                color: 'positive',
                message: `Seu pedido foi realizado`,
                position: 'top'
              })

              LocalStorage.remove("novoServico")
              LocalStorage.remove("categoriaNovoServico")
              LocalStorage.remove("novoServicoEnviar")
              SessionStorage.set('menuSelecionado', 'início')
              SessionStorage.remove('tipoLogin')

              this.$router.push('/servico/listagem')
            }
            else
            {
              this.$q.notify({
                icon: 'mdi-close',
                color: 'negative',
                message: retorno.dados || 'Problemas ao salvar pedido, tente novamente mais tarde.',
                position: 'top'
              })

              this.$router.go(-1)
            }
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
