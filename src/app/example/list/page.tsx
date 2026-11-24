'use client'
import { useState, useEffect, Suspense  } from 'react'
import createClient from 'openapi-fetch'

const testData = [
  {id: 1, name: 'test1', date: '2022-01-01'},
  {id: 2, name: 'test2', date: '2022-01-02'},
  {id: 3, name: 'test3', date: '2022-01-03'},
  {id: 4, name: 'test4', date: '2022-01-04'},
  {id: 5, name: 'test5', date: '2022-01-05'},
  {id: 6, name: 'test6', date: '2022-01-06'},
  {id: 7, name: 'test7', date: '2022-01-07'},
]
const listData = testData.map(item =>
  <li key={item.id}>{item.name} ({item.date})</li>
)

export default function List() {
  // https://pokeapi.co/
  const [pokemonData, setPokemonData] = useState<{ name: string }[]>([])
  const [pokemonData2, setPokemonData2] = useState([])
  const [tab, setTab] = useState(1)

  useEffect( () => {
    (async () => {
      const client = createClient({
        baseUrl: 'https://pokeapi.co/api/v2/',
      })
      // @ts-ignore
      const data = await client.GET("/pokemon")
      // const data = await client.GET("/ability")
      // const data = await client.GET("/pokemon/ditto")
      // const data = await client.GET("/pokemon")
      if (data.response.status === 200) {
        // @ts-ignore
        setPokemonData(data.data?.results)
      } else {
        throw new Error('error')
      }

      const allPokemonData = []
      for(let i=1;i<=151;i++) {
        // @ts-ignore
        const response = await client.GET(`/pokemon/${i}`)
        // @ts-ignore
        const specResponse = await client.GET(`/pokemon-species/${i}`)
        // @ts-ignore
        const koreanName = specResponse.data.names.find(name => name.language.name === 'ko')
        // @ts-ignore
        allPokemonData.push({ ...response.data, korean_name: koreanName.name })
      }
        // @ts-ignore
        setPokemonData2(allPokemonData)

    })()
  }, [])

  const renderPokemonList = () => {
    // @ts-ignore
    return pokemonData2.map((pokemon: any) => (
      <div key={pokemon.id}>
        <img src={pokemon.sprites.front_default} alt={pokemon.korean_name} />
        <p>{pokemon.korean_name}</p>
        <p>ID: {pokemon.id}</p>
      </div>
    ))
  }

  return (
    <>
      <div>
        <ul className="tabGrp">
          <li className={tab === 1 ? 'tabActive' : 'tab'} onClick={() => {setTab(1)}}>Test Data</li>
          <li className={tab === 2 ? 'tabActive' : 'tab'} onClick={() => {setTab(2)}}>Pokemon name list</li>
          <li className={tab === 3 ? 'tabActive' : 'tab'} onClick={() => {setTab(3)}}>Pokemon lib</li>
        </ul>
      </div>
      {tab === 1 &&
      <div>
        <ul>
          {listData}
        </ul>
      </div>
      }
      {tab === 2 &&
      <div>
        <ul>
          <Suspense fallback={<p>Loading pokemon...</p>}>
            {pokemonData.map(item => <li key={item.name}>{item.name}</li>)}
          </Suspense>
        </ul>
      </div>
      }
      {tab === 3 &&
        <Suspense fallback={<p>Loading pokemon...</p>}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
          }}>
            {renderPokemonList()}
          </div>
        </Suspense>
      }
    </>
  )
}
