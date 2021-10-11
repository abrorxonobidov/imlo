import {Component} from 'react';
import {Pie} from 'react-chartjs-2';


export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {data: null}
    }

    componentDidMount() {
        let stat = JSON.parse(localStorage.getItem('stat'));
        this.setState({
            data: {
                labels: [
                    'To‘g‘ri',
                    'Noto‘g‘ri',
                ],
                datasets: [{
                    data: [
                        stat.correct,
                        stat.incorrect
                    ],
                    backgroundColor: [
                        'rgb(19,157,0)',
                        'rgb(150,28,49)',
                    ],
                    hoverOffset: 4
                }],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            color: '#000',
                        }
                    }
                },
            }

        })
    }

    render() {
        return (
            <div className='stat-table'>
                <p>
                    <button className='X' onClick={this.props.fnHide}>X</button>
                </p>
                <div style={{width: '800px', textAlign: "center", margin: "0 auto"}}>
                    <Pie title={'test'} data={this.state.data} options={this.state.options}/>
                </div>
            </div>
        )
    }
}
