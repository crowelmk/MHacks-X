import React, { Component } from 'react';
import { Icon, Menu, Dropdown, Button, Divider } from 'semantic-ui-react';
import Cuisines from '../Data/Options.js'
import base from '../rebase';
import { Redirect } from 'react-router-dom';


export default class PrefPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            firstPreferred: "",
            secondPreferred: "",
            thirdPreferred: ""
        }
    }

    foodPicked(e, data) {
        this.setState({ [data.name]: data.value })
    }

    submitPref() {
        try {
            base.fetch(this.props.match.params.id, { context: this, asArray: true });
            base.push(this.props.match.params.id, {
                data: {
                    time: Date.now(),
                    inputs: {
                        first:
                        {
                            food: this.state.firstPreferred,
                            weight: 3
                        },
                        second:
                        {
                            food: this.state.secondPreferred,
                            weight: 2
                        },
                        third:
                        {
                            food: this.state.thirdPreferred,
                            weight: 1
                        }     
                    }
                }
            });
        } catch (error) {
            base.post(this.props.match.params.id, {
                data: {
                    time: Date.now(),
                    inputs: {
                        first:
                        {
                            food: this.state.firstPreferred,
                            weight: 3
                        },
                        second:
                        {
                            food: this.state.secondPreferred,
                            weight: 2
                        },
                        third:
                        {
                            food: this.state.thirdPreferred,
                            weight: 1
                        }     
                    },
                    past: []
                }
            });
        } finally {
            this.setState({ redirect: true });
            localStorage.setItem(`VotedFor(${this.props.match.params.id})`, this.props.match.params.id);
        }
    }

    render() {


        const { activeItem } = this.state

        const foodOptions = Cuisines.Cuisines.map((cuisine, i) => {
            return { key: i, value: cuisine, text: cuisine }
        });
        const styles = { marginTop: 25 }
        return (
            <center>
                <div style={{ backgroundColor: "#fafafa", width: "75%", borderRadius: 5 }}>
                    <h1>Your Preference</h1>
                    <div>
                        <Divider horizontal>{"Preference 1"}</Divider>
                        <Dropdown onChange={(e, data) => this.foodPicked(e, data)} name='firstPreferred' placeholder='Select Food' fluid search selection options={foodOptions} />
                    </div>
                    <div style={styles}>
                        <Divider horizontal>{"Preference 2"}</Divider>
                        <Dropdown disabled={this.state.firstPreferred === ""} onChange={(e, data) => this.foodPicked(e, data)} name='secondPreferred' placeholder='Select Food' fluid search selection options={foodOptions} />
                    </div>
                    <div style={styles}>
                        <Divider horizontal>{"Preference 3"}</Divider>
                        <Dropdown disabled={this.state.secondPreferred === ""} onChange={(e, data) => this.foodPicked(e, data)} name='thirdPreferred' placeholder='Select Food' fluid search selection options={foodOptions} />
                    </div>
                    <Divider horizontal />
                    <Button disabled={localStorage.getItem(`VotedFor(${this.props.match.params.id})`) === this.props.match.params.id} color='teal' onClick={() => this.submitPref()}>Submit Preferences</Button>
                    <Divider />
                    {this.state.redirect && <Redirect push to={`/results/${this.props.match.params.id}`} />}
                </div>
            </center>
        )
    }
}