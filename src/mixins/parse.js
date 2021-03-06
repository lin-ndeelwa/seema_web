import router from "../router";
const server_url = process.env.NODE_ENV === 'production' ?
    `${window.location}`
    : 'http://localhost:3000/'
const Parse = require('parse')
Parse.initialize("myAppId");
Parse.serverURL =  `${server_url}parse`
Parse.masterKey = 'myMasterKey'



//console.log(env)

const parseMixin = function({router}){
    router.beforeEach((to, from, next) => {
        console.log('to',to,'from',from)
        console.log('Router in Parse',);
        let redirect_to_login = to.path!=='/login'
                         && !Parse.User.current();

        let redirect_to_home = to.path === '/login'
                                && Parse.User.current()

        if(redirect_to_login){
            console.log('Redirected to login')
            return next('/login')
        }

        if(redirect_to_home){
            console.log('Rederict to home')
            return next('/')
        }

        console.log('Default')
        return next()
        // ...
    })

  return  {

        data() {
        return {
            custom_fields: ['field1'],
            class_name: '',
            $rows:[]
        }
    },
        created: function () {
            this.init_parse()
        },
        methods: {
            getRoles(){
                var Role
            }
        ,
            save_object(obj){

                var ParseObject = Parse.Object.extend(this.class_name);
                var parseObject = new ParseObject();

                Object.keys(obj).forEach( key => {
                    parseObject.set(key,obj[key])
                })

                parseObject.set('created_by',this.current_user.id)

                console.log('saving',obj)

                if(obj.id){
                    var parseObj = Parse.Object.extend(this.class_name);
                    var query = new Parse.Query(parseObj);
                    query.get(obj.id, {
                        success: function(res) {
                            // The object was retrieved successfully.
                            Object.keys(obj).forEach( key => {
                                res.set(key,obj[key])
                            })
                            res.save(null,{
                                success(_obj){
                                    console.log('Saved ',_obj)
                                },
                                error(_obj, err){
                                    console.log('Failed ',_obj,err)
                                }
                            })
                        },
                        error: function(object, error) {
                            // The object was not retrieved successfully.
                            // error is a Parse.Error with an error code and message.
                        }
                    });
                }else{
                    parseObject.save(null,{
                        success(_obj){
                            console.log('Saved ',_obj)
                        },
                        error(_obj, err){
                            console.log('Failed ',_obj,err)
                        }
                    })
                }

            },
            run_query:function(_query){
                console.log(_query)
                let query = new Parse.Query(this.class_name)
                _query.forEach(q => query[q.query](q.field,q.val))
                return new Promise(((resolve, reject) => {
                    query.find({
                        success: function(results) {

                            console.log("Successfully retrieved " , results);
                            resolve(results)
                            // Do something with the returned Parse.Object values
                        },
                        error: function(error) {
                            alert("Error: " + error.code + " " + error.message);
                            reject(error)
                        }
                    });
                }))

            },
            init_parse: function () {
                //console.log('init parse',this.$options.parse_class)
                const class_name = this.$options.parse_class
                const account = this.$options.account
                if(account) this.user = Parse.User
                if (!class_name) return
                this.class_name = class_name
                this.current_user = Parse.User.current()
                const schema = new Parse.Schema(class_name)
                const self = this;
                console.log('class_name',class_name)
                this.parse = Parse;
                schema.get({
                    success(_schema) {
                        self.custom_fields = Object.keys(_schema.fields)
                            .filter(field => !['ACL', 'createdAt', 'updatedAt', 'objectId'].includes(field))
                        let query = new Parse.Query(self.class_name)

                        let subscription = query.subscribe();


                        subscription.on('open', () => {
                            console.log('subscription opened');
                        });

                        subscription.on('create', (object) => {
                            console.log('object created',object);
                            self.$rows.push(object)
                        });


                        subscription.on('update', (object) => {
                            console.log('object updated',object);
                            self.$rows = self.rows.map(row => row.id===object.id?object:row)
                        });

                        query.find({
                            success(result){
                                self.$rows = result
                            },
                            error(){
                                console.log('Query Fail')
                            }
                        })
                    },
                    error(err) {
                        console.log('Get Schema fail',err)
                        schema.save();
                    }
                })
            },
            login(user){
                console.log('Login')
                return new Promise(((resolve, reject) => {
                    const _user = new Parse.User()
                    _user.set('username',user.email)
                    _user.set('password',user.password)
                    Parse.User.logIn(user.email,user.password,{
                        success:resolve,
                        error(us,er){
                            console.log("Login Fail",er)
                            reject(er)
                        }
                    })

                }))

            },
            sign_out(){
                return new Promise(((resolve, reject) =>{
                    Parse.User.logOut()
                        .then(resolve)
                        .catch(reject)


                } ))

            },
            signup(user){
                console.log('Signup')
                return new Promise((resolve, reject) => {
                    let _user = new Parse.User()
                    Object.keys(user)
                        .forEach(key => _user.set(key,user[key]))
                    _user.set('username',user.email)

                    _user.signUp(null,{
                        success(new_user){

                            resolve(new_user)
                        },
                        error(failed_user,_error){
                            console.log('rejecting',_error)
                            reject(_error)
                        }
                    })
                    console.log(_user)
                })

            }
        }
    }
}

export default parseMixin;