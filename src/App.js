import './css/style.css';
import './css/media.css';
import {IconRefresh, IconStat} from './icons';
import {Component} from 'react';
import word from './words.json';
import Chart from "./Chart";
import {correct, incorrect} from './audio';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allWords: word,
            words: [...word],
            checked: false,
            current: null,
            showStat: false,
            sort: Math.random() < 0.5 ? 0 : 1
        }
    }

    shuffleWords = (array) => {
        let a = [...array];
        a.sort(() => Math.random() - 0.5);
        return a;
    }

    componentDidMount() {
        if (localStorage.getItem('stat') === null)
            localStorage.setItem('stat', JSON.stringify({correct: 0, incorrect: 0}));
        this.initWords();
    }

    initWords = () => {
        let a = this.state.words.length <= 0 ? [...word] : this.state.words;
        a = this.shuffleWords(a);
        this.setState({
            current: {
                correct: {
                    text: a[0][0],
                    cl: '',
                    addClass: 'true',
                },
                incorrect: {
                    text: a[0][1],
                    cl: '',
                    addClass: 'false',
                }
            },
        });
        a.shift();
        this.setState({
            words: a,
            checked: false,
            sort: Math.random() < 0.5 ? 0 : 1
        });
    }

    clickAnswer = (e) => {
        if (this.state.checked) return false;
        let s = this.state.current;
        s[e].cl = s[e].addClass;
        this.setState({current: s, checked: true});
        let stat = JSON.parse(localStorage.getItem('stat'));
        stat[e]++;
        localStorage.setItem('stat', JSON.stringify(stat));
        this.playAudio(e);
    }

    toggleStatTable = (showStat = true) => {
        this.setState({showStat: showStat})
    }

    playAudio = (a) => {
        (new Audio(a === 'correct' ? correct : incorrect))
            .play()
            .then();
    }

    render() {
        return (
            <div className={this.state.checked ? 'wrapper wrapper_blue' : 'wrapper'}>
                {this.state.showStat ? <Chart fnHide={() => this.toggleStatTable(false)}/> : ''}
                <div className="bg_box">
                    <Label/>
                    {this.state.current ? (this.state.sort === 0 ?
                            <>
                                <MyButton click={() => this.clickAnswer('correct')}
                                          text={this.state.current.correct.text}
                                          cl={this.state.current.correct.cl}/>
                                <MyButton click={() => this.clickAnswer('incorrect')}
                                          text={this.state.current.incorrect.text}
                                          cl={this.state.current.incorrect.cl}/>
                            </> :
                            <>
                                <MyButton click={() => this.clickAnswer('incorrect')}
                                          text={this.state.current.incorrect.text}
                                          cl={this.state.current.incorrect.cl}/>
                                <MyButton click={() => this.clickAnswer('correct')}
                                          text={this.state.current.correct.text}
                                          cl={this.state.current.correct.cl}/>
                            </>
                        )
                        : ''
                    }
                    <ul className="left_right_list">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <li><a onClick={() => this.toggleStatTable(true)}><img src={IconStat} alt=""/></a></li>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <li><a onClick={() => this.initWords()}><img src={IconRefresh} alt=""/></a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

class MyButton extends Component {
    render() {
        return (
            <button name="button" className={'btn btn-default btn_link ' + this.props.cl}
                    onClick={this.props.click}>
                {this.props.text}
            </button>
        )
    }
}

const Label = () => {
    return (
        <>
            <div className="main_title">
                <span><i>21</i>oktabr</span>
                <p>O???zbek tiliga davlat tili maqomi berilgan kun</p>
                <br/>
            </div>
            <p className="hint">To???g???ri so???zni tanlang</p>
        </>
    )
}

export default App;
