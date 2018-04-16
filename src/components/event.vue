<template>
    <div id="event">
        <newevent
                :dialog="create_dialog"
                @close="create_dialog=false"
                @save="save"
        ></newevent>
        <v-btn flat @click="create_dialog=true">
            Create new Event
        </v-btn>
        <v-list v-for="(event,id) in events">
            <v-layout row>
                <v-flex xs12 sm12>
                    <v-card>
                        <v-card-media
                                src="/static/doc-images/cards/sunshine.jpg"
                                height="200px"
                        >
                        </v-card-media>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{event.title}}</div>
                                <div class="grey--text">{{event.venue}}</div>
                                <div class="grey--text">E{{event.fee}}</div>
                                <div class="grey--text">{{event.date}}</div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat>Edit</v-btn>
                            <v-btn flat color="red">Delete</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-list>

    </div>
</template>

<script>
    import newevent from './newevent'
    export default {
        name: "event",
        parse_class:'event',
        components:{newevent},
        data(){
            return{
                create_dialog:false,
                show:false,
                events:[]
            }
        },
        created(){
          this.get_my_events()
        },
        methods:{
            save(event){
                console.log(event)
                this.save_object(event)
                console.log(this.agency)
            },
            get_my_events(){
                let parse_query=[
                    {
                        query:'equalTo',
                        field:'created_by',
                        val:this.current_user.id
                    }
                ]

                this.run_query(parse_query)
                    .then(result => {
                        console.log('Event',result)
                        let agency = {}
                        if(!result[0]) return
                        this.events = [];
                        result.forEach(e => this.events.push(e.attributes))
                    })
            }

        }
    }
</script>

<style scoped>
#event{
    width: 1000px;
}
</style>