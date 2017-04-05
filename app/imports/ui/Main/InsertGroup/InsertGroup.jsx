import React, { Component } from 'react';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Slingshot } from 'meteor/edgee:slingshot';

export default class InsertGroup extends Component {
    insertGroup(event) {
        event.preventDefault();
        let files = $("input.file_bag")[0].files;
        let filesLogo = $("input.file_logo")[0].files;
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        let urlLogo = null;
        var uploader = new Slingshot.Upload("myFileUploads");
        var uploader2 = new Slingshot.Upload("myFileUploads");
        uploader2.send(filesLogo[0], function (error, downloadUrlLogo) {
            if (error) {
                // Log service detailed response
                $.notify(error.reason, {type: "danger" });
                // alert (error);
            }
            else {
                urlLogo=downloadUrlLogo;
                uploader.send(files[0], function (error, downloadUrl) {
                    if (error) {
                        // Log service detailed response
                        $.notify(error.reason, {type: "danger" });
                        // alert (error);
                    }
                    else {
                        const url = downloadUrl;
                        groupInstert = {name:name,mainUser:Meteor.user()._id, url: url, urlLogo:urlLogo};
                        Meteor.call('Groups.insert', groupInstert , (error, result) => {
                            if (error)
                                $.notify(error.reason, {type: "danger" });
                            else
                                browserHistory.push('/');
                        });
                    }
                });
            }
        });


    };
    render() {
        return (
            <div className="container">
                <h1>Add Group</h1>
                <div className="col-md-5 upload-area">
                    <form onSubmit={this.insertGroup.bind(this)} id="upload">
                            <FormGroup className="relative" bsSize="large">
                                <ControlLabel className="label-form-insert">Name:</ControlLabel>
                                <FormControl className="inputName"
                                    type="text"
                                             name="name"
                                    ref="nameInput"
                             />
                            </FormGroup>
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel>Image group:</ControlLabel>
                            <p className="alert alert-success text-center">
                                <span>Click or Drag a File Here to Upload</span> 
                                <input type="file" className="file_bag" accept='image/jpeg,image/png'/>
                            </p>
                        </FormGroup>
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel>Logo group:</ControlLabel>
                            <p className="alert alert-success text-center">
                                <span>Click or Drag a File Here to Upload</span> 
                                <input type="file" className="file_logo" accept='image/jpeg,image/png'/>
                            </p>
                        </FormGroup>
                            <Button type="submit"
                                    className="formButton"
                            >
                                <b>Add</b>
                            </Button>
                    </form>
                </div>
            </div>
        );
    }
}