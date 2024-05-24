<template>
  <q-layout view="lHh Lpr lFf">
      <q-page-container>
          <q-page>
              <q-footer >
                  <q-btn
                      label="Salvar"
                      flat
                      text-color="white"
                      class="full-width bg-primary"
                      size="18px"
                      no-caps
                      @click="salvar()"
                  />
              </q-footer>

              <div class="row justify-center">
                  <div style="width: 800px; max-width: 100vw;">
                      <div class="row q-gutter-sm bg-primary text-white" style="padding-left: 12px; padding-top: 9px; padding-bottom: 10px;">
                          <div class="col-1">
                              <q-btn
                                  icon="mdi-arrow-left"
                                  dense
                                  flat
                                  color="white"
                                  @click="voltar()"
                              />
                          </div>
                          <div class="col-6">
                              <span class="text-h6 text-weight-regular"> Alterar dados </span>
                          </div>
                          <div>
                              <q-btn
                                  label="Trocar Senha"
                                  flat
                                  text-color="white"
                                  class=" bg-primary"
                                  icon="mdi-textbox-password"
                                  dense
                                  no-caps
                                  @click="isTrocarSenha = !isTrocarSenha"
                              />
                          </div>
                      </div>

                      <q-card elevation class="bg-white no-shadow" Style="border-radius: 3px; padding: 0px;">
                          <q-card-section style="padding-top: 8px">
                              <div class="row q-gutter-sm" style="margin: 0px">
                                  <q-input
                                      v-model="usuario"
                                      label="Usuário"
                                      placeholder="Usuário utilizado para login"
                                      :input-style="{ fontSize: '16px' }"
                                      class="full-width"
                                      disable
                                      outlined
                                  />

                                  <q-input
                                      v-model="nome"
                                      ref="nome"
                                      label="Nome completo"
                                      placeholder="Informe seu nome completo"
                                      :input-style="{ fontSize: '16px' }"
                                      class="full-width"
                                      outlined
                                  />

                                  <q-input
                                      v-model="descricao"
                                      ref="descricao"
                                      label="Descrição do negócio"
                                      placeholder="Descreva aqui as informações relevantes sobre o seu negócio"
                                      type="textarea"
                                      autogrow
                                      class="full-width"
                                      outlined
                                      :input-style="{ fontSize: '16px' }"
                                      v-if="prestador_de_servicos"
                                  />

                                  <q-toggle
                                      v-model="prestador_de_servicos"
                                      label="Sou um prestador de serviços"
                                      checked-icon="mdi-check"
                                      color="primary"
                                      icon-color="white"
                                      size="80px"
                                      left-label
                                      @click="exibe_Categoria()"
                                      v-if="categorias !== undefined && categorias.length > 0"
                                  />
                              </div>

                              <q-tabs
                                  v-model="tab"
                                  dense
                                  class="text-grey"
                                  active-color="primary"
                                  indicator-color="primary"
                                  align="justify"
                                  narrow-indicator
                                  style="padding-top: 10px"
                              >
                                  <q-tab name="endereco" label="Endereço" />
                                  <q-tab name="contatos" label="Contatos" />
                                  <q-tab name="categorias" label="Categorias" v-if="prestador_de_servicos"/>
                              </q-tabs>

                              <q-separator />

                              <q-tab-panels v-model="tab" animated style="width: 100vw; margin-left:-17px">
                                  <q-tab-panel name="endereco">
                                      <div class="row q-gutter-sm" style="margin: 0px">
                                          <q-input
                                              v-model="cep"
                                              ref="cep"
                                              label="CEP"
                                              type="number"
                                              class="full-width"
                                              @keyup="buscaCep()"
                                              outlined
                                          />

                                          <q-input
                                              v-model="logradouro"
                                              ref="logradouro"
                                              label="Logradouro"
                                              class="full-width"
                                              outlined
                                          />

                                          <q-input
                                              v-model="numero"
                                              ref="numero"
                                              label="Número"
                                              class="full-width"
                                              outlined
                                          />

                                          <q-input
                                              v-model="complemento"
                                              label="Complemento"
                                              class="full-width"
                                              outlined
                                          />

                                          <q-input
                                              v-model="bairro"
                                              ref="bairro"
                                              label="Bairro"
                                              class="full-width"
                                              outlined
                                          />

                                          <q-input
                                              v-model="cidadeUf"
                                              label="Cidade"
                                              class="full-width"
                                              outlined
                                              disable
                                          />
                                      </div>
                                  </q-tab-panel>

                                  <q-tab-panel name="contatos">
                                      <q-list>
                                          <template v-for="contato in contatos" :key="contato._id">
                                              <q-item class="list-item" >
                                                  <q-item-section avatar style="padding-right: 10px !important; min-width: 0px !important;">
                                                      <q-btn
                                                          flat
                                                          dense
                                                          icon="mdi-delete-forever"
                                                          text-color="grey-10"
                                                           @click="popUpExclusao('contato', contato)"
                                                      />
                                                  </q-item-section>

                                                  <q-item-section>
                                                      <q-item-label class="text-grey-9 text-subtitle1">{{contato.numero}}</q-item-label>
                                                  </q-item-section>
                                                  <q-item-section avatar v-if="contato.whatsapp !== undefined && contato.whatsapp === true">
                                                      <q-icon color="positive" name="mdi-whatsapp" />
                                                  </q-item-section>
                                              </q-item>
                                          </template>
                                      </q-list>

                                      <q-page-sticky
                                          position="bottom-right"
                                          :offset="[18, 18]"
                                      >
                                          <q-btn
                                              fab
                                              icon="mdi-plus"
                                              color="primary"
                                              @click="popUpEditarContato('i', null)"
                                          />
                                      </q-page-sticky>
                                  </q-tab-panel>

                                  <q-tab-panel name="categorias" >
                                      <q-list>
                                          <template v-for="categoria in categorias" :key="categoria._id">
                                              <q-item class="list-item">
                                                  <q-item-section avatar style="padding-right: 10px !important; min-width: 0px !important;">
                                                      <q-btn
                                                          flat
                                                          dense
                                                          icon="mdi-delete-forever"
                                                          text-color="grey-10"
                                                          @click="popUpExclusao('categoria', categoria)"
                                                      />
                                                  </q-item-section>

                                                  <q-item-section>
                                                      <q-item-label class="text-subtitle1">{{categoria.nome}}</q-item-label>
                                                  </q-item-section>
                                              </q-item>
                                          </template>
                                      </q-list>

                                      <q-page-sticky
                                          position="bottom-right"
                                          :offset="[18, 18]"
                                      >
                                          <q-btn
                                              fab
                                              icon="mdi-plus"
                                              color="primary"
                                              @click="abrirListaCategorias()"
                                          />
                                      </q-page-sticky>
                                  </q-tab-panel>

                              </q-tab-panels>
                          </q-card-section>
                      </q-card>
                  </div>
              </div>
          </q-page>

          <q-dialog v-model="isConfirmarExclusao" persistent>
              <q-card style="width: 90vw">
                  <q-card-section class="row items-center">
                      <q-icon name="mdi-delete-forever" color="grey-10" size="28px" />
                      <span class="text-h6" style="padding-left: 15px">Atenção</span>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="row items-center">
                      <span class="text-subtitle1" style="padding-left: 15px">{{descricaoExclusao}}</span>
                  </q-card-section>

                  <q-card-actions align="right">
                      <q-btn flat label="Cancelar" color="black" @click="isConfirmarExclusao = !isConfirmarExclusao" />
                      <q-btn flat label="Confirmar" color="black" @click="confirmarExclusao()" />
                  </q-card-actions>
              </q-card>
          </q-dialog>

          <q-dialog v-model="isTrocarSenha" persistent>
              <q-card style="width: 90vw">
                  <q-card-section class="row items-center">
                      <q-icon name="mdi-form-textbox-password" color="grey-10" size="28px" />
                      <span class="text-h6" style="padding-left: 15px">Alterar senha</span>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="row items-center">
                      <div class="row q-gutter-sm" style="margin: 0px">
                          <q-input
                              v-model="senha"
                              ref="senha"
                              label="Senha"
                              :type="isPwd ? 'password' : 'text'"
                              class="full-width"
                              outlined
                          >
                              <template v-slot:append>
                                  <q-icon
                                      :name="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
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
                                      :name="isPwd2 ? 'mdi-eye-off' : 'mdi-eye'"
                                      class="cursor-pointer"
                                      @click="isPwd2 = !isPwd2"
                                  />
                              </template>
                          </q-input>
                      </div>
                  </q-card-section>

                  <q-card-actions align="right">
                      <q-btn flat label="Cancelar" color="black" @click="isTrocarSenha = !isTrocarSenha" />
                      <q-btn flat label="Confirmar" color="black" @click="salvarSenha()" />
                  </q-card-actions>
              </q-card>
          </q-dialog>

          <q-dialog v-model="popupContatoAberta" persistent>
              <q-card style="width: 90vw">
                  <q-card-section class="row items-center">
                      <q-icon name="mdi-phone" color="grey-10" size="28px" />
                      <span class="text-h6" style="padding-left: 15px">{{tituloPopupContato}}</span>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="row items-center">
                      <q-input
                          v-model="telefoneContato"
                          ref="telefoneContato"
                          label="Telefone"
                          placeholder="(99) 99999-9999"
                          class="full-width"
                          outlined
                          @keyup="formataTelefone()"
                      />

                      <q-toggle
                          v-model="whatsapp"
                          label="Esse telefone tem Whatsapp?"
                          checked-icon="mdi-whatsapp"
                          color="primary"
                          icon-color="white"
                          size="75px"
                          left-label
                      />
                  </q-card-section>

                  <q-card-actions align="right">
                      <q-btn flat label="Cancelar" color="black" @click="popupContatoAberta = !popupContatoAberta" />
                      <q-btn flat label="Confirmar" color="black" @click="salvarContato()" />
                  </q-card-actions>
              </q-card>
          </q-dialog>

          <q-dialog v-model="isAdicionarCategoria" persistent>
              <q-card style="width: 90vw">
                  <q-card-section class="row items-center">
                      <q-icon name="mdi-playlist-plus" color="grey-10" size="28px" />
                      <span class="text-h6" style="padding-left: 15px">Adicionar Categorias</span>
                  </q-card-section>

                  <q-separator />

                  <q-card-section style="max-height: 50vh" class="scroll">
                      <div class="row scroll">
                          <q-list class="full-width">
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
                      </div>
                  </q-card-section>

                  <q-card-actions align="right">
                      <q-btn flat label="Cancelar" color="black" @click="isAdicionarCategoria = !isAdicionarCategoria" />
                      <q-btn flat label="Confirmar" color="black" @click="adicionarCategorias()" />
                  </q-card-actions>
              </q-card>
          </q-dialog>
      </q-page-container>
  </q-layout>
