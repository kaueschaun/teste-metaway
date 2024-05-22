import paths from "src/router/paths";

const menuItens = [
    { name: 'home', route: paths.home, icon: 'home' },
    { name: 'meu cadastro', route: paths.profile, icon: 'profile'},
    { name: 'usuários', route: paths.users, icon: 'user'},
    { name: 'pessoas', route: paths.persons, icon: 'persons'},
    { name: 'contatos', route: paths.contacts, icon: 'call'},
]

export default menuItens;