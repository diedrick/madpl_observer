import {user} from '/store/user.js'

export default {
    name: 'Login',

    setup() {
        const $q = Quasar.useQuasar()

        async function submit() {
            user.loginDialog.loading = true
            const res = await user.login()
            if (!res) {
                $q.notify({type: 'negative', message: 'Login failed!', actions: [{ label: 'Dismiss', color: 'white' }]})
            }
            user.loginDialog.loading = false    
        }

        return {user, submit}
    },

	methods: {
		reset_password: function () {
			console.log("> reset_password");
			// store.logout();
			user.loginDialog.show = false;
			user.resetPasswordDialog.show = true;
		},
		back_to_login: function () {
			console.log("> back_to_login");
			// store.logout();
			user.resetPasswordDialog.show = false;
			user.loginDialog.show = true;
		},
	},

    template: `
        <!-- Login dialog -->
        <q-dialog v-model="user.loginDialog.show">
            <q-card id="loginDialog" style="min-width: 350px">
                <q-card-section class="column items-center q-pb-xs">
                    <div class="text-h6">Log in</div>
                    <div class="text-caption">(admin@test.com / admin)</div>
                </q-card-section>
                <q-card-section>
                    <q-form @submit="submit()" @reset="user.loginDialog.reset()">
                        <q-input filled type="email" v-model="user.loginDialog.email" label="E-mail" lazy-rules :rules="[val => !!val]" />
                        <q-input filled v-model="user.loginDialog.password" label="Password" :type="user.loginDialog.pwdVisible ? 'text' : 'password'" lazy-rules :rules="[val => !!val]">
                            <template v-slot:append><q-icon :name="user.loginDialog.pwdVisible ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="user.loginDialog.pwdVisible = !user.loginDialog.pwdVisible"/></template>
                        </q-input>
                        <div class="row no-wrap text-primary q-gutter-sm justify-end">
							<q-btn flat @click="reset_password" label="Reset Password" />

                            <q-btn type="reset" flat label="Cancel" />
                            <q-btn type="submit" color="primary" label="OK" :loading="user.loginDialog.loading">
                                <template v-slot:loading><q-spinner-hourglass /></template>
                            </q-btn>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- Login dialog -->
        <q-dialog v-model="user.resetPasswordDialog.show">
            <q-card id="loginDialog" style="min-width: 350px">
                <q-card-section class="column items-center q-pb-xs">
                    <div class="text-h6">Reset Password</div>
                    <div class="text-caption">Do we want reset pw or just a link to auto-login?</div>
                </q-card-section>
                <q-card-section>
                    <q-form @submit="submit()" @reset="user.loginDialog.reset()">
                        <q-input filled type="email" v-model="user.loginDialog.email" label="E-mail" lazy-rules :rules="[val => !!val]" />
                        <div class="row no-wrap text-primary q-gutter-sm justify-end">
							<q-btn @click="back_to_login" flat label="Back to Login" />

                            <q-btn type="reset" flat label="Cancel" />
                            <q-btn type="submit" color="primary" label="OK" :loading="user.loginDialog.loading">
                                <template v-slot:loading><q-spinner-hourglass /></template>
                            </q-btn>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    `,
};