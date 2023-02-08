
/**   INFORMAÇÕES GERAIS
 * 
 *  routes arquivo responsável por instânciar e gerenciar todas as rotas da API
 *  
 *  @param app recebe o objeto app express()
 *  
 *  @method app.use permite o app acessar as rotas 
 * 
 */


import user from "../components/user/router-user.js"
import auth from "../components/auth/router-auth.js"
import profile from "../components/profile/router-profile.js"
import event from "../components/event/event-Router.js"


const routes = (APP) => {

    APP.route("/").get((req, res) => {
        res.status(200).send(`bem vindo a API`);
    })

    APP.use(user, auth, profile, event)
}

export default routes;