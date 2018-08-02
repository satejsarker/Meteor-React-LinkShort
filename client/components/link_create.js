import React, { Component } from 'react';



class LinkCreate extends Component{
    constructor(props){

        super(props);
        this.state={error:'',
    sucess:''}
    }
    handelInput(event){
        event.preventDefault();
        Meteor.call('links.insert', this.refs.link.value,(error)=>{
            if(error){
                this.setState({
                    error:'Enter valid Url', sucess:''
                })
            }
            else{
                this.setState({error:'',
            sucess:"link shorten done sucessfuly"});

                this.refs.link.value='';
            }
        });
    }
    render(){
        return(
            <form  onSubmit={this.handelInput.bind(this)}>
                <div className="form-group">
             
                    <label  > Link to Shorten</label>
                    < div className = "text-success" > {
                            this.state.sucess
                        } </div>
                    <input ref='link' className='form-control' />
                </div>
                <div className="text-danger">
                {this.state.error }
                    </div>
                <button className="btn btn-primary" >
                Shorten
                </button>

                </form>
        )
    }
}

export default LinkCreate;