<template>
    <div>
        <v-card tile id="agency">
            <v-toolbar card dark color="primary">
                <v-toolbar-title>Edit Agency Information</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="save()">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-divider></v-divider>
                <v-list three-line subheader>
                    <v-subheader>General</v-subheader>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Name</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field
                                        label="Agency's Name"
                                        v-model="agency.name"
                                        required
                                        box
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Address</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field
                                        label="Your Premisses"
                                        v-model="agency.address"
                                        box
                                        required
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Slogan</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field
                                        label="Your Agency Slogan"
                                        v-model="agency.slogan"
                                        required
                                        box
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Description</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field
                                        label="More About this Agency"
                                        v-model="agency.description"
                                        box
                                        required
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Logo</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field
                                        v-model="agency.logo"
                                        type="file"
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-subheader>Contacts</v-subheader>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Tel</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field
                                        v-model="agency.tel"
                                        label="Telephone Number"
                                        required
                                        box
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Email</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field
                                        v-model="agency.email"
                                        label="Official Email Address"
                                        required
                                        box
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card-text>

            <div style="flex: 1 1 auto;"></div>
        </v-card>
    </div>
</template>

<script>
    export default {
        parse_class:'agency',
        name: "agency",
        data(){
            return{
                agency:{}
            }
        },
        methods:{
            save(){
                console.log(this.agency)
            }
        }
    }
</script>

<style scoped>
    #agency{
        width: 1000px;
    }
</style>