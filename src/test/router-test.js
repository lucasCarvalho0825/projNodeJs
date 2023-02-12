import chai from "chai";
import chaiHttp from "chai-http";
import APP from "../_bin/app.js"



let should = chai.should();

// ROTA TESTE DO TESTE ... DEU BOM 
chai.use(chaiHttp);

    describe("/GET INFOR", () =>{
        it("teste o métod de autores", (done) => {
            chai.request(APP)
            .get("/infor")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.property("message").eql( "Lucas carvalho, Stephany ...  e Matheus Kosak");
            done();
            })
        })
    })

    /**
     *  ROUTER AUTH
     * 
     */
    describe("/GET SIGN OUT", () => {
        it("NENHUM USER LOGADO, SEM TOKEN", (done) => {
            chai.request(APP)
            .get("/auth")
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.property("message").eql( "Token não informado");
            done();
            })
        });  
    })


    describe("/POST SIGN IN 1", () => {
        it("USERNAME E PASSWORD VAZIOS", (done) => {
            let user = {
                username: "",
                password:""
            }
            chai.request(APP)
            .post("/auth")
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.property("message").eql( "username ou password incorreto");
            done();
            })
        })
    })

    describe("/POST SIGN IN 2", () => {
        it("USERNAME NÃO CADASTRADO", (done) => {
            let user = {
                username: "bhfhshfbhs@email.com",
                password:"123456"
            }

            chai.request(APP)
            .post("/auth")
            .send(user)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.property("message").eql("User não cadastrado");
            done();
            })
        })
    })


    describe("/POST SIGN IN 3", () => {
        it("PASSWORD INCORRETO", (done) => {
            let user = {
                username: "admin@email.com",
                password:"123456"
            }
            chai.request(APP)
            .post("/auth")
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.property("message").eql("password incorreto");
            done();
            })
        })
    })


    describe("/POST RESETE 1", () => {
        it("USERNAME E PASSWORD VAZIOS", (done) => {
            let data = {
                username: "",
                password:"",
                confirmacao:""
            }
            chai.request(APP)
            .post("/auth/reset")
            .send(data)
            .end((err, res) => {

                res.should.have.status(400);
                res.body.should.be.property("message").eql( "username ou password incorreto");
            done();
            })
        })
    })

    describe("/POST RESETE 2", () => {
        it("USERNAME NÃO CADASTRADO", (done) => {
            let data = {
                username: "bhfhshfbhs@email.com",
                password:"123456",
                confirmacao:"123456"
            }

            chai.request(APP)
            .post("/auth/reset")
            .send(data)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.property("message").eql(" nenhum usuário encontrado");
            done();
            })
        })
    })


    describe("/POST RESETE 3", () => {
        it("PASSWORD INCORRETO", (done) => {
            let data = {
                username: "admin@email.com",
                password:"123456",
                confirmacao:"12456"
            }
            chai.request(APP)
            .post("/auth/reset")
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.property("message").eql("as senhas não são iguais");
            done();
            })
        })
    })



  /**
   *   describe("/GET SIGN IN 4", () => {
        it("TOKEN NÃO GERADO", (done) => {
            let user = {
                username: "admin@email.com",
                password:"testando"
            }
            chai.request(APP)
            .post("/auth")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
            done();
            })
        })
    })


   */