</template>

<script>
  import {
    LocalStorage,
  } from 'quasar'
  import {
    API,
    API_CEP,
    request
  } from '../../uteis/request'

  export default {
    data() {
      return {
        token: LocalStorage.getItem('token'),
        user: LocalStorage.getItem('usuario'),
        pessoa: {},
        nome: '',
        descricao: '',
        usuario: '',
        senha: '',
        confirmaSenha: '',
        prestador_de_servicos: false,
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidadeUf: '',
        ibge: 0,
        uf: '',
        cep: '',
        contatos: [],
        categorias: [],
        enderecos: [],
        avaliacoes: [],
        listaCategoria: [],
        isTrocarSenha: false,
        isPwd: true,
        isPwd2: true,
        tab: 'endereco',
        isConfirmarExclusao: false,
        tituloExclusao: '',
        descricaoExclusao: '',
        promptExclusao: '',
        objetoExclusao: null,
        isAdicionarCategoria: false,
        categoriasSelecionadas: [],
        popupContatoAberta: false,
        tituloPopupContato: '',
        nomeContato: '',
        telefoneContato: '',
        whatsapp: false,
        idContato: '',
        popupEnderecoAberta: false,
        tituloPopupEndereco: '',
        idEndereco: '',
        nomeEndereco: ''
      }
    },
    mounted() {
      this.buscarUsuario()
    },
    methods: {
      voltar()
      {
        this.$router.go(-1)
      },
      async buscarUsuario()
      {
        const resposta = await request(API, 'GET', `pessoas/${this.user._id}`).then(response => response?.data)

        if(!!resposta.sucesso)
        {
          this.pessoa = resposta.dados
          this.nome = resposta.dados.nome
          this.descricao = resposta.dados.descricao
          this.usuario = resposta.dados.usuario
          this.prestador_de_servicos = resposta.dados.prestador
          this.contatos = resposta.dados.contatos
          if(!!resposta.dados.endereco)
          {
            this.cep = resposta.dados.endereco.cep
            this.logradouro = resposta.dados.endereco.logradouro
            this.numero = resposta.dados.endereco.numero
            this.complemento = resposta.dados.endereco.complemento
            this.bairro = resposta.dados.endereco.bairro
            this.ibge = resposta.dados.endereco.ibge
            this.cidade = resposta.dados.endereco.cidade
            this.uf = resposta.dados.endereco.uf
            this.cidadeUf = `${resposta.dados.endereco.cidade} - ${resposta.dados.endereco.uf}`
          }

          this.categorias = resposta.dados.categorias

          const listaCategorias = LocalStorage.getItem('categorias')
          //Percorre as categorias que o usuario tem
          for (let a = 0; a < this.categorias.length; a++)
          {
            //Percorre as categorias salvas no localstorage
            for (let b = 0; b < listaCategorias.length; b++) {
              //Percorre as subcategorias salvas no localstorage
              for (let c = 0; c < listaCategorias[b].subCategorias.length; c++)
              {
                if(this.categorias[a]._id === listaCategorias[b].subCategorias[c]._id)
                {
                  this.categorias[a].nome = listaCategorias[b].subCategorias[c].nome
                }
              }
            }
          }
        }
      },
      formataTelefone()
      {
          if(this.telefoneContato.length > 15)
            this.telefoneContato = this.telefoneContato.substr(0, 15)

          this.telefoneContato = this.telefoneContato.replace(/\D/g,"")
          this.telefoneContato = this.telefoneContato.replace(/^(\d{2})(\d)/g,"($1) $2")
          this.telefoneContato = this.telefoneContato.replace(/(\d)(\d{4})$/,"$1-$2")
      },
      buscaCep()
      {
        this.cep = this.cep.replace('-', '')
        this.cep = this.cep.replace(' ', '')
        this.cep = this.cep.replace('/', '')

        let qtd = ''
        if(this.cep != null)
          qtd = this.cep

        if(qtd.length == 8)
          this.getByCep()
      },
      async getByCep()
      {
        const retorno = await request(API_CEP, 'GET', `${this.cep}/json`).then(response => response?.data)
        if(!!retorno)
        {
          this.logradouro = retorno.logradouro
          this.bairro = retorno.bairro
          this.ibge = retorno.ibge
          this.cidade = retorno.localidade
          this.uf = retorno.uf
          this.cidadeUf = `${retorno.localidade} - ${retorno.uf}`

          if(!!retorno.logradouro === false)
            this.$refs.logradouro.focus()
          else
          {
            if(!!this.numero === false)
              this.$refs.numero.focus()
            else
            {
              if(!!retorno.bairro === false)
                this.$refs.bairro.focus()
              else
                this.$refs.cep.focus()
            }
          }
        }
      },
      popUpEditarContato(acao, contato)
      {
        this.telefoneContato = ''
        this.tituloPopupContato = "Novo contato"
        this.popupContatoAberta = true
      },
      async salvarContato()
      {
        let salvar = true
        let dados = {}

        if(!!this.telefoneContato && (this.telefoneContato.length === 14 || this.telefoneContato.length === 15))
        {
          dados.numero = this.telefoneContato
          dados.whatsapp = this.whatsapp
        }
        else
        {
          salvar = false
          this.$refs.telefoneContato.focus()
          this.$q.notify({
            icon: 'mdi-close',
            color: 'negative',
            message: `O campo telefone deve ser preenchido.`,
            position: 'top'
          })
        }

        if(salvar)
        {
          await request(API, 'POST', `pessoas/${this.user._id}/contatos`, dados)
          .then(response => {
            this.contatos.push(response.data)

            this.$q.notify({
              icon: 'check',
              color: 'positive',
              message: `Contato inserido com sucesso.`,
              position: 'top'
            })
          })
          .catch(_=> {
            this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: `Problemas ao inserir contato.`,
              position: 'top'
            })
          })

          this.popupContatoAberta = false
        }
      },
      exibe_Categoria()
      {
        if(!this.prestador_de_servicos && this.tab === 'categorias')
          this.tab = 'contatos'
      },
      async abrirListaCategorias()
      {
        this.categoriasSelecionadas = []

        const retorno = await request(API, 'GET', 'categorias').then(response => response?.data)
        if(!!retorno)
        {
          this.listaCategoria = retorno
          this.isAdicionarCategoria = true
        }
        else
        {
          this.$q.notify({
            icon: 'mdi-close',
            color: 'negative',
            message: `Problemas ao buscar categorias.`,
            position: 'top'
          })
        }
      },
      async adicionarCategorias()
      {
        if(this.categoriasSelecionadas.length > 0)
        {
          for(let i = 0; i < this.categoriasSelecionadas.length; i++)
          {
            let adicionar = true

            for(let a = 0; a < this.categorias.length; a++)
            {
              if(this.categoriasSelecionadas[i]._id == this.categorias[a]._id)
              {
                adicionar = false
                break
              }
            }

            if(adicionar)
            {
              const dados = {
                _id: this.categoriasSelecionadas[i]
              }

              await request(API, 'POST', `pessoas/${this.user._id}/categorias/`, dados)
              .then(_=> {
                let listaCategorias = LocalStorage.getItem('categorias')

                for(let a = 0; a < listaCategorias.length; a++)
                {
                  for (let b = 0; b < listaCategorias[a].subCategorias.length; b++)
                  {
                    if(this.categoriasSelecionadas[i] === listaCategorias[a].subCategorias[b]._id)
                    {
                      this.categorias.push({
                        _id: this.categoriasSelecionadas[i],
                        nome: listaCategorias[a].subCategorias[b].nome
                      })

                      this.user.categorias.push({
                        _id: this.categoriasSelecionadas[i]
                      })

                      LocalStorage.set("usuario", this.user)
                    }
                  }
                }
              })
              .catch(_=> {
                this.$q.notify({
                  icon: 'mdi-close',
                  color: 'negative',
                  message: `Problemas ao adicionar categoria.`,
                  position: 'top'
                })
              })
            }
          }
        }

        this.isAdicionarCategoria = false
      },
      fecharPopUpExclusao()
      {
        this.isConfirmarExclusao = false
        this.objetoExclusao = null
        this.promptExclusao = ''
      },
      popUpExclusao(prompt, objeto)
      {
        this.promptExclusao = prompt
        this.objetoExclusao = objeto
        this.tituloExclusao = 'Atenção'

        if(prompt == 'categoria')
          this.descricaoExclusao = 'Você realmente deseja excluir essa categoria do seu cadastro?'
        else if(prompt == 'contato')
          this.descricaoExclusao = 'Você realmente deseja excluir esse contato do seu cadastro?'

        this.isConfirmarExclusao = true
      },
      confirmarExclusao()
      {
        if(this.promptExclusao === 'categoria')
          this.removerCategoria(this.objetoExclusao)
        else if(this.promptExclusao === 'contato')
          this.removerContato(this.objetoExclusao)
      },
      async removerContato(contato)
      {
        const retorno = await request(API, 'DELETE', `pessoas/${this.user._id}/contatos/${contato._id}`).then(response => response?.data)

        if(!!retorno.sucesso)
        {
          let posicao = this.contatos.indexOf(contato)
          this.contatos.splice(posicao, 1)

          this.$q.notify({
            icon: 'mdi-check',
            color: 'positive',
            message: `Contato removido com sucesso.`,
            position: 'top'
          })
        }
        else
        {
          this.$q.notify({
            icon: 'mdi-close',
            color: 'negative',
            message: `Problemas ao remover contato.`,
            position: 'top'
          })
        }

        this.fecharPopUpExclusao()
      },
      async removerCategoria(categoria)
      {
        const retorno = await request(API, 'DELETE', `pessoas/${this.user._id}/categorias/${categoria._id}`).then(response => response?.data)

        if(!!retorno.sucesso)
        {
          let posicao = this.categorias.indexOf(categoria)
          this.categorias.splice(posicao, 1)

          for (let i = 0; i < this.user.categorias.length; i++)
          {
            if(this.user.categorias[i]._id === categoria._id)
              this.user.categorias.splice(i, 1)
          }

          LocalStorage.set("usuario", this.user)

          this.$q.notify({
            icon: 'mdi-check',
            color: 'positive',
            message: `Categoria removida com sucesso.`,
            position: 'top'
          })
        }
        else
        {
          this.$q.notify({
            icon: 'mdi-close',
            color: 'negative',
            message: `Problemas ao remover categoria.`,
            position: 'top'
          })
        }

        this.fecharPopUpExclusao()
      },
      async salvar()
      {
        let salvar = true
        let dados = {
          prestador: this.prestador_de_servicos
        }

        if(!!this.nome)
        {
          dados.nome =   this.nome

          if(this.prestador_de_servicos)
          {
            if(!!this.descricao)
              dados.descricao = this.descricao
            else
            {
              salvar = false
              this.$refs.descricao.focus()
              this.$q.notify({
                icon: 'mdi-close',
                color: 'negative',
                message: `O campo descrição deve ser preenchido.`,
                position: 'top'
              })
            }
          }

          dados.endereco = {}

          if(!!this.cep && this.cep.length === 8)
          {
            dados.endereco.cep = this.cep

            if(!!this.logradouro)
            {
              dados.endereco.logradouro = this.logradouro

              if(!!this.bairro)
              {
                dados.endereco.bairro = this.bairro

                if(!!this.numero)
                {
                  dados.endereco.numero = this.numero

                  if(!!this.ibge)
                  {
                    dados.endereco.ibge = this.ibge
                    dados.endereco.cidade = this.cidade
                    dados.endereco.uf = this.uf
                    dados.endereco.complemento = this.complemento
                  }
                  else
                  {
                    salvar = false
                    this.$refs.cep.focus()
                    this.$q.notify({
                      icon: 'mdi-close',
                      color: 'negative',
                      message: `Informe o CEP para buscar a cidade.`,
                      position: 'top'
                    })
                  }
                }
                else
                {
                  salvar = false
                  this.$refs.numero.focus()
                  this.$q.notify({
                    icon: 'mdi-close',
                    color: 'negative',
                    message: `O campo número deve ser preenchido.`,
                    position: 'top'
                  })
                }
              }
              else
              {
                salvar = false
                this.$refs.bairro.focus()
                this.$q.notify({
                  icon: 'mdi-close',
                  color: 'negative',
                  message: `O campo bairro deve ser preenchido.`,
                  position: 'top'
                })
              }
            }
            else
            {
              salvar = false
              this.$refs.logradouro.focus()
              this.$q.notify({
                icon: 'mdi-close',
                color: 'negative',
                message: `O campo logradouro deve ser preenchido.`,
                position: 'top'
              })
            }
          }
          else
          {
            salvar = false
            this.$refs.cep.focus()
            this.$q.notify({
              icon: 'mdi-close',
              color: 'negative',
              message: `O campo CEP deve ser preenchido.`,
              position: 'top'
            })
          }
        }
        else
        {
          salvar = false
          this.$refs.nome.focus()
          this.$q.notify({
            icon: 'mdi-close',
            color: 'negative',
            message: `O campo nome deve ser preenchido.`,
            position: 'top'
          })
        }

        if(salvar)
        {
          await request(API, 'PUT', `pessoas/${this.user._id}`, dados)
          .then(_=> {
            this.pessoa.nome = this.nome
            this.pessoa.prestador = this.prestador_de_servicos
            this.user.nome = this.nome
            this.user.ibge = this.ibge
            this.user.prestador = this.prestador_de_servicos

            LocalStorage.set("usuario", this.user)

            this.$q.notify({
              icon: 'mdi-check',
              color: 'positive',
              message: `Dados alterados com sucesso.`,
              position: 'top'
            })
          })
          .catch(_=> {
            this.$q.notify({
              icon: 'mdi-close',
              color: 'negative',
              message: `Problemas ao alterar dados.`,
              position: 'top'
            })
          })
        }
      },
      async salvarSenha()
      {
        let salvar = true
        let dados = {}

        if(this.isTrocarSenha)
        {
          if(!!this.senha && this.senha.length >= 5)
          {
            if(this.senha == this.confirmaSenha)
              dados.senha = this.senha
            else
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
          else
          {
            salvar = false
            this.$refs.senha.focus()
            this.$q.notify({
              icon: 'mdi-close',
              color: 'negative',
              message: `O campo senha deve ter pelo menos 5 dígitos.`,
              position: 'top'
            })
          }
        }

        if(salvar)
        {
          await request(API, 'PUT', `pessoas/${this.user._id}`, dados)
          .then(_=> {
            this.$q.notify({
              icon: 'mdi-check',
              color: 'positive',
              message: `Senha alterada com sucesso.`,
              position: 'top'
            })

            this.isTrocarSenha = false
          })
          .catch(_=> {
            this.$q.notify({
              icon: 'mdi-close',
              color: 'negative',
              message: `Problemas ao alterar senha.`,
              position: 'top'
            })
          })
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
