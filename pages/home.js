import {user} from '/store/user.js'
import {data} from '/store/data.js'

export default {
    name: 'Home',

	setup() {
		// console.log('user', user);
		const title = 'Home page';
		data.currentPage = 'Home page';

		let complete_rows = user.sessions.data.filter(function (el) {
			return el.complete == 1;
		});
		let incomplete_rows = user.sessions.data.filter(function (el) {
			return el.complete == 0;
		});

		function go_to_page(which_id) {
			Vue.$router.push(which_id);
		}

		let quasarDate = Quasar.date;
		return {user, data, title, complete_rows, incomplete_rows, quasarDate, go_to_page}
        // const $q = Quasar.useQuasar()
	},


    template: `
	<div>
		<!-- home -->
		<div class="text-h6 text-weight-thin q-ml-md q-mt-sm">Incomplete Sessions</div>

		<q-scroll-area style="height: 240px;" class="q-ml-md">
			<div class="row no-wrap q-mt-sm">
				<div v-for="v, k in incomplete_rows" @click="go_to_page('/session/'+v.id)" style="width: 160px;cursor:pointer;" class="q-mr-md">
					<q-img v-if="v.image" :src="'https://mproxy.stage.diedrick.com/assets/'+v.image+'?access_token='+user.userAccessToken+'&width=160&height=160&fit=cover&quality=60'">
						<div class="absolute-bottom text-subtitle2 text-center" style="line-height: 13px;">{{v.name}}</div>
					</q-img>
					<div v-else class="text-subtitle2 bg-accent text-center text-white q-pa-md" style="height: 160px;">{{v.name}}</div>
					<div class="text-subtitle text-no-wrap ellipsis q-mt-sm">{{ quasarDate.formatDate(v.date, 'MMM D') }} {{ quasarDate.formatDate(v.date, ' - h:mma') }}</div>
					<div class="text-subtitle2 text-no-wrap ellipsis">{{(v.location_id) ? user.locations.data.find(obj => {return obj.id === v.location_id})['name'] : ''}}</div>
				</div>
			</div>
		</q-scroll-area>

		<div class="text-h6 text-weight-thin q-ml-md q-mt-sm">Complete Sessions</div>

		<q-scroll-area style="height: 260px;" class="q-pl-md">
			<div class="row no-wrap q-mt-sm">
				<div v-for="v, k in complete_rows" @click="go_to_page('/session/'+v.id)" style="width: 160px;cursor:pointer;" class="q-mr-md">
					<q-img v-if="v.image" :src="'https://mproxy.stage.diedrick.com/assets/'+v.image+'?access_token='+user.userAccessToken+'&width=160&height=160&fit=cover&quality=60'">
						<div class="absolute-bottom text-subtitle2 text-center" style="line-height: 13px;">{{v.name}}</div>
					</q-img>
					<div v-else class="text-subtitle2 bg-accent text-center text-white q-pa-md" style="height: 160px;">{{v.name}}</div>
					<div class="text-subtitle text-no-wrap ellipsis q-mt-sm">{{ quasarDate.formatDate(v.date, 'MMM D') }} {{ quasarDate.formatDate(v.date, ' - h:mma') }}</div>
					<div class="text-subtitle2 text-no-wrap ellipsis">{{user.locations.data.find(obj => {return obj.id === v.location_id})['name']}}</div>
				</div>
			</div>
		</q-scroll-area>

		<!-- footer -->
		<section class="row items-center justify-center">
		</section>
	</div>

	<div class="row justify-center fixed-bottom q-mb-md">
		<q-btn :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'" to="/sessions/">View all sessions</q-btn>
		<q-btn class="q-ml-lg" color="primary" tag="a" href="/session">New Session</q-btn>
	</div>
	`,
  };