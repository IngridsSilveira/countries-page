import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Api {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
  flags: {
    png: string;
    svg: string;
  };
}
export const Section = () => {
  const [input, setInput] = useState<string>("");
  const [paises, setPaises] = useState<Api[]>([]);
  const [paisFiltrado, setPaisFiltrado] = useState<Api[]>([]);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string>("");

  //Pegando a API
  useEffect(() => {
    const url = `https://restcountries.com/v3.1/all`;

    const ApiFetch = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPaises(json.slice(200, 248));
        setPaisFiltrado(json.slice(200, 248));
        // console.log(json);
      } catch (error) {
        console.log("Não foi possível realizar essa solicitação ", error);
      }
    };
    ApiFetch();
    // pesquisa();
  }, []);

  useEffect(() => {
    // Filtrar os países baseado na região selecionada
    if (regiaoSelecionada) {
      const paisesEncontrados = paises.filter(
        (pais) => pais.region.toLowerCase() === regiaoSelecionada.toLowerCase()
      );
      setPaisFiltrado(paisesEncontrados);
    } else {
      setPaisFiltrado(paises);
    }
  }, [regiaoSelecionada, paises]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
    // Filtrar países pelo nome quando o input mudar
    const paisesFiltradosPorNome = paises.filter((pais) =>
      pais.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setPaisFiltrado(paisesFiltradosPorNome);
  };

  return (
    <section className="min-h-auto flex flex-col p-4 gap-6">
      <div className="flex flex-col md:flex-row gap-3 justify-between relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="px-20 py-3 rounded-md shadow-md font-mono font-bold"
          placeholder="Pesquise pelo país"
        />
        <CiSearch className="absolute left-4 top-3" size={25} />

        <select
          id="selectItens"
          className="bg-white p-2 font-baloo font-semibold dark:bg-slate-950 dark:text-white shadow-md dark:shadow-white dark:shadow-sm"
          onChange={(e) => setRegiaoSelecionada(e.target.value)}
        >
          <label>Filtro</label>
          <option selected disabled>
            Filtro pela Região
          </option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <article className="flex flex-row flex-wrap gap-10 justify-center">
        {paisFiltrado.length > 0 ? (
          paisFiltrado.map((pais) => (
            <div
              key={pais.name.common}
              id={pais.name.common}
              className="h-80 w-64 rounded-sm shadow-lg dark:shadow-white dark:shadow-sm bg-white dark:bg-slate-950 dark:text-white hover:scale-105"
            >
              <img
                className="h-2/4 w-full rounded-t-sm"
                src={pais.flags.png}
                alt={`Bandeira do país ${pais.name.common}`}
              />
              <h1 className="font-bold font-baloo pl-4 pt-2 text-lg">
                {pais.name.common}
              </h1>
              <div className="p-4">
                <p>
                  <span className="font-semibold">População: </span>
                  {new Intl.NumberFormat().format(pais.population ?? 0)}
                </p>
                <p>
                  <span className="font-semibold">Região:</span> {pais.region}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span> {pais.capital}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum país encontrado</p>
        )}
      </article>
    </section>
  );
};
