let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require(`${process.cwd()}/app.js`)

chai.should()

chai.use(chaiHttp)

let defaultUser = {
    username: 'user1',
    password: '123',
}

let token

describe('Test API user', () => {
    beforeEach((done) => {
        chai.request(server)
            .post('/login')
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.accessToken
                res.should.have.status(200)
                done()
            })
    })

    /**
     * Test the GET router
     */
    describe('GET API /users', () => {
        it('It should GET all users', (done) => {
            chai.request(server)
                .get('/users')
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })

        it('It should not GET all users', (done) => {
            chai.request(server)
                .get('/user')
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404)
                    done()
                })
        })
    })

    /**
     * Test the GET(by id) router
     */
    describe('GET API /users/:id', () => {
        it('It should GET user', (done) => {
            const userId = 'c9699f18-f039-437b-a6d9-98dd210a7478'
            chai.request(server)
                .get('/users/' + userId)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have
                        .property('data')
                        .property('user')
                        .property('id')
                        .eq('c9699f18-f039-437b-a6d9-98dd210a7478')
                    response.body.should.have.property('data').property('user').property('name')
                    response.body.should.have.property('data').property('user').property('username')
                    response.body.should.have.property('data').property('user').property('password')
                    response.body.should.have.property('data').property('user').property('email')
                    response.body.should.have.property('data').property('user').property('status')
                    done()
                })
        })

        it('It should not GET user', (done) => {
            const userId = 100
            chai.request(server)
                .get('/users/' + userId)
                .end((err, response) => {
                    response.should.have.status(404)
                    response.body.should.be.a('object')
                    response.body.should.have.property('status').eq('Fail')
                    response.body.should.have.property('message').eq('Invalid ID')
                    done()
                })
        })
    })

    /**
     *  Test the POST router
     */
    // describe('POST API /users', () => {
    //     it('It should POST new user', (done) => {
    //         const user = {
    //             id: '4',
    //             name: 'user3',
    //             username: 'user3',
    //             password: '123',
    //             email: 'user3@gmail.com',
    //             status: true,
    //         }
    //         chai.request(server)
    //             .post('/users')
    //             .send(user)
    //             .end((err, response) => {
    //                 response.should.have.status(200)
    //                 response.body.should.be.a('object')
    //                 response.body.should.have.property('id').eq(4)
    //                 response.body.should.have.property('name').eq('user3')
    //                 response.body.should.have.property('username').eq('user3')
    //                 response.body.should.have.property('password').eq('123')
    //                 response.body.should.have.property('email').eq('user3@gmail.com')
    //                 response.body.should.have.property('status').eq(true)
    //                 done()
    //             })
    //     })
    // })

    // describe('POST API /users', () => {
    //     it('It should not POST new user', (done) => {
    //         const user = {
    //             name: 'user3',
    //             username: 'user3',
    //             password: '123',
    //             email: 'user3@gmail.com',
    //             status: true,
    //         }
    //         chai.request(server)
    //             .post('/users')
    //             .send(user)
    //             .end((err, response) => {
    //                 response.should.have.status(400)
    //                 done()
    //             })
    //     })
    // })

    /**
     * Test the PUT router
     */
    describe('PUT API /users/:id', () => {
        it('It should  PUT  user', (done) => {
            const userId = 'c9699f18-f039-437b-a6d9-98dd210a7478'
            const user = {
                name: 'user1',
                status: true,
            }
            chai.request(server)
                .put('/users/' + userId)
                .set({ Authorization: `Bearer ${token}` })
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('status').eq('Success')
                    response.body.should.have.property('message').eq('Update user successfully')
                    done()
                })
        })

        it('It should  PUT  user', (done) => {
            const userId = 4
            const user = {
                name: 'user3',
                status: true,
            }
            chai.request(server)
                .put('/users/' + userId)
                .set({ Authorization: `Bearer ${token}` })
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400)
                    done()
                })
        })
    })

    /**
     * Test the DELETE router
     */
    // describe('DELETE API /users/:id', () => {
    //     it('It should  DELETE  user', (done) => {
    //         const userId = 4
    //         chai.request(server)
    //             .delete('/users/' + userId)
    //             .end((err, response) => {
    //                 response.should.have.status(200)
    //                 response.body.should.be.a('object')
    //                 response.body.should.have.property('status').eq('Success')
    //                 response.body.should.have.property('message').eq('Delete user successfully')
    //                 done()
    //             })
    //     })
    // })
})
