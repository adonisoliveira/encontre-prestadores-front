function ordernarCategorias(categorias)
{
  if(!!categorias)
  {
    categorias.sort((a, b) => ordenar(a, b))
    categorias.forEach(categoria => {
      categoria.subCategorias.sort((a, b) => ordenar(a, b))
    })
  }

  return categorias
}

function ordenar(a, b)
{
  const x = a.nome.toLowerCase(),
        y = b.nome.toLowerCase()

  return x < y ? -1 : x > y ? 1 : 0
}

export { ordernarCategorias }
