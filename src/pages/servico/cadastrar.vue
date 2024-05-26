<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <q-footer>
          <q-btn label="Confirmar" flat text-color="white" icon="mdi-check" class="full-width bg-primary" size="20px"
            no-caps @click="salvar()" />
        </q-footer>

        <div class="row justify-center">
          <div style="width: 800px; max-width: 100vw;">
            <div class="row q-gutter-sm bg-primary text-white"
              style="padding-left: 12px; padding-top: 9px; padding-bottom: 10px;">
              <div class="col-1">
                <q-btn icon="arrow_back" dense flat color="white" @click="voltar()" />
              </div>
              <div class="col-10">
                <span class="text-h6 text-weight-regular"> Informações do serviço </span>
              </div>
            </div>

            <q-card elevation class="bg-white no-shadow" Style="border-radius: 3px; padding: 0px;">
              <q-card-section style="padding-top: 8px">
                <div class="row">
                  <div class="col-2">
                    <q-icon :name="categoriaServico.icone" color="primary" size="36px" style="padding-top: 10px" />
                  </div>
                  <div class="col-10" style="margin-left: -15px">
                    <div class="col-12">
                      <span class="text-subtitle1 text-weight-medium">{{ categoriaServico.nomeCategoria }}</span>
                    </div>
                    <div class="col-12" style="margin-top: -10px">
                      <span class="text-subtitle1">{{ categoriaServico.nomeSubCategoria }}</span>
                    </div>
                  </div>
                </div>

                <q-input v-model="descricao" type="textarea" ref="descricao" label="Descrição do serviço"
                  placeholder="Descreva o serviço aqui" autogrow :input-style="{ fontSize: '16px' }" />

                <q-input v-model="inicioTrabalho" label="Início do trabalho" type="date"
                  :input-style="{ fontSize: '16px' }" />

                <div class="row" style="padding-top: 20px">
                  <div class="col-7">
                    <div class="text-h6">Endereço</div>
                  </div>
                  <div class="col-5">
                    <q-btn label="Meus locais" icon="mdi-map-marker" color="white" class="full-width bg-primary" dense
                      flat no-caps @click="popUpListarEndereco()" />
                  </div>
                </div>
                <div class="row">
                  <div class="text-caption">Endereço onde o serviço será prestado</div>
                </div>

                <q-input v-model="cepEndereco" ref="cepEndereco" label="CEP" class="full-width" type="number"
                  :input-style="{ fontSize: '16px' }" @keyup="buscaCep()" />

                <q-input v-model="logradouroEndereco" ref="logradouroEndereco" label="Rua" class="full-width"
                  :input-style="{ fontSize: '16px' }" />

                <q-input v-model="numeroEndereco" ref="numeroEndereco" label="Número" class="full-width"
                  :input-style="{ fontSize: '16px' }" />

                <q-input v-model="complementoEndereco" label="Complemento" class="full-width"
                  :input-style="{ fontSize: '16px' }" />

                <q-input v-model="bairroEndereco" ref="bairroEndereco" label="Bairro" class="full-width"
                  :input-style="{ fontSize: '16px' }" />

                <q-input v-model="cidadeUfEndereco" label="Cidade" class="full-width" disable
                  :input-style="{ fontSize: '16px' }" />

                <div class="row" style="padding-top: 20px">
                  <div class="col-7">
                    <div class="text-h6">Contato</div>
                  </div>
                  <div class="col-5">
                    <q-btn label="Meus contatos" icon="call" color="white" class="full-width bg-primary" dense flat
                      no-caps @click="popUpListarContato()" />
                  </div>
                </div>
                <div class="row">
                  <div class="text-caption">Seus dados para contato</div>
                </div>

                <q-input v-model="nome" ref="nome" label="Seu nome" class="full-width"
                  :input-style="{ fontSize: '16px' }" />

                <q-input v-model="telefoneContato" ref="telefoneContato" label="Telefone" placeholder="(99) 99999-9999"
                  class="full-width" @keyup="formataTelefone()" :input-style="{ fontSize: '16px' }" />

              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-dialog v-model="isConfirmarExclusao" persistent>
          <q-card style="width: 90vw">
            <q-card-section class="row items-center">
              <q-icon name="delete_forever" color="grey-10" size="28px" />
              <span class="text-h6" style="padding-left: 15px">Atenção</span>
            </q-card-section>

            <q-separator />

            <q-card-section class="row items-center">
              <span class="text-subtitle1" style="padding-left: 15px">{{ descricaoExclusao }}</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="black" @click="isConfirmarExclusao = !isConfirmarExclusao" />
              <q-btn flat label="Confirmar" color="black" @click="confirmarExclusao()" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="popUpListarEnderecoAberta" persistent>
          <q-card style="width: 90vw">
            <q-card-section class="row items-center">
              <q-icon name="mdi-map-marker" color="grey-10" size="28px" />
              <span class="text-h6" style="padding-left: 15px">Meus endereços salvos</span>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
              <q-list separator>
                <template v-for="(endereco, index) in listaEnderecos" :key="index">
                  <q-item class="list-item" style="padding-top: 15px; padding-bottom: 15px">
                    <q-item-section avatar style="padding-right: 10px !important; min-width: 0px !important;">
                      <q-btn flat dense icon="delete_forever" text-color="grey-10"
                        @click="popUpExclusao('endereco', index)" />
                    </q-item-section>

                    <q-item-section @click="informarEndereco(endereco)">
                      <q-item-label class="text-subtitle1">
                        {{ endereco.logradouro }}, {{ endereco.numero }}, {{ endereco.bairro }}
                      </q-item-label>
                      <q-item-label class="text-subtitle1"
                        v-if="endereco.complemento != undefined && endereco.complemento != null && endereco.complemento != ''">
                        {{ endereco.complemento }}
                      </q-item-label>
                      <q-item-label class="text-subtitle1">
                        {{ endereco.cidade }} - {{ endereco.uf }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Fechar" color="black"
                @click="popUpListarEnderecoAberta = !popUpListarEnderecoAberta" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="popUpListarContatoAberta" persistent>
          <q-card style="width: 90vw">
            <q-card-section class="row items-center">
              <q-icon name="call" color="grey-10" size="28px" />
              <span class="text-h6" style="padding-left: 15px">Meus contatos salvos</span>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
              <q-list separator>
                <template v-for="(contato, index) in listaContatos" :key="index">
                  <q-item class="list-item" style="padding-top: 15px; padding-bottom: 15px">
                    <q-item-section avatar style="padding-right: 10px !important; min-width: 0px !important;">
                      <q-btn flat dense icon="delete_forever" text-color="grey-10"
                        @click="popUpExclusao('contato', index)" />
                    </q-item-section>

                    <q-item-section @click="informarContato(contato)">
                      <q-item-label class="text-subtitle1">
                        {{ contato.nome }}
                      </q-item-label>
                      <q-item-label class="text-subtitle1">
                        {{ contato.telefone }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Fechar" color="black" @click="popUpListarContatoAberta = !popUpListarContatoAberta" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date, LocalStorage } from 'quasar'
import axios from 'axios'

export default {
  data() {
    return {
      urlBase: process.env.API,
      descricao: '',
      inicioTrabalho: date.formatDate(Date.now(), 'DD-MM-YYYY'),
      nome: '',
      telefoneContato: '',
      logradouroEndereco: '',
      numeroEndereco: '',
      complementoEndereco: '',
      bairroEndereco: '',
      cidadeUfEndereco: '',
      ibgeEndereco: 0,
      ufEndereco: '',
      cepEndereco: '',
      popUpListarEnderecoAberta: false,
      popUpListarContatoAberta: false,
      listaEnderecos: [],
      listaContatos: [],
      isConfirmarExclusao: false,
      tituloExclusao: '',
      descricaoExclusao: '',
      promptExclusao: '',
      objetoExclusao: null,
      categoriaServico: LocalStorage.getItem("categoriaNovoServico"),
      token: LocalStorage.getItem("token")
    }
  },
  mounted() {
    this.$refs.descricao.focus()
    this.nome = this.token.nome
    /*
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position)
        }, function(error){
            console.log(error)
        })
    }else{
        alert("ops, não foi possível pegar a localização.")
    }
    */
  },
  methods: {
    voltar() {
      this.$router.go(-1)
    },
    formataTelefone() {
      this.telefoneContato = this.telefoneContato.replace(/\D/g, "")
      this.telefoneContato = this.telefoneContato.replace(/^(\d{2})(\d)/g, "($1) $2")
      this.telefoneContato = this.telefoneContato.replace(/(\d)(\d{4})$/, "$1-$2")
    },
    popUpListarEndereco() {
      if (LocalStorage.getItem("meusEnderecos")) {
        this.listaEnderecos = LocalStorage.getItem("meusEnderecos")
      }
      this.popUpListarEnderecoAberta = true
    },
    popUpListarContato() {
      if (LocalStorage.getItem("meusContatos")) {
        this.listaContatos = LocalStorage.getItem("meusContatos")
      }
      this.popUpListarContatoAberta = true
    },
    informarEndereco(parametro) {
      this.logradouroEndereco = parametro.logradouro
      this.numeroEndereco = parametro.numero
      this.complementoEndereco = parametro.complemento
      this.bairroEndereco = parametro.bairro
      this.cepEndereco = parametro.cep
      this.ibgeEndereco = parametro.ibge
      this.cidadeEndereco = parametro.cidade
      this.ufEndereco = parametro.uf
      this.cidadeUfEndereco = parametro.cidadeUf
      this.popUpListarEnderecoAberta = false
    },
    informarContato(parametro) {
      this.nome = parametro.nome
      this.telefoneContato = parametro.telefone
      this.popUpListarContatoAberta = false
    },
    buscaCep() {
      this.cepEndereco = this.cepEndereco.replace('-', '')
      this.cepEndereco = this.cepEndereco.replace(' ', '')
      this.cepEndereco = this.cepEndereco.replace('/', '')

      let qtd = ''
      if (this.cepEndereco != null) {
        qtd = this.cepEndereco
      }

      //Verifica se o numero é cadastrado
      if (qtd.length == 8) {
        this.getByCep()
      }
    },
    getByCep() {
      let urlcep = 'https://viacep.com.br/ws/' + this.cepEndereco + '/json/'
      axios.get(urlcep).then((response) => {
        if (response.data != null) {
          this.logradouroEndereco = response.data.logradouro
          this.bairroEndereco = response.data.bairro
          this.ibgeEndereco = response.data.ibge
          this.cidadeEndereco = response.data.localidade
          this.ufEndereco = response.data.uf
          this.cidadeUfEndereco = response.data.localidade + " - " + response.data.uf

          if (response.data.logradouro == '') {
            this.$refs.logradouroEndereco.focus()
          } else {
            if (this.numeroEndereco == '') {
              this.$refs.numeroEndereco.focus()
            } else {
              if (response.data.bairro == '') {
                this.$refs.bairroEndereco.focus()
              } else {
                this.$refs.cepEndereco.focus()
              }
            }
          }
        }
      })
    },
    fecharPopUpExclusao() {
      this.isConfirmarExclusao = false
      this.objetoExclusao = null
      this.promptExclusao = ''
    },
    popUpExclusao(prompt, objeto) {
      this.promptExclusao = prompt
      this.objetoExclusao = objeto
      this.tituloExclusao = 'Atenção'

      if (prompt == 'contato') {
        this.descricaoExclusao = 'Você realmente deseja excluir esse contato?'
      } else {
        if (prompt == 'endereco') {
          this.descricaoExclusao = 'Você realmente deseja excluir esse endereço?'
        }
      }

      this.isConfirmarExclusao = true
    },
    confirmarExclusao() {
      if (this.promptExclusao === 'contato') {
        this.removerContato(this.objetoExclusao)
      } else {
        if (this.promptExclusao === 'endereco') {
          this.removerEndereco(this.objetoExclusao)
        }
      }
    },
    removerEndereco(posicao) {
      if (posicao !== undefined && posicao !== null && posicao >= 0) {
        this.listaEnderecos.splice(posicao, 1)
        LocalStorage.set("meusEnderecos", this.listaEnderecos)

        this.$q.notify({
          icon: 'check',
          color: 'positive',
          message: `O endereço foi removido.`,
          position: 'top'
        });
      } else {
        this.$q.notify({
          icon: 'check',
          color: 'negative',
          message: `Problemas ao remover endereço.`,
          position: 'top'
        });
      }

      this.fecharPopUpExclusao()
    },
    removerContato(posicao) {
      if (posicao !== undefined && posicao !== null && posicao >= 0) {
        this.listaContatos.splice(posicao, 1)
        LocalStorage.set("meusContatos", this.listaContatos)

        this.$q.notify({
          icon: 'check',
          color: 'positive',
          message: `O contato foi removido.`,
          position: 'top'
        });
      } else {
        this.$q.notify({
          icon: 'check',
          color: 'negative',
          message: `Problemas ao remover contato.`,
          position: 'top'
        });
      }

      this.fecharPopUpExclusao()
    },
    salvar() {
      let salvar = true
      let existeContato = false
      let existeEndereco = false
      let dados = {}

      if (this.categoriaServico.idCategoria != undefined && this.categoriaServico.idCategoria != null && this.categoriaServico.idCategoria != '') {
        if (this.categoriaServico.idSubCategoria != undefined && this.categoriaServico.idSubCategoria != null && this.categoriaServico.idSubCategoria != '') {
          if (this.categoriaServico.nomeCategoria != undefined && this.categoriaServico.nomeCategoria != null && this.categoriaServico.nomeCategoria != '') {
            if (this.categoriaServico.nomeSubCategoria != undefined && this.categoriaServico.nomeSubCategoria != null && this.categoriaServico.nomeSubCategoria != '') {
              dados.idCategoria = this.categoriaServico.idCategoria
              dados.idSubCategoria = this.categoriaServico.idSubCategoria
              dados.nomeCategoria = this.categoriaServico.nomeCategoria
              dados.nomeSubCategoria = this.categoriaServico.nomeSubCategoria
              dados.iconeCategoria = this.categoriaServico.icone
            } else {
              salvar = false
              this.$q.notify({
                icon: 'close',
                color: 'negative',
                message: `Selecione uma categoria.`,
                position: 'top'
              })
            }
          } else {
            salvar = false
            this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: `Selecione uma categoria.`,
              position: 'top'
            })
          }
        } else {
          salvar = false
          this.$q.notify({
            icon: 'close',
            color: 'negative',
            message: `Selecione uma categoria.`,
            position: 'top'
          })
        }
      } else {
        salvar = false
        this.$q.notify({
          icon: 'close',
          color: 'negative',
          message: `Selecione uma categoria.`,
          position: 'top'
        })
      }

      if (salvar) {
        if (this.descricao !== undefined && this.descricao !== null && this.descricao !== '') {
          dados.descricao = this.descricao
          dados.inicioTrabalho = this.inicioTrabalho
        } else {
          salvar = false
          this.$refs.descricao.focus()
          this.$q.notify({
            icon: 'close',
            color: 'negative',
            message: `Informe a descrição do serviço.`,
            position: 'top'
          })
        }
      }

      if (salvar) {
        if (this.nome !== undefined && this.nome !== null && this.nome !== '') {
          if (this.telefoneContato !== undefined && this.telefoneContato !== null && (this.telefoneContato.length == 15 || this.telefoneContato.length == 14)) {
            dados.nomeContratante = this.nome
            dados.telefoneContratante = this.telefoneContato
          } else {
            salvar = false
            this.$refs.telefoneContato.focus()
            this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: `Informe o telefone para contato.`,
              position: 'top'
            })
          }
        } else {
          salvar = false
          this.$refs.nome.focus()
          this.$q.notify({
            icon: 'close',
            color: 'negative',
            message: `Informe o nome do contato.`,
            position: 'top'
          })
        }
      }

      if (salvar) {
        let endereco = {}

        if (this.cepEndereco !== undefined && this.cepEndereco !== null && this.cepEndereco.length == 8) {
          endereco.cep = this.cepEndereco

          if (this.logradouroEndereco !== undefined && this.logradouroEndereco !== null && this.logradouroEndereco !== "") {
            endereco.logradouro = this.logradouroEndereco

            if (this.bairroEndereco !== undefined && this.bairroEndereco !== null && this.bairroEndereco !== "") {
              endereco.bairro = this.bairroEndereco

              if (this.numeroEndereco !== undefined && this.numeroEndereco !== null && this.numeroEndereco !== "") {
                endereco.numero = this.numeroEndereco

                if (this.ibgeEndereco !== undefined && this.ibgeEndereco !== null && this.ibgeEndereco > 0) {
                  endereco.ibge = this.ibgeEndereco
                  endereco.cidade = this.cidadeEndereco
                  endereco.uf = this.ufEndereco
                  endereco.complemento = this.complementoEndereco
                } else {
                  salvar = false
                  this.$refs.cepEndereco.focus()
                  this.$q.notify({
                    icon: 'close',
                    color: 'negative',
                    message: `Informe o CEP para buscar a cidade.`,
                    position: 'top'
                  })
                }
              } else {
                salvar = false
                this.$refs.numeroEndereco.focus()
                this.$q.notify({
                  icon: 'close',
                  color: 'negative',
                  message: `O campo número deve ser preenchido.`,
                  position: 'top'
                })
              }
            } else {
              salvar = false
              this.$refs.bairroEndereco.focus()
              this.$q.notify({
                icon: 'close',
                color: 'negative',
                message: `O campo bairro deve ser preenchido.`,
                position: 'top'
              })
            }
          } else {
            salvar = false
            this.$refs.logradouroEndereco.focus()
            this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: `O campo logradouro deve ser preenchido.`,
              position: 'top'
            })
          }
        } else {
          salvar = false
          this.$refs.telefoneContato.focus()
          this.$q.notify({
            icon: 'close',
            color: 'negative',
            message: `O campo CEP deve ser preenchido.`,
            position: 'top'
          })
        }

        dados.endereco = endereco
      }

      if (salvar) {
        //verifica se o contato e o endereço já estão salvos
        let contatos = LocalStorage.getItem("meusContatos")
        if (contatos != undefined && contatos != null && contatos.length > 0) {
          for (let i = 0; i < contatos.length; i++) {
            if (contatos[i].nome == this.nome && contatos[i].telefone == this.telefoneContato) {
              existeContato = true
              break
            }
          }
        } else {
          contatos = []
        }

        if (!existeContato) {
          contatos.push({
            nome: this.nome,
            telefone: this.telefoneContato
          })
          LocalStorage.set("meusContatos", contatos)
        }

        let enderecos = LocalStorage.getItem("meusEnderecos")
        if (enderecos != undefined && enderecos != null && enderecos.length > 0) {
          for (let i = 0; i < enderecos.length; i++) {
            if (enderecos[i].cep == this.cepEndereco) {
              if (enderecos[i].logradouro == this.logradouroEndereco) {
                if (enderecos[i].numero == this.numeroEndereco) {
                  if (enderecos[i].complemento == this.complementoEndereco) {
                    if (enderecos[i].bairro == this.bairroEndereco) {
                      if (enderecos[i].ibge == this.ibgeEndereco) {
                        existeEndereco = true
                        break
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          enderecos = []
        }

        if (!existeEndereco) {
          enderecos.push({
            logradouro: this.logradouroEndereco,
            numero: this.numeroEndereco,
            complemento: this.complementoEndereco,
            bairro: this.bairroEndereco,
            cep: this.cepEndereco,
            ibge: this.ibgeEndereco,
            cidade: this.cidadeEndereco,
            uf: this.ufEndereco,
            cidadeUf: this.cidadeUfEndereco
          })
          LocalStorage.set("meusEnderecos", enderecos)
        }

        let token = LocalStorage.getItem("token")
        dados.idPessoa = token._id

        axios.post(this.urlBase + 'servicos', dados)
          .then((response) => {
            if (response.status == 201) {
              let servicos = LocalStorage.getItem("servicos")
              if (servicos == undefined || servicos == null) {
                servicos = []
              }
              servicos.push(response.data)
              LocalStorage.set("servicos", servicos)
            }

            this.$q.notify({
              icon: 'check',
              color: 'positive',
              message: `Tudo pronto, os prestadores estão sendo notificados.`,
              position: 'top'
            });

            this.$router.go(-2)
          }).catch(function (error) {
            this.$q.notify({
              icon: 'close',
              color: 'negative',
              message: `Problemas ao salvar serviço, tente novamente mais tarde.`,
              position: 'top'
            });
          });
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
