<template>
    <div id="event">
        <newevent
                :dialog="create_dialog"
                @close="create_dialog=false"
        ></newevent>
        <v-btn flat @click="create_dialog=true">
            Create new Event
        </v-btn>
        <v-layout row>
            <v-flex xs12 sm4>
                <v-card>
                    <v-card-media
                            src="/static/doc-images/cards/sunshine.jpg"
                            height="200px"
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Top western road trips</div>
                            <span class="grey--text">1,000 miles of wonder</span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat>Edit</v-btn>
                        <v-btn flat color="red">Delete</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon @click.native="show = !show">
                            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-slide-y-transition>
                        <v-card-text v-show="show">
                            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                        </v-card-text>
                    </v-slide-y-transition>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import newevent from './newevent'
    export default {
        name: "event",
        components:{newevent},
        data(){
            return{
                create_dialog:false,
                show:false
            }
        }
    }
</script>

<style scoped>
#event{
    width: 1000px;
}
</style>