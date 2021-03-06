import { h, render, Component } from 'preact'

import StaticSchedule from "./schedules/StaticSchedule.jsx";
import Registration from './Registration.jsx'
import Gallery from './Gallery.jsx'

import {getJSON} from '../ajaxutils'

const ACTIVE_SCHEDULES_API_URL = '/schedules?activeOnly';

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {schedules: null, xhrFailed: null}
	}

	componentDidMount() {
		//this.requestActiveSchedules();
	}

	render(props, state) {
		return (
			<main>
				<div className='container'>
					<div className='row m-4 justify-content-center'>
						<div className='col'>
							<hr className='d-none d-sm-block'/>
						</div>
						<div className='h4'>Junior Joggers Sessions</div>
						<div className='col'>
							<hr className='d-none d-sm-block'/>
						</div>
					</div>
					{this.state.xhrFailed !== null &&
					<div className='alert alert-danger alert-dismissible fade show' role='alert'>
						There was a problem loading the schedules. ({this.state.xhrFailed})
						<button type='button' className='close' data-dismiss='alert' aria-label='Close'>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					}
					<StaticSchedule />
					<hr/>
					<Registration/>
					<hr/>
					<Gallery />
				</div>
			</main>
		);
	}

	requestActiveSchedules() {
		this.setSchedules(null);
		this.setError(null);

		getJSON(ACTIVE_SCHEDULES_API_URL)
			.done((data) => this.setSchedules(data))
			.fail((jqxhr, textStatus, error) => this.handleXHRFailure(jqxhr, textStatus, error));
	}

	handleXHRFailure(jqxhr, textStatus, error) {
		if ( jqxhr.readyState === 0 ) {
			this.setError('Connection Error');
		}
		else if ( jqxhr.readyState === 4 ){
			this.setError('Status: ' + jqxhr.status);
		}
		else {
			this.setError('Unknown error: ' + jqxhr.readyState);
		}

		this.setSchedules([]);
	}

	setSchedules(schedules) {
		this.setState({schedules: schedules})
	}

	setError(error) {
		this.setState({xhrFailed: error})
	}
}