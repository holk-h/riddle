<template>
    <v-app style="background-color: rgb(245,245,245)">
        <v-main>
            <v-container fluid>
                <v-row>
                    <v-col>
                    </v-col>
                    <v-col cols="10">

                    </v-col>
                    <v-col style="text-align: right">
                        <v-icon class="mr-2">mdi-lightbulb-on-outline</v-icon>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row>
                    <v-col>
                    </v-col>
                    <v-col cols="10">

                        <transition>
                            <v-card style="top: 12rem;background: none;text-align: center" flat v-if="show">
                                <div style="font-size: 3rem" class="grey--text text--darken-3">
                                    <strong>欢迎来解谜</strong><br>
                                    <span style="font-size: 1.8rem">根据题目找到答案以后回车即可<br>祝你好运</span>
                                </div>
                            </v-card>
                        </transition>
                        <v-card style="top: 17rem;background: none" flat>
                            <transition>
                                <v-text-field
                                        label="来输入答案吧"
                                        solo
                                        v-if="showtxt"
                                ></v-text-field>
                            </transition>
                        </v-card>
                        <transition>
                        <v-card flat style="top: 17rem;background: none;text-align: right"
                                class="grey--text mr-1" v-if="show">第{{ id }}关
                        </v-card>
                        </transition>
                    </v-col>
                    <v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        components: {},

        data: () => ({
            id: 1,
            show: false,
            showtxt: false
        }),
        mounted() {
            this.show = true
            this.showtxt = true
        }
    };
</script>

<style>
    .v-enter,
    .v-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 2.5s ease;
    }


</style>