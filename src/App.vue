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
                        <transition>
                            <div>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon class="mb-1" v-bind="attrs"
                                                v-on="on">mdi-lightbulb-on-outline
                                        </v-icon>
                                    </template>
                                    <span>{{ hint }}</span>
                                </v-tooltip>
                                |
                                <v-icon class="mb-1" @click="overlay = !overlay">mdi-help-box</v-icon>
                                <v-overlay :value="overlay" style="text-align: center">
                                    <v-card light elevation="6">
                                        <v-card-title>欢迎你。<br>这是一个解谜网站<br>你需要通过各种方法，根据题目找到答案。
                                        <br>它会涉及到各个领域的知识<br>找到正确答案，输入后按下回车即可进入下一关
                                            <br>打开脑洞，祝你好运！</v-card-title>
                                    </v-card>
                                    <v-btn icon @click="overlay = false" class="mt-10">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-overlay>
                                |
                                <a href="https://holk.tech" style="text-decoration: none">
                                    <v-icon class="mr-1">mdi-message-text-outline</v-icon>
                                </a>
                            </div>
                        </transition>
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
                                <div style="font-size: 3rem" class="grey--text text--darken-3" v-html="msg">
                                </div>
                            </v-card>
                        </transition>
                        <v-card style="top: 17rem;background: none" flat>
                            <transition>
                                <v-text-field
                                        label="输入答案"
                                        solo
                                        v-if="showtxt"
                                        prepend-inner-icon="mdi-arrow-right"
                                        clearable
                                        :error="err"
                                        :success="suc"
                                        @change="change"
                                        v-model="val"
                                        id="input"
                                        :messages="zt"
                                ></v-text-field>
                            </transition>
                        </v-card>
                        <transition>
                            <v-card flat style="top: 17rem;background: none;text-align: right"
                                    class="grey--text mr-1" v-if="show">第{{ level }}关
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
    import Vue from "vue"

    export default {
        name: 'App',

        components: {},

        data: () => ({
            level: 1,
            show: false,
            showtxt: false,
            err: false,
            suc: false,
            val: '',
            msg: '<strong>欢迎你</strong><br><span style="font-size: 1.8rem">根据题目找到答案以后回车即可' +
                '<br>祝你好运</span>',
            zt: '',
            hint: '看看文本框里写的什么？',
            overlay: false
        }),
        mounted() {
            this.show = true
            this.showtxt = true
            Vue.axios.get('https://holk.tech/riddle/visitors.php')
        },
        methods: {
            change() {
                Vue.axios.get('https://holk.tech/riddle/vaildkey.php', {
                    params: {
                        key: this.val,
                        level: this.level
                    }
                }).then((res) => {
                    if (res.data === true) {
                        this.nextLevel()
                    } else {
                        this.err = true
                        this.zt = '答案错误'
                    }
                }).catch((err) => {
                    alert(err)
                })
            },
            nextLevel() {
                Vue.axios.get('https://holk.tech/riddle/gethint.php', {
                    params: {
                        level: parseInt((this.level).toString()) + 1
                    }
                }).then((res) => {
                    this.level = res.data['level']
                    this.hint = res.data['hint']
                    this.tran(res.data['question'], res.data['id'])
                    setTimeout(function () {
                        document.getElementById('input').blur()
                    }, 1010)
                }).catch((err) => {
                    alert(err)
                })
            },
            tran(msg, level) {
                this.show = false
                this.msg = msg
                this.level = level
                this.suc = true
                this.zt = ''
                setTimeout(this.showed, 1000)
            },
            showed() {
                this.show = true
                this.suc = false
                this.zt = true
                this.err = false
                this.val = ''
            }
        }
    };
</script>

<style>
    .v-enter,
    .v-leave-to {
        opacity: 0;
    }

    .v-enter-active {
        transition: all 2.5s ease;
    }

    .v-leave-active {
        transition: all 1s ease;
    }
</style>