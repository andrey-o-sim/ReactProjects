import React, { Component } from 'react';
import { Field } from 'redux-form';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const required = value => (value ? undefined : 'Enter some title Modal!');

export default class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleSave() {
        let { modalFormTitle } = this.props;
        if (modalFormTitle) {
            this.props.onSave();
            this.setState({ open: false });
        }
    }

    handleClose = () => {
        this.props.onCancle();
        this.setState({ open: false });
    };

    renderTextField(field) {
        let { input, label, meta: { touched, error }, ...custom } = field;

        return (
            <TextField
                hintText={label}
                floatingLabelText={label}
                errorText={touched && error}
                {...input}
                {...custom}
            />
        );
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={false}
                onClick={this.handleSave.bind(this)}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Scrollable Dialog" onClick={this.handleOpen} />
                <Dialog
                    title="Scrollable Dialog"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Field
                        name="titleModal"
                        label="Title"
                        validate={[required]}
                        component={this.renderTextField}
                        autoFocus />

                        <Field
                        name="UserNameModal"
                        label="User Name"
                        validate={[required]}
                        component={this.renderTextField}
                        autoFocus />
                </Dialog>
            </div>
        )
    }
};