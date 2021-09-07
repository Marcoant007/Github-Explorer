import React, { useState, FormEvent, useEffect } from "react";
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from "./styles";
// Aqui é onde eu  importo os componentes que eu criei la no styles

import Repository from "../Repository";

interface Repository {

    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };

}


const Dashboard: React.FunctionComponent = () => {
    const [newRepo, setNewRepo] = useState('');

    const [inputError, setInputError] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');

        if (storagedRepositories) {
            return JSON.parse(storagedRepositories); //JSON.parse para desconverter
        } else {
            return []
        }

    }); 

   
    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
    }, [repositories])

    async function handeAddRepository(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite o autor/nome do repositório');
            return;
        }

        try {

            const response = await api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data

            setRepositories([...repositories, repository]); //preciso pegar oque eu ja tenho e passar o novo por isso os '...'
            setInputError('');
            setNewRepo('');
        } catch (error) {
            setInputError('Erro na busca de repositório')
        }
    }


    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>


            <Form hasError={!!inputError} onSubmit={handeAddRepository}>
                < input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}
            {/* Isso é um IF que só vai executar quando a primeira parte da condição for verdadeira */}


            <Repositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="teste">

                        <img src={repository.owner.avatar_url}
                            alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>

                ))}
            </Repositories>
        </>
    )
}
export default Dashboard
